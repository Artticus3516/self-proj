import { supabase } from "../src/lib/supabase";
import * as fs from "fs";
import * as path from "path";

async function runTest() {
  console.log("Starting Database Mock Client Verification Tests...\n");

  // 1. Check seed data exists
  console.log("1. Checking seed data...");
  const { data: services, error: selectErr } = await supabase
    .from("services")
    .select("*");
  
  if (selectErr) {
    throw new Error(`Select services failed: ${selectErr.message}`);
  }
  console.log(`Successfully retrieved ${services?.length} services (expected: 3).`);
  console.log("Services list:", services);
  
  if (!services || services.length !== 3) {
    throw new Error("Initial seed services count is not 3");
  }

  // 2. Insert new service
  console.log("\n2. Testing Insert...");
  const testService = {
    title: "Test Verification Service",
    description: "Testing mock database operations deterministically."
  };
  const { data: inserted, error: insertErr } = await supabase
    .from("services")
    .insert(testService)
    .select();

  if (insertErr) {
    throw new Error(`Insert failed: ${insertErr.message}`);
  }
  
  const insertedItem = Array.isArray(inserted) ? inserted[0] : inserted;
  console.log("Inserted item:", insertedItem);
  if (!insertedItem || !insertedItem.id || !insertedItem.created_at) {
    throw new Error("Inserted item is missing ID or created_at fields");
  }
  if (insertedItem.title !== testService.title) {
    throw new Error("Inserted title does not match");
  }

  // 3. Select specific service
  console.log("\n3. Testing Select Filter (.eq)...");
  const { data: selected, error: selectedErr } = await supabase
    .from("services")
    .select("*")
    .eq("id", insertedItem.id);

  if (selectedErr) {
    throw new Error(`Select with eq filter failed: ${selectedErr.message}`);
  }
  console.log("Selected item:", selected);
  if (!selected || selected.length !== 1) {
    throw new Error("Expected to find exactly 1 matching service");
  }

  // 4. Update service
  console.log("\n4. Testing Update...");
  const updatedTitle = "Updated Verification Service Name";
  const { data: updated, error: updateErr } = await supabase
    .from("services")
    .update({ title: updatedTitle })
    .eq("id", insertedItem.id)
    .select();

  if (updateErr) {
    throw new Error(`Update failed: ${updateErr.message}`);
  }
  const updatedItem = Array.isArray(updated) ? updated[0] : updated;
  console.log("Updated item:", updatedItem);
  if (!updatedItem || updatedItem.title !== updatedTitle) {
    throw new Error("Update title not reflected in returned data");
  }

  // 5. Delete service
  console.log("\n5. Testing Delete...");
  const { data: deleted, error: deleteErr } = await supabase
    .from("services")
    .delete()
    .eq("id", insertedItem.id)
    .select();

  if (deleteErr) {
    throw new Error(`Delete failed: ${deleteErr.message}`);
  }
  const deletedItem = Array.isArray(deleted) ? deleted[0] : deleted;
  console.log("Deleted item:", deletedItem);
  if (!deletedItem || deletedItem.id !== insertedItem.id) {
    throw new Error("Deleted item does not match requested id");
  }

  // Verify it is gone
  const { data: finalCheck } = await supabase
    .from("services")
    .select("*")
    .eq("id", insertedItem.id);
  if (finalCheck && finalCheck.length > 0) {
    throw new Error("Service was not deleted successfully");
  }
  console.log("Service deleted successfully, confirmed by select check.");

  // 5b. Testing new M2 constraints (conformance, database pollution, and single() validation)
  console.log("\n5b. Testing M2 constraints...");

  // Test: Insert without select returns null
  const { data: insertNoSelect } = await supabase
    .from("services")
    .insert({ title: "No Select Test", description: "No Select Test Description" });
  if (insertNoSelect !== null) {
    throw new Error("Insert without select must return null data");
  }
  console.log("Conformance check: Insert without select correctly returned null.");

  // Test: Update without select returns null
  const { data: updateNoSelect } = await supabase
    .from("services")
    .update({ description: "Updated No Select Test Description" })
    .eq("title", "No Select Test");
  if (updateNoSelect !== null) {
    throw new Error("Update without select must return null data");
  }
  console.log("Conformance check: Update without select correctly returned null.");

  // Test: Delete without select returns null
  const { data: deleteNoSelect } = await supabase
    .from("services")
    .delete()
    .eq("title", "No Select Test");
  if (deleteNoSelect !== null) {
    throw new Error("Delete without select must return null data");
  }
  console.log("Conformance check: Delete without select correctly returned null.");

  // Test: single() validation on multiple rows
  const { data: singleData, error: singleErr } = await supabase.from("services").select("*").single();
  if (singleData !== null) {
    throw new Error("single() data should be null for multiple rows");
  }
  if (!singleErr || !singleErr.message.includes("multiple rows returned")) {
    throw new Error(`Unexpected single() error message: ${singleErr?.message}`);
  }
  console.log("single() correctly returned error for multiple rows:", singleErr.message);

  // Test: database pollution prevention (services do not have timestamp column)
  const { data: allServices } = await supabase.from("services").select("*");
  if (allServices) {
    for (const service of allServices) {
      if ("timestamp" in service) {
        throw new Error(`Database pollution detected: service ${service.id} has timestamp column`);
      }
    }
  }
  console.log("Database pollution check: verified no services have timestamp columns.");

  // 6. Check file persistence
  console.log("\n6. Checking server-side file persistence...");
  const dbPath = path.resolve(process.cwd(), ".data", "db.json");
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Database file not found at: ${dbPath}`);
  }
  console.log(`Confirmed database file exists at: ${dbPath}`);
  const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  console.log("Database keys in file:", Object.keys(dbContent));

  // 7. Verify Auth Mock
  console.log("\n7. Checking Auth Mock sign-in...");
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: "admin@agency.com",
    password: "adminpassword"
  });
  if (authErr) {
    throw new Error(`Mock Auth sign-in failed: ${authErr.message}`);
  }
  console.log("Signed in user:", authData.user);
  console.log("Session access token:", authData.session?.access_token);
  if (authData.session?.access_token !== "mock-session-token-xyz-9876") {
    throw new Error("Incorrect mock session token returned");
  }

  console.log("\nAll Database Mock Client Verification Tests passed successfully!");
}

runTest().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
