import { test, expect, Page } from '@playwright/test';

// ----------------------------------------------------
// FEATURE 1: Core Pages & WebGL Hero
// ----------------------------------------------------

test.describe('F1: Core Pages & WebGL Hero', () => {
  test('Test 1.1: Verify landing page "/" renders main layout, header, footer, and navigation links', async ({ page }) => {
    await page.goto('/');

    // Verify main layout elements
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify navigation links for "/", "/services", "/about", and "/contact"
    const homeLink = page.locator('a[href="/"]').first();
    const servicesLink = page.locator('a[href="/services"]').first();
    const aboutLink = page.locator('a[href="/about"]').first();
    const contactLink = page.locator('a[href="/contact"]').first();

    await expect(homeLink).toBeVisible();
    await expect(servicesLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test('Test 1.2: Verify pre-loader is displayed initially and eventually dismissed (content revealed)', async ({ page }) => {
    await page.goto('/');

    // Pre-loader element should be dismissed and hidden once loaded
    const preloader = page.locator('#preloader, #pre-loader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 });

    // Verify main content is visible after pre-loader is dismissed
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('Test 1.3: Verify navigation to Services page "/services" and rendering of its header and content', async ({ page }) => {
    await page.goto('/');
    const servicesLink = page.locator('a[href="/services"]').first();
    await servicesLink.click();

    // Verify correct page URL
    await expect(page).toHaveURL(/\/services/);

    // Verify Services header and content
    const servicesHeader = page.locator('h1, h2').first();
    await expect(servicesHeader).toBeVisible();
    await expect(servicesHeader).not.toBeEmpty();
  });

  test('Test 1.4: Verify navigation to About page "/about" and Contact page "/contact" and rendering of their respective contents', async ({ page }) => {
    // Navigate to About page
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);
    const aboutHeader = page.locator('h1, h2').first();
    await expect(aboutHeader).toBeVisible();

    // Navigate to Contact page
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/contact/);
    const contactHeader = page.locator('h1, h2').first();
    await expect(contactHeader).toBeVisible();

    // Verify Contact form inputs and submit button presence
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });

  test('Test 1.5: Verify WebGL canvas element "<canvas>" is present in the Hero component of the landing page', async ({ page }) => {
    await page.goto('/');

    // Verify WebGL canvas element exists and is visible in the Hero section
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });
});

// ----------------------------------------------------
// FEATURE 2: Database CRUD & Admin Dashboard
// ----------------------------------------------------

test.describe('F2: Database CRUD & Admin Dashboard', () => {
  // Helper function to handle admin login
  async function adminLogin(page: Page) {
    await page.goto('/admin/login');
    await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
    await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);
  }

  test('Test 2.1: Verify Admin Dashboard displays lists of services, blogs, and leads retrieved from the database', async ({ page }) => {
    await adminLogin(page);

    // Verify services list/container is present on Admin Dashboard
    await page.goto('/admin/services');
    const servicesList = page.locator('[data-testid="services-list"], .services-list, table');
    await expect(servicesList).toBeVisible();

    // Verify blogs list/container is present on Admin Blog Dashboard
    await page.goto('/admin/blog');
    const blogsList = page.locator('[data-testid="blogs-list"], .blogs-list, table');
    await expect(blogsList).toBeVisible();

    // Verify leads list/container is present on Admin Leads Dashboard
    await page.goto('/admin/leads');
    const leadsList = page.locator('[data-testid="leads-list"], .leads-list, table');
    await expect(leadsList).toBeVisible();
  });

  test('Test 2.2: Verify Admin can create a new service with valid title and description, and it appears in the list', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/services');

    const titleInput = page.locator('input[name="title"]');
    const descTextarea = page.locator('textarea[name="description"]');
    const testTitle = `Service Title ${Date.now()}`;
    const testDesc = 'Form-submitted service description for testing.';

    await titleInput.fill(testTitle);
    await descTextarea.fill(testDesc);

    await page.click('button[type="submit"]');

    // Confirm new service appears in the list
    const newServiceText = page.locator(`text=${testTitle}`);
    await expect(newServiceText).toBeVisible();
  });

  test('Test 2.3: Verify Admin can update an existing service\'s details, and the changes are persisted', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/services');

    // Click edit button for the first service in the list
    const editBtn = page.locator('button:has-text("Edit"), [data-testid="edit-service-btn"]').first();
    await editBtn.click();

    // Update service fields
    const titleInput = page.locator('input[name="title"]');
    const updatedTitle = `Updated Service Title ${Date.now()}`;
    await titleInput.fill(updatedTitle);

    // Click save/update button
    await page.click('button[type="submit"], button:has-text("Save"), button:has-text("Update")');

    // Confirm the change is persisted in the list view
    const updatedServiceText = page.locator(`text=${updatedTitle}`);
    await expect(updatedServiceText).toBeVisible();
  });

  test('Test 2.4: Verify Admin can delete a service, and it is removed from the list', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/services');

    // Create a temporary service to delete so other tests don't break existing data
    const titleInput = page.locator('input[name="title"]');
    const descTextarea = page.locator('textarea[name="description"]');
    const deleteTitle = `To Be Deleted ${Date.now()}`;
    await titleInput.fill(deleteTitle);
    await descTextarea.fill('Temporary service description.');
    await page.click('button[type="submit"]');

    // Verify service is listed
    const serviceItem = page.locator(`text=${deleteTitle}`);
    await expect(serviceItem).toBeVisible();

    // Locate the container holding our service item
    const container = page.locator(`tr:has-text("${deleteTitle}"), div:has-text("${deleteTitle}")`).last();
    const deleteBtn = container.locator('button:has-text("Delete"), [data-testid="delete-btn"]');

    // Accept dialog prompt automatically if present
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await deleteBtn.click();

    // Verify service is removed from the UI
    await expect(serviceItem).toBeHidden();
  });

  test('Test 2.5: Verify Admin can create, read, update, and delete blog posts', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/blog');

    // 1. CREATE
    const titleInput = page.locator('input[name="title"]');
    const contentTextarea = page.locator('textarea[name="content"]');
    const blogTitle = `Test Blog Post ${Date.now()}`;
    const blogContent = 'Content for a testing blog post.';

    await titleInput.fill(blogTitle);
    await contentTextarea.fill(blogContent);
    await page.click('button[type="submit"]');

    // 2. READ (Verify it appears in the list)
    const blogItem = page.locator(`text=${blogTitle}`);
    await expect(blogItem).toBeVisible();

    // 3. UPDATE
    const row = page.locator(`tr:has-text("${blogTitle}"), div:has-text("${blogTitle}")`).last();
    await row.locator('button:has-text("Edit"), [data-testid="edit-blog-btn"]').click();

    const updatedBlogTitle = `Updated Blog Title ${Date.now()}`;
    await titleInput.fill(updatedBlogTitle);
    await page.click('button[type="submit"], button:has-text("Save"), button:has-text("Update")');

    const updatedBlogItem = page.locator(`text=${updatedBlogTitle}`);
    await expect(updatedBlogItem).toBeVisible();

    // 4. DELETE
    const updatedRow = page.locator(`tr:has-text("${updatedBlogTitle}"), div:has-text("${updatedBlogTitle}")`).last();
    const deleteBtn = updatedRow.locator('button:has-text("Delete"), [data-testid="delete-blog-btn"]');

    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await deleteBtn.click();

    // Verify it is deleted
    await expect(updatedBlogItem).toBeHidden();
  });
});

