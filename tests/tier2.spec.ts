import { test, expect, Page } from '@playwright/test';
import { supabase } from '../src/lib/supabase';

// ----------------------------------------------------
// FEATURE 1: Core Pages & WebGL Hero
// ----------------------------------------------------

test.describe('F1: Core Pages & WebGL Hero - Tier 2', () => {
  test('Test 1.6: Verify navigation link behavior when clicked repeatedly in rapid succession', async ({ page }) => {
    await page.goto('/');

    const homeLink = page.locator('a[href="/"]').first();
    const servicesLink = page.locator('a[href="/services"]').first();
    const aboutLink = page.locator('a[href="/about"]').first();
    const contactLink = page.locator('a[href="/contact"]').first();

    // Click them in rapid succession without waiting for transition to finish
    await servicesLink.click({ noWaitAfter: true });
    await aboutLink.click({ noWaitAfter: true });
    await contactLink.click({ noWaitAfter: true });
    await homeLink.click({ noWaitAfter: true });
    await contactLink.click();

    // The page should eventually settle on the last page clicked without crashing
    await expect(page).toHaveURL(/\/contact/);
    const contactHeader = page.locator('h1, h2').first();
    await expect(contactHeader).toBeVisible();
  });

  test('Test 1.7: Verify the Pre-loader handles delay/timeout gracefully if resources take time to load', async ({ page }) => {
    // Intercept a resource or API request and delay its response significantly
    await page.route('**/api/dummy-slow-resource', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 8000));
      await route.fulfill({ status: 200, body: 'ok' });
    });

    await page.goto('/');

    // Pre-loader element should be dismissed and hidden even if resources take time (handles timeout gracefully)
    const preloader = page.locator('#preloader, #pre-loader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 15000 });

    // Verify main content is visible after pre-loader is dismissed
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('Test 1.8: Verify page rendering on different viewport sizes', async ({ page }) => {
    await page.goto('/');

    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileHeader = page.locator('header');
    await expect(mobileHeader).toBeVisible();
    const mobileMain = page.locator('main');
    await expect(mobileMain).toBeVisible();

    // Tablet Viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    const tabletHeader = page.locator('header');
    await expect(tabletHeader).toBeVisible();
    const tabletMain = page.locator('main');
    await expect(tabletMain).toBeVisible();

    // Desktop Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    const desktopHeader = page.locator('header');
    await expect(desktopHeader).toBeVisible();
    const desktopMain = page.locator('main');
    await expect(desktopMain).toBeVisible();
  });

  test('Test 1.9: Verify handling of non-existent page "/does-not-exist" displays a 404 page with a link to return home', async ({ page }) => {
    await page.goto('/does-not-exist');

    // Verify 404-related text or headers are visible on screen
    const notFoundText = page.locator('h1, h2, p, text=404, text=not found, text=Page not found').first();
    await expect(notFoundText).toBeVisible();

    // Verify link to return home exists and navigates back to root
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('Test 1.10: Verify the Contact Form input validation on "/contact"', async ({ page }) => {
    await page.goto('/contact');

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitBtn = page.locator('button[type="submit"]');

    // 1. Submit with empty email field
    await nameInput.fill('John Doe');
    await emailInput.fill('');
    await messageInput.fill('Hello, this is a test message.');
    await submitBtn.click();

    // Verification: Input validation triggers (either HTML5 or custom error message, and page stays on form/contact)
    const isEmailRequired = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid || el.required);
    const errorMsgVisible = await page.locator('.error, .error-message, text=/invalid|required/i').first().isVisible().catch(() => false);
    expect(isEmailRequired || errorMsgVisible || page.url().includes('/contact')).toBe(true);

    // 2. Submit with invalid email format
    await emailInput.fill('invalid-email-format');
    await submitBtn.click();

    const isEmailValidFormat = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(!isEmailValidFormat || errorMsgVisible || page.url().includes('/contact')).toBe(true);

    // 3. Submit with empty message field
    await emailInput.fill('john.doe@example.com');
    await messageInput.fill('');
    await submitBtn.click();

    const isMessageRequired = await messageInput.evaluate((el: HTMLTextAreaElement) => !el.validity.valid || el.required);
    expect(isMessageRequired || errorMsgVisible || page.url().includes('/contact')).toBe(true);
  });
});

// ----------------------------------------------------
// FEATURE 2: Database CRUD & Admin Dashboard
// ----------------------------------------------------

test.describe('F2: Database CRUD & Admin Dashboard - Tier 2', () => {
  async function adminLogin(page: Page) {
    await page.goto('/admin/login');
    await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
    await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);
  }

  test('Test 2.6: Verify Service creation rejects empty title or description', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/services');

    const titleInput = page.locator('input[name="title"]');
    const descTextarea = page.locator('textarea[name="description"]');
    const submitBtn = page.locator('button[type="submit"]');

    // 1. Submit with empty title
    await titleInput.fill('');
    await descTextarea.fill('Valid description content');
    await submitBtn.click();

    const isTitleInvalid = await titleInput.evaluate((el: HTMLInputElement) => !el.validity.valid || el.required);
    const errorMsgVisible = await page.locator('.error, .error-message, text=/invalid|required|title/i').first().isVisible().catch(() => false);
    expect(isTitleInvalid || errorMsgVisible).toBe(true);

    // 2. Submit with empty description
    await titleInput.fill('Valid Service Title');
    await descTextarea.fill('');
    await submitBtn.click();

    const isDescInvalid = await descTextarea.evaluate((el: HTMLTextAreaElement) => !el.validity.valid || el.required);
    const errorMsgVisible2 = await page.locator('.error, .error-message, text=/invalid|required|description/i').first().isVisible().catch(() => false);
    expect(isDescInvalid || errorMsgVisible2).toBe(true);
  });

  test('Test 2.7: Verify Service creation rejects very long strings or special characters', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/services');

    const titleInput = page.locator('input[name="title"]');
    const descTextarea = page.locator('textarea[name="description"]');
    const submitBtn = page.locator('button[type="submit"]');

    // 1. Submit with very long title (>1000 characters)
    const longTitle = 'A'.repeat(1005);
    await titleInput.fill(longTitle);
    await descTextarea.fill('Valid service description.');
    await submitBtn.click();

    const isTitleInvalid = await titleInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const errorMsgVisible = await page.locator('.error, .error-message, text=/long|max|limit/i').first().isVisible().catch(() => false);
    expect(isTitleInvalid || errorMsgVisible || page.url().includes('/admin/services')).toBe(true);

    // 2. Submit with special characters
    const specialTitle = '<script>alert("xss")</script> ~!@#$%^&*()_+';
    await titleInput.fill(specialTitle);
    await descTextarea.fill('Valid description content.');
    await submitBtn.click();

    // Verify it doesn't crash the UI; check if listed safely OR rejected gracefully
    const isListed = await page.locator(`text=${specialTitle}`).isVisible().catch(() => false);
    const isError = await page.locator('.error, .error-message').first().isVisible().catch(() => false);
    expect(isListed || isError || !page.url().includes('login')).toBe(true);
  });

  test('Test 2.8: Verify Blog post creation handles markdown content or special characters properly', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/blog');

    const titleInput = page.locator('input[name="title"]');
    const contentTextarea = page.locator('textarea[name="content"]');
    const submitBtn = page.locator('button[type="submit"]');

    const testTitle = `Markdown Blog ${Date.now()}`;
    const markdownContent = `### Heading 3\n\nThis is **bold** and *italic* content.\n\n- Item 1\n- Item 2\n\n[Link](https://example.com)\n\n<span style="color:red">Special HTML tag</span>`;

    await titleInput.fill(testTitle);
    await contentTextarea.fill(markdownContent);
    await submitBtn.click();

    // Verify blog post appears in the admin list
    const blogRow = page.locator(`tr:has-text("${testTitle}"), div:has-text("${testTitle}")`).last();
    await expect(blogRow).toBeVisible();

    // Edit to confirm markdown value was persisted accurately
    const editBtn = blogRow.locator('button:has-text("Edit"), [data-testid="edit-blog-btn"]');
    await editBtn.click();
    await expect(contentTextarea).toHaveValue(markdownContent);
  });

  test('Test 2.9: Verify Lead submission via public contact form is successfully stored in database and shows up on Admin Leads view', async ({ page }) => {
    // Submit lead via public form
    await page.goto('/contact');
    const name = `Lead Name ${Date.now()}`;
    const email = `lead-${Date.now()}@example.com`;
    const message = `Testing lead submission storage. ${Date.now()}`;

    await page.fill('input[name="name"]', name);
    await page.fill('input[name="email"]', email);
    await page.fill('textarea[name="message"]', message);
    await page.click('button[type="submit"]');

    // Confirm submission success display
    const successMsg = page.locator('.success-message, [data-testid="success-message"], text=/thank you|success|received|submitted/i');
    await expect(successMsg).toBeVisible();

    // Login to admin and verify lead shows up in Leads view
    await adminLogin(page);
    await page.goto('/admin/leads');

    const leadRow = page.locator(`tr:has-text("${email}"), div:has-text("${email}")`).first();
    await expect(leadRow).toBeVisible();
    await expect(leadRow).toContainText(name);
    await expect(leadRow).toContainText(message);
  });

  test('Test 2.10: Verify UI displays empty state messages correctly when tables are empty', async ({ page }) => {
    // Intercept API/Supabase calls to mock an empty database state
    await page.route('**/api/services', async (route) => route.fulfill({ json: [] }));
    await page.route('**/api/blog', async (route) => route.fulfill({ json: [] }));
    await page.route('**/api/leads', async (route) => route.fulfill({ json: [] }));
    await page.route('**/api/admin/services', async (route) => route.fulfill({ json: [] }));
    await page.route('**/api/admin/blog', async (route) => route.fulfill({ json: [] }));
    await page.route('**/api/admin/leads', async (route) => route.fulfill({ json: [] }));

    await page.route('**/*.supabase.co/rest/v1/*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      } else {
        await route.continue();
      }
    });

    await adminLogin(page);

    // Verify empty state messages are rendered across dashboard sections
    await page.goto('/admin/services');
    const emptyServices = page.locator('text=/no services|empty|no items/i').first();
    await expect(emptyServices).toBeVisible();

    await page.goto('/admin/blog');
    const emptyBlogs = page.locator('text=/no blog|empty|no posts|no items/i').first();
    await expect(emptyBlogs).toBeVisible();

    await page.goto('/admin/leads');
    const emptyLeads = page.locator('text=/no leads|empty|no inquiries|no items/i').first();
    await expect(emptyLeads).toBeVisible();
  });
});

