# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1.spec.ts >> F3: Traffic Tracking & Cookie Consent >> Test 3.1: Verify cookie consent banner is displayed on first visit to the site
- Location: tests\tier1.spec.ts:248:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]')
Expected pattern: /cookie consent/i
Received string:  "🍪Your Privacy ChoicesWe use cookies and similar technologies to analyse site traffic and improve your experience. This is in compliance with India's Digital Personal Data Protection (DPDP) Act, 2023 and global standards including GDPR. No data is recorded without your explicit consent.Privacy Policy·Cookie PolicyReject AllAccept All"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]')
    12 × locator resolved to <div role="dialog" aria-modal="true" id="cookie-consent-banner" aria-label="Cookie consent" class="fixed bottom-4 left-4 right-4 z-[9000] md:bottom-6 md:left-auto md:right-6 md:max-w-md">…</div>
       - unexpected value "🍪Your Privacy ChoicesWe use cookies and similar technologies to analyse site traffic and improve your experience. This is in compliance with India's Digital Personal Data Protection (DPDP) Act, 2023 and global standards including GDPR. No data is recorded without your explicit consent.Privacy Policy·Cookie PolicyReject AllAccept All"

```

```yaml
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
  153 |     await titleInput.fill(updatedTitle);
  154 | 
  155 |     // Click save/update button
  156 |     await page.click('button[type="submit"], button:has-text("Save"), button:has-text("Update")');
  157 | 
  158 |     // Confirm the change is persisted in the list view
  159 |     const updatedServiceText = page.locator(`text=${updatedTitle}`);
  160 |     await expect(updatedServiceText).toBeVisible();
  161 |   });
  162 | 
  163 |   test('Test 2.4: Verify Admin can delete a service, and it is removed from the list', async ({ page }) => {
  164 |     await adminLogin(page);
  165 |     await page.goto('/admin/services');
  166 | 
  167 |     // Create a temporary service to delete so other tests don't break existing data
  168 |     const titleInput = page.locator('input[name="title"]');
  169 |     const descTextarea = page.locator('textarea[name="description"]');
  170 |     const deleteTitle = `To Be Deleted ${Date.now()}`;
  171 |     await titleInput.fill(deleteTitle);
  172 |     await descTextarea.fill('Temporary service description.');
  173 |     await page.click('button[type="submit"]');
  174 | 
  175 |     // Verify service is listed
  176 |     const serviceItem = page.locator(`text=${deleteTitle}`);
  177 |     await expect(serviceItem).toBeVisible();
  178 | 
  179 |     // Locate the container holding our service item
  180 |     const container = page.locator(`tr:has-text("${deleteTitle}"), div:has-text("${deleteTitle}")`).last();
  181 |     const deleteBtn = container.locator('button:has-text("Delete"), [data-testid="delete-btn"]');
  182 | 
  183 |     // Accept dialog prompt automatically if present
  184 |     page.once('dialog', async dialog => {
  185 |       await dialog.accept();
  186 |     });
  187 | 
  188 |     await deleteBtn.click();
  189 | 
  190 |     // Verify service is removed from the UI
  191 |     await expect(serviceItem).toBeHidden();
  192 |   });
  193 | 
  194 |   test('Test 2.5: Verify Admin can create, read, update, and delete blog posts', async ({ page }) => {
  195 |     await adminLogin(page);
  196 |     await page.goto('/admin/blog');
  197 | 
  198 |     // 1. CREATE
  199 |     const titleInput = page.locator('input[name="title"]');
  200 |     const contentTextarea = page.locator('textarea[name="content"]');
  201 |     const blogTitle = `Test Blog Post ${Date.now()}`;
  202 |     const blogContent = 'Content for a testing blog post.';
  203 | 
  204 |     await titleInput.fill(blogTitle);
  205 |     await contentTextarea.fill(blogContent);
  206 |     await page.click('button[type="submit"]');
  207 | 
  208 |     // 2. READ (Verify it appears in the list)
  209 |     const blogItem = page.locator(`text=${blogTitle}`);
  210 |     await expect(blogItem).toBeVisible();
  211 | 
  212 |     // 3. UPDATE
  213 |     const row = page.locator(`tr:has-text("${blogTitle}"), div:has-text("${blogTitle}")`).last();
  214 |     await row.locator('button:has-text("Edit"), [data-testid="edit-blog-btn"]').click();
  215 | 
  216 |     const updatedBlogTitle = `Updated Blog Title ${Date.now()}`;
  217 |     await titleInput.fill(updatedBlogTitle);
  218 |     await page.click('button[type="submit"], button:has-text("Save"), button:has-text("Update")');
  219 | 
  220 |     const updatedBlogItem = page.locator(`text=${updatedBlogTitle}`);
  221 |     await expect(updatedBlogItem).toBeVisible();
  222 | 
  223 |     // 4. DELETE
  224 |     const updatedRow = page.locator(`tr:has-text("${updatedBlogTitle}"), div:has-text("${updatedBlogTitle}")`).last();
  225 |     const deleteBtn = updatedRow.locator('button:has-text("Delete"), [data-testid="delete-blog-btn"]');
  226 | 
  227 |     page.once('dialog', async dialog => {
  228 |       await dialog.accept();
  229 |     });
  230 | 
  231 |     await deleteBtn.click();
  232 | 
  233 |     // Verify it is deleted
  234 |     await expect(updatedBlogItem).toBeHidden();
  235 |   });
  236 | });
  237 | 
  238 | // ----------------------------------------------------
  239 | // FEATURE 3: Traffic Tracking & Cookie Consent
  240 | // ----------------------------------------------------
  241 | 
  242 | test.describe('F3: Traffic Tracking & Cookie Consent', () => {
  243 |   test.beforeEach(async ({ page }) => {
  244 |     // Clear cookies/storage before each test to ensure a clean first-visit state
  245 |     await page.context().clearCookies();
  246 |   });
  247 | 
  248 |   test('Test 3.1: Verify cookie consent banner is displayed on first visit to the site', async ({ page }) => {
  249 |     await page.goto('/');
  250 | 
  251 |     const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
  252 |     await expect(consentBanner).toBeVisible();
> 253 |     await expect(consentBanner).toContainText(/cookie consent/i);
      |                                 ^ Error: expect(locator).toContainText(expected) failed
  254 |   });
  255 | 
  256 |   test('Test 3.2: Verify accepting cookie consent hides the banner and sets a consent cookie/storage item', async ({ page }) => {
  257 |     await page.goto('/');
  258 | 
  259 |     const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
  260 |     await expect(consentBanner).toBeVisible();
  261 | 
  262 |     const acceptBtn = consentBanner.locator('button:has-text("Accept"), button:has-text("Accept All")');
  263 |     await acceptBtn.click();
  264 | 
  265 |     // Banner should hide
  266 |     await expect(consentBanner).toBeHidden();
  267 | 
  268 |     // Check cookie or localStorage has cookie-consent=accepted
  269 |     const cookies = await page.context().cookies();
  270 |     const consentCookie = cookies.find(c => c.name === 'cookie-consent');
  271 |     const localConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'));
  272 | 
  273 |     const isAccepted = (consentCookie?.value === 'accepted') || (localConsent === 'accepted');
  274 |     expect(isAccepted).toBe(true);
  275 |   });
  276 | 
  277 |   test('Test 3.3: Verify declining cookie consent hides the banner and sets a rejection cookie/storage item', async ({ page }) => {
  278 |     await page.goto('/');
  279 | 
  280 |     const consentBanner = page.locator('#cookie-consent-banner, [data-testid="cookie-consent-banner"]');
  281 |     await expect(consentBanner).toBeVisible();
  282 | 
  283 |     const declineBtn = consentBanner.locator('button:has-text("Decline"), button:has-text("Reject")');
  284 |     await declineBtn.click();
  285 | 
  286 |     // Banner should hide
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
```