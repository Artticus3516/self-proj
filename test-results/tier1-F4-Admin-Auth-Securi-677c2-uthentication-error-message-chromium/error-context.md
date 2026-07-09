# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1.spec.ts >> F4: Admin Auth, Security & Rate-limiting >> Test 4.4: Verify logging in with incorrect credentials displays a clean authentication error message
- Location: tests\tier1.spec.ts:401:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: .error-message, [data-testid="error-message"], text=/invalid|failed|incorrect/i
Expected: visible
Error: Unexpected token "=" while parsing css selector ".error-message, [data-testid="error-message"], text=/invalid|failed|incorrect/i". Did you mean to CSS.escape it?

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for .error-message, [data-testid="error-message"], text=/invalid|failed|incorrect/i

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e5]:
    - complementary [ref=e6]:
      - generic [ref=e7]:
        - img [ref=e8]
        - generic [ref=e11]: CMS Admin
      - navigation "Admin navigation" [ref=e12]:
        - link "Traffic" [ref=e13] [cursor=pointer]:
          - /url: /admin/traffic
          - generic [ref=e14]: 📊
          - text: Traffic
        - link "Leads" [ref=e15] [cursor=pointer]:
          - /url: /admin/leads
          - generic [ref=e16]: 📬
          - text: Leads
        - link "Services" [ref=e17] [cursor=pointer]:
          - /url: /admin/services
          - generic [ref=e18]: ⚙️
          - text: Services
        - link "Blog Posts" [ref=e19] [cursor=pointer]:
          - /url: /admin/blog
          - generic [ref=e20]: 📝
          - text: Blog Posts
      - link "← Back to site" [ref=e22] [cursor=pointer]:
        - /url: /
    - generic [ref=e25]:
      - generic [ref=e26]:
        - img [ref=e27]
        - heading "Admin Portal" [level=1] [ref=e30]
        - paragraph [ref=e31]: Sign in to access your dashboard
      - generic [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: Username
          - textbox "Username" [ref=e35]:
            - /placeholder: admin
            - text: incorrect@agency.com
        - generic [ref=e36]:
          - generic [ref=e37]: Password
          - textbox "Password" [ref=e38]:
            - /placeholder: ••••••••
            - text: wrongpassword
        - button "Signing in…" [disabled] [ref=e39]
      - paragraph [ref=e40]: "Demo credentials: admin / password"
  - contentinfo [ref=e41]:
    - generic [ref=e42]:
      - generic [ref=e43]:
        - generic [ref=e44]:
          - link "Home" [ref=e45] [cursor=pointer]:
            - /url: /
            - img [ref=e46]
            - generic [ref=e49]: Atlas
          - paragraph [ref=e50]: Digital infrastructure & software engineering for enterprise organisations.
          - generic [ref=e53]: Systems Online
        - generic [ref=e54]:
          - paragraph [ref=e55]: Platform
          - list [ref=e56]:
            - listitem [ref=e57]:
              - link "Home" [ref=e58] [cursor=pointer]:
                - /url: /
            - listitem [ref=e59]:
              - link "Services" [ref=e60] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e61]:
              - link "About" [ref=e62] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e63]:
              - link "Contact" [ref=e64] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e65]:
          - paragraph [ref=e66]: Services
          - list [ref=e67]:
            - listitem [ref=e68]:
              - link "IaaS Infrastructure" [ref=e69] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e70]:
              - link "SaaS Engineering" [ref=e71] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e72]:
              - link "Digital Transformation" [ref=e73] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e74]:
              - link "DevOps Automation" [ref=e75] [cursor=pointer]:
                - /url: /services
        - generic [ref=e76]:
          - paragraph [ref=e77]: Legal
          - list [ref=e78]:
            - listitem [ref=e79]:
              - link "Privacy Policy" [ref=e80] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e81]:
              - link "Cookie Policy" [ref=e82] [cursor=pointer]:
                - /url: /cookies
            - listitem [ref=e83]:
              - link "Terms of Use" [ref=e84] [cursor=pointer]:
                - /url: /terms
      - generic [ref=e86]:
        - paragraph [ref=e87]: © 2026 Atlas. All rights reserved.
        - paragraph [ref=e88]: Engineered for uptime. Built for scale.
  - button "Open Next.js Dev Tools" [ref=e94] [cursor=pointer]:
    - img [ref=e95]
  - alert [ref=e98]
  - dialog "Cookie consent" [ref=e99]:
    - generic [ref=e100]:
      - generic [ref=e101]:
        - generic [ref=e102]: 🍪
        - generic [ref=e103]:
          - paragraph [ref=e104]: Your Privacy Choices
          - paragraph [ref=e105]:
            - text: We use cookies and similar technologies to analyse site traffic and improve your experience. This is in compliance with India's
            - strong [ref=e106]: Digital Personal Data Protection (DPDP) Act, 2023
            - text: and global standards including
            - strong [ref=e107]: GDPR
            - text: . No data is recorded without your explicit consent.
      - generic [ref=e108]:
        - link "Privacy Policy" [ref=e109] [cursor=pointer]:
          - /url: /privacy
        - generic [ref=e110]: ·
        - link "Cookie Policy" [ref=e111] [cursor=pointer]:
          - /url: /cookies
      - generic [ref=e112]:
        - button "Reject All" [ref=e113]
        - button "Accept All" [ref=e114]
```

# Test source

```ts
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
  387 |     await expect(page).toHaveURL(/\/admin$/);
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
> 413 |     await expect(errorMsg).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
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