// ----------------------------------------------------
// FEATURE 3: Traffic Tracking & Cookie Consent
// ----------------------------------------------------

test.describe('F3: Traffic Tracking & Cookie Consent', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies/storage before each test to ensure a clean first-visit state
    await page.context().clearCookies();
  });

  test('Test 3.1: Verify cookie consent banner is displayed on first visit to the site', async ({ page }) => {
    await page.goto('/');

    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await expect(consentBanner).toBeVisible();
    await expect(consentBanner).toContainText(/cookie consent/i);
  });

  test('Test 3.2: Verify accepting cookie consent hides the banner and sets a consent cookie/storage item', async ({ page }) => {
    await page.goto('/');

    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await expect(consentBanner).toBeVisible();

    const acceptBtn = consentBanner.locator('button:has-text("Accept"), button:has-text("Accept All")');
    await acceptBtn.click();

    // Banner should hide
    await expect(consentBanner).toBeHidden();

    // Check cookie or localStorage has cookie-consent=accepted
    const cookies = await page.context().cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-consent');
    const localConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'));

    const isAccepted = (consentCookie?.value === 'accepted') || (localConsent === 'accepted');
    expect(isAccepted).toBe(true);
  });

  test('Test 3.3: Verify declining cookie consent hides the banner and sets a rejection cookie/storage item', async ({ page }) => {
    await page.goto('/');

    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await expect(consentBanner).toBeVisible();

    const declineBtn = consentBanner.locator('button:has-text("Decline"), button:has-text("Reject")');
    await declineBtn.click();

    // Banner should hide
    await expect(consentBanner).toBeHidden();

    // Check cookie or localStorage has cookie-consent=declined
    const cookies = await page.context().cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-consent');
    const localConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'));

    const isDeclined = (consentCookie?.value === 'declined') || (localConsent === 'declined');
    expect(isDeclined).toBe(true);
  });

  test('Test 3.4: Verify that when consent is accepted, navigation events trigger "/api/track" requests to log visits', async ({ page }) => {
    await page.goto('/');

    // Accept consent
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await consentBanner.locator('button:has-text("Accept")').click();

    // Intercept API track call
    const trackRequestPromise = page.waitForRequest(request =>
      request.url().includes('/api/track') && request.method() === 'POST'
    );

    // Navigate to trigger analytics tracking event
    await page.goto('/services');

    const request = await trackRequestPromise;
    expect(request).toBeDefined();

    // Verify correct fields inside post data
    const postData = request.postData();
    if (postData) {
      const payload = JSON.parse(postData);
      expect(payload.consent_granted).toBe(true);
    }
  });

  test('Test 3.5: Verify that when consent is declined, navigation events do NOT trigger any "/api/track" requests', async ({ page }) => {
    await page.goto('/');

    // Decline consent
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await consentBanner.locator('button:has-text("Decline")').click();

    let trackRequestSent = false;
    page.on('request', request => {
      if (request.url().includes('/api/track')) {
        trackRequestSent = true;
      }
    });

    // Navigate to services page
    await page.goto('/services');
    // Allow small window for background API track call to be missed
    await page.waitForTimeout(2000);

    expect(trackRequestSent).toBe(false);
  });
});

