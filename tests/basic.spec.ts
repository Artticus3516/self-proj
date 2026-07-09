import { test, expect } from '@playwright/test';

test('has title and main content', async ({ page }) => {
  // Navigate to root
  await page.goto('/');

  // Expect the page to have the correct title
  await expect(page).toHaveTitle(/Atlas — Premium UI Web Design/);

  // Expect the main h1 heading to contain the starting text
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toContainText('Atlas');
});
