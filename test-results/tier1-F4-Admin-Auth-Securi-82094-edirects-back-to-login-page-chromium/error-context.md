# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1.spec.ts >> F4: Admin Auth, Security & Rate-limiting >> Test 4.3: Verify logging out revokes authentication and redirects back to login page
- Location: tests\tier1.spec.ts:381:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin$/
Received string:  "http://localhost:3000/admin/traffic"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    7 × unexpected value "http://localhost:3000/admin/login"
    5 × unexpected value "http://localhost:3000/admin/traffic"

```

```yaml
- complementary:
  - text: CMS Admin
  - navigation "Admin navigation":
    - link "Traffic":
      - /url: /admin/traffic
    - link "Leads":
      - /url: /admin/leads
    - link "Services":
      - /url: /admin/services
    - link "Blog Posts":
      - /url: /admin/blog
  - link "← Back to site":
    - /url: /
- heading "Traffic Analytics" [level=1]
- paragraph: Only visits where cookie consent was explicitly granted are recorded.
- paragraph: Total Page Views
- paragraph: "0"
- paragraph: consent-granted only
- paragraph: Consent Rate
- paragraph: 0%
- paragraph: 0 granted / 0 denied
- paragraph: Granted
- paragraph: "0"
- paragraph: users tracked
- paragraph: Denied
- paragraph: "0"
- paragraph: not tracked
- heading "Recent Activity Log" [level=2]
- text: 0 entries
- paragraph: No traffic data yet.
- paragraph: Data is recorded only when a visitor accepts the cookie consent banner.
- contentinfo:
  - link "Home":
    - /url: /
    - text: Atlas
  - paragraph: Digital infrastructure & software engineering for enterprise organisations.
  - text: Systems Online
  - paragraph: Platform
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link "Services":
        - /url: /services
    - listitem:
      - link "About":
        - /url: /about
    - listitem:
      - link "Contact":
        - /url: /contact
  - paragraph: Services
  - list:
    - listitem:
      - link "IaaS Infrastructure":
        - /url: /services
    - listitem:
      - link "SaaS Engineering":
        - /url: /services
    - listitem:
      - link "Digital Transformation":
        - /url: /services
    - listitem:
      - link "DevOps Automation":
        - /url: /services
  - paragraph: Legal
  - list:
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
    - listitem:
      - link "Cookie Policy":
        - /url: /cookies
    - listitem:
      - link "Terms of Use":
        - /url: /terms
  - paragraph: © 2026 Atlas. All rights reserved.
  - paragraph: Engineered for uptime. Built for scale.
- alert
- dialog "Cookie consent":
  - paragraph: Your Privacy Choices
  - paragraph:
    - text: We use cookies and similar technologies to analyse site traffic and improve your experience. This is in compliance with India's
    - strong: Digital Personal Data Protection (DPDP) Act, 2023
    - text: and global standards including
    - strong: GDPR
    - text: . No data is recorded without your explicit consent.
  - link "Privacy Policy":
    - /url: /privacy
  - link "Cookie Policy":
    - /url: /cookies
  - button "Reject All"
  - button "Accept All"