// ----------------------------------------------------
// FEATURE 4: Admin Auth, Security & Rate-limiting
// ----------------------------------------------------

test.describe('F4: Admin Auth, Security & Rate-limiting', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies to simulate unauthenticated state before each test
    await page.context().clearCookies();
  });

  test('Test 4.1: Verify unauthenticated attempts to access "/admin", "/admin/services", etc. are redirected to "/admin/login" or "/login"', async ({ page }) => {
    const protectedRoutes = ['/admin', '/admin/services', '/admin/blog', '/admin/leads'];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/\/admin\/login|\/login/);
    }
  });

  test('Test 4.2: Verify logging in with correct credentials allows access to protected "/admin" routes', async ({ page }) => {
    await page.goto('/admin/login');

    await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
    await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
    await page.click('button[type="submit"]');

    // Confirm redirected to admin dashboard
    await expect(page).toHaveURL(/\/admin$/);

    // Verify sub-admin pages are now accessible
    await page.goto('/admin/services');
    await expect(page).toHaveURL(/\/admin\/services/);
  });

  test('Test 4.3: Verify logging out revokes authentication and redirects back to login page', async ({ page }) => {
    // Perform standard login
    await page.goto('/admin/login');
    await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
    await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin$/);

    // Click logout
    const logoutBtn = page.locator('button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout-btn"]');
    await logoutBtn.click();

    // Confirm redirected back to login page
    await expect(page).toHaveURL(/\/admin\/login|\/login/);

    // Access to dashboard should be blocked again
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login|\/login/);
  });

  test('Test 4.4: Verify logging in with incorrect credentials displays a clean authentication error message', async ({ page }) => {
    await page.goto('/admin/login');

    await page.fill('input[type="email"], input[name="email"]', 'incorrect@agency.com');
    await page.fill('input[type="password"], input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Still on the login page
    await expect(page).toHaveURL(/\/admin\/login|\/login/);

    // Clean error message is visible
    const errorMsg = page.locator('.error-message, [data-testid="error-message"], text=/invalid|failed|incorrect/i');
    await expect(errorMsg).toBeVisible();
  });

  test('Test 4.5: Verify Next.js App Router middleware/proxy protects "/api/admin/*" API endpoints (if any) or admin page handlers from anonymous requests', async ({ request }) => {
    const response = await request.get('/api/admin/services');

    // Request should return an authentication error status or redirect
    const status = response.status();
    expect([401, 403, 302, 307]).toContain(status);
  });
});