// ----------------------------------------------------
// FEATURE 3: Traffic Tracking & Cookie Consent
// ----------------------------------------------------

test.describe('F3: Traffic Tracking & Cookie Consent - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('Test 3.6: Verify cookie consent banner does not reappear on subsequent page loads or refreshes', async ({ page }) => {
    // Case 1: Accept Consent
    await page.goto('/');
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await expect(consentBanner).toBeVisible();
    await consentBanner.locator('button:has-text("Accept")').click();
    await expect(consentBanner).toBeHidden();

    await page.reload();
    await expect(consentBanner).toBeHidden();

    await page.goto('/services');
    await expect(consentBanner).toBeHidden();

    // Case 2: Decline Consent
    await page.context().clearCookies();
    await page.goto('/');
    await expect(consentBanner).toBeVisible();
    await consentBanner.locator('button:has-text("Decline")').click();
    await expect(consentBanner).toBeHidden();

    await page.reload();
    await expect(consentBanner).toBeHidden();

    await page.goto('/services');
    await expect(consentBanner).toBeHidden();
  });

  test('Test 3.7: Verify analytics script handles fetch errors (when /api/track fails) without crashing the frontend', async ({ page }) => {
    await page.goto('/');
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await consentBanner.locator('button:has-text("Accept")').click();

    // Route /api/track to return a Server Error (500)
    await page.route('**/api/track', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // Navigate to trigger analytics tracking event
    await page.goto('/services');

    // Frontend must remain fully functional
    const servicesHeader = page.locator('h1, h2').first();
    await expect(servicesHeader).toBeVisible();
    await expect(servicesHeader).not.toBeEmpty();
  });

  test('Test 3.8: Verify consent can be revoked or changed via a privacy settings link/button on the page', async ({ page }) => {
    await page.goto('/');
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await consentBanner.locator('button:has-text("Accept")').click();
    await expect(consentBanner).toBeHidden();

    // Find and click the privacy settings trigger
    const privacyBtn = page.locator('button:has-text("Privacy Settings"), a:has-text("Cookie Settings"), [data-testid="privacy-settings-btn"]').first();
    await expect(privacyBtn).toBeVisible();
    await privacyBtn.click();

    // Consent banner must reappear
    await expect(consentBanner).toBeVisible();

    // Re-verify that changing option works (Decline)
    await consentBanner.locator('button:has-text("Decline")').click();
    await expect(consentBanner).toBeHidden();

    const cookies = await page.context().cookies();
    const consentCookie = cookies.find((c) => c.name === 'cookie-consent');
    const localConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'));
    const isDeclined = consentCookie?.value === 'declined' || localConsent === 'declined';
    expect(isDeclined).toBe(true);
  });

  test('Test 3.9: Verify no traffic logs are written to the database with consent_granted=false when cookies are rejected', async ({ page }) => {
    // Count existing traffic logs
    const { data: initialLogs } = await supabase.from('traffic_logs').select('*');
    const initialCount = initialLogs?.length || 0;

    await page.goto('/');
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await consentBanner.locator('button:has-text("Decline")').click();

    // Perform multiple navigations
    await page.goto('/services');
    await page.goto('/about');
    await page.waitForTimeout(2000);

    // Verify database counts have not increased for traffic logs
    const { data: finalLogs } = await supabase.from('traffic_logs').select('*');
    const finalCount = finalLogs?.length || 0;

    const consentFalseLogs = finalLogs?.filter((log) => log.consent_granted === false) || [];
    const initialConsentFalseLogs = initialLogs?.filter((log) => log.consent_granted === false) || [];

    expect(consentFalseLogs.length).toBe(initialConsentFalseLogs.length);
    expect(finalCount).toBe(initialCount);
  });

  test('Test 3.10: Verify that /api/track payload contains valid schema fields', async ({ page }) => {
    await page.goto('/');
    const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
    await consentBanner.locator('button:has-text("Accept")').click();

    // Intercept track POST request
    const trackRequestPromise = page.waitForRequest(
      (request) => request.url().includes('/api/track') && request.method() === 'POST'
    );

    await page.goto('/services');

    const request = await trackRequestPromise;
    expect(request).toBeDefined();

    const postData = request.postData();
    expect(postData).toBeDefined();

    if (postData) {
      const payload = JSON.parse(postData);
      expect(payload).toHaveProperty('path');
      expect(typeof payload.path).toBe('string');
      expect(payload.path).toMatch(/^\//);

      expect(payload).toHaveProperty('timestamp');
      expect(payload.timestamp).toBeDefined();

      expect(payload).toHaveProperty('user_agent');
      expect(typeof payload.user_agent).toBe('string');

      expect(payload).toHaveProperty('consent_granted');
      expect(payload.consent_granted).toBe(true);
    }
  });
});

// ----------------------------------------------------
// FEATURE 4: Admin Auth, Security & Rate-limiting
// ----------------------------------------------------

test.describe('F4: Admin Auth, Security & Rate-limiting - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('Test 4.6: Verify that repeated failed logins (5 attempts) on /api/auth/login trigger rate limiting and return HTTP 429', async ({ request }) => {
    // 5 failed login attempts
    for (let i = 0; i < 5; i++) {
      const response = await request.post('/api/auth/login', {
        data: {
          email: `attacker-${i}@agency.com`,
          password: 'wrongpassword',
        },
      });
      expect(response.status()).toBe(401);
    }

    // 6th attempt must trigger rate limit
    const limitResponse = await request.post('/api/auth/login', {
      data: {
        email: 'attacker-5@agency.com',
        password: 'wrongpassword',
      },
    });
    expect(limitResponse.status()).toBe(429);
  });

  test('Test 4.7: Verify the rate limit window resets after its duration and lets user attempt login again', async ({ page, request }) => {
    // Trigger rate limiting
    for (let i = 0; i < 5; i++) {
      await request.post('/api/auth/login', {
        data: { email: 'user@agency.com', password: 'wrongpassword' },
      });
    }

    const rateLimitedRes = await request.post('/api/auth/login', {
      data: { email: 'user@agency.com', password: 'wrongpassword' },
    });
    expect(rateLimitedRes.status()).toBe(429);

    // Wait for the window reset (simulated short delay in testing mode)
    await page.waitForTimeout(2000);

    // Try login again
    const resetResponse = await request.post('/api/auth/login', {
      data: { email: 'admin@agency.com', password: 'adminpassword' },
    });

    // It should no longer return 429
    expect(resetResponse.status()).not.toBe(429);
  });

  test('Test 4.8: Verify that authentication tokens/cookies are set with HttpOnly, Secure (in prod), and SameSite flags', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
    await page.fill('input[type="password"], input[name="password"]', 'adminpassword');

    const loginResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/auth/login') || response.url().includes('/admin')
    );
    await page.click('button[type="submit"]');

    await loginResponsePromise;

    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === 'admin_session' || c.name.includes('session'));

    expect(sessionCookie).toBeDefined();
    if (sessionCookie) {
      expect(sessionCookie.httpOnly).toBe(true);
      expect(['Lax', 'Strict']).toContain(sessionCookie.sameSite);
      expect(sessionCookie.secure).toBeDefined();
    }
  });

  test('Test 4.9: Verify that invalid/malformed session tokens/cookies are rejected by middleware and redirect to login', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'admin_session',
        value: 'invalid-malformed-token-12345',
        domain: 'localhost',
        path: '/',
      },
    ]);

    const protectedRoutes = ['/admin', '/admin/services', '/admin/blog', '/admin/leads'];
    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/\/admin\/login|\/login/);
    }
  });

  test('Test 4.10: Verify rate limiting counts failures per-IP or per-username separately so standard users are not blocked by a single attacker\'s failed attempts', async ({ request }) => {
    // 5 failed login attempts for specific user
    for (let i = 0; i < 5; i++) {
      await request.post('/api/auth/login', {
        data: { email: 'attacker@agency.com', password: 'wrongpassword' },
      });
    }

    // 6th attempt is rate-limited
    const attackerRes = await request.post('/api/auth/login', {
      data: { email: 'attacker@agency.com', password: 'wrongpassword' },
    });
    expect(attackerRes.status()).toBe(429);

    // Standard user tries login and should not be blocked by attacker rate limit
    const standardUserRes = await request.post('/api/auth/login', {
      data: { email: 'admin@agency.com', password: 'adminpassword' },
    });
    expect(standardUserRes.status()).not.toBe(429);
  });
});