```

# Test source

```ts
  287 |     await expect(consentBanner).toBeHidden();
  288 | 
  289 |     // Check cookie or localStorage has cookie-consent=declined
  290 |     const cookies = await page.context().cookies();
  291 |     const consentCookie = cookies.find(c => c.name === 'cookie-consent');
  292 |     const localConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'));
  293 | 
  294 |     const isDeclined = (consentCookie?.value === 'declined') || (localConsent === 'declined');
  295 |     expect(isDeclined).toBe(true);
  296 |   });
  297 | 
  298 |   test('Test 3.4: Verify that when consent is accepted, navigation events trigger "/api/track" requests to log visits', async ({ page }) => {
  299 |     await page.goto('/');
  300 | 
  301 |     // Accept consent
  302 |     const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
  303 |     await consentBanner.locator('button:has-text("Accept")').click();
  304 | 
  305 |     // Intercept API track call
  306 |     const trackRequestPromise = page.waitForRequest(request =>
  307 |       request.url().includes('/api/track') && request.method() === 'POST'
  308 |     );
  309 | 
  310 |     // Navigate to trigger analytics tracking event
  311 |     await page.goto('/services');
  312 | 
  313 |     const request = await trackRequestPromise;
  314 |     expect(request).toBeDefined();
  315 | 
  316 |     // Verify correct fields inside post data
  317 |     const postData = request.postData();
  318 |     if (postData) {
  319 |       const payload = JSON.parse(postData);
  320 |       expect(payload.consent_granted).toBe(true);
  321 |     }
  322 |   });
  323 | 
  324 |   test('Test 3.5: Verify that when consent is declined, navigation events do NOT trigger any "/api/track" requests', async ({ page }) => {
  325 |     await page.goto('/');
  326 | 
  327 |     // Decline consent
  328 |     const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
  329 |     await consentBanner.locator('button:has-text("Decline")').click();
  330 | 
  331 |     let trackRequestSent = false;
  332 |     page.on('request', request => {
  333 |       if (request.url().includes('/api/track')) {
  334 |         trackRequestSent = true;
  335 |       }
  336 |     });
  337 | 
  338 |     // Navigate to services page
  339 |     await page.goto('/services');
  340 |     // Allow small window for background API track call to be missed
  341 |     await page.waitForTimeout(2000);
  342 | 
  343 |     expect(trackRequestSent).toBe(false);
  344 |   });
  345 | });
  346 | 
  347 | // ----------------------------------------------------
  348 | // FEATURE 4: Admin Auth, Security & Rate-limiting
  349 | // ----------------------------------------------------
  350 | 
  351 | test.describe('F4: Admin Auth, Security & Rate-limiting', () => {
  352 |   test.beforeEach(async ({ page }) => {
  353 |     // Clear cookies to simulate unauthenticated state before each test
  354 |     await page.context().clearCookies();
  355 |   });
  356 | 
  357 |   test('Test 4.1: Verify unauthenticated attempts to access "/admin", "/admin/services", etc. are redirected to "/admin/login" or "/login"', async ({ page }) => {
  358 |     const protectedRoutes = ['/admin', '/admin/services', '/admin/blog', '/admin/leads'];
  359 | 
  360 |     for (const route of protectedRoutes) {
  361 |       await page.goto(route);
  362 |       await expect(page).toHaveURL(/\/admin\/login|\/login/);
  363 |     }
  364 |   });
  365 | 
  366 |   test('Test 4.2: Verify logging in with correct credentials allows access to protected "/admin" routes', async ({ page }) => {
  367 |     await page.goto('/admin/login');
  368 | 
  369 |     await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
  370 |     await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
  371 |     await page.click('button[type="submit"]');
  372 | 
  373 |     // Confirm redirected to admin dashboard
  374 |     await expect(page).toHaveURL(/\/admin$/);
  375 | 
  376 |     // Verify sub-admin pages are now accessible
  377 |     await page.goto('/admin/services');
  378 |     await expect(page).toHaveURL(/\/admin\/services/);
  379 |   });
  380 | 
  381 |   test('Test 4.3: Verify logging out revokes authentication and redirects back to login page', async ({ page }) => {
  382 |     // Perform standard login
  383 |     await page.goto('/admin/login');
  384 |     await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
  385 |     await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
  386 |     await page.click('button[type="submit"]');
> 387 |     await expect(page).toHaveURL(/\/admin$/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  388 | 
  389 |     // Click logout
  390 |     const logoutBtn = page.locator('button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout-btn"]');
  391 |     await logoutBtn.click();
  392 | 
  393 |     // Confirm redirected back to login page
  394 |     await expect(page).toHaveURL(/\/admin\/login|\/login/);
  395 | 
  396 |     // Access to dashboard should be blocked again
  397 |     await page.goto('/admin');
  398 |     await expect(page).toHaveURL(/\/admin\/login|\/login/);
  399 |   });
  400 | 
  401 |   test('Test 4.4: Verify logging in with incorrect credentials displays a clean authentication error message', async ({ page }) => {
  402 |     await page.goto('/admin/login');
  403 | 
  404 |     await page.fill('input[type="email"], input[name="email"]', 'incorrect@agency.com');
  405 |     await page.fill('input[type="password"], input[name="password"]', 'wrongpassword');
  406 |     await page.click('button[type="submit"]');
  407 | 
  408 |     // Still on the login page
  409 |     await expect(page).toHaveURL(/\/admin\/login|\/login/);
  410 | 
  411 |     // Clean error message is visible
  412 |     const errorMsg = page.locator('.error-message, [data-testid="error-message"], text=/invalid|failed|incorrect/i');
  413 |     await expect(errorMsg).toBeVisible();
  414 |   });
  415 | 
  416 |   test('Test 4.5: Verify Next.js App Router middleware/proxy protects "/api/admin/*" API endpoints (if any) or admin page handlers from anonymous requests', async ({ request }) => {
  417 |     const response = await request.get('/api/admin/services');
  418 | 
  419 |     // Request should return an authentication error status or redirect
  420 |     const status = response.status();
  421 |     expect([401, 403, 302, 307]).toContain(status);
  422 |   });
  423 | });
  424 | 
```