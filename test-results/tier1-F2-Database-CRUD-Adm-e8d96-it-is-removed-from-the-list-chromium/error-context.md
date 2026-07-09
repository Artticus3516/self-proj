# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1.spec.ts >> F2: Database CRUD & Admin Dashboard >> Test 2.4: Verify Admin can delete a service, and it is removed from the list
- Location: tests\tier1.spec.ts:163:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="title"]')

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
        - generic [ref=e36]:
          - generic [ref=e37]: Password
          - textbox "Password" [ref=e38]:
            - /placeholder: ••••••••
        - button "Sign In" [ref=e39]
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
  71  |     const emailInput = page.locator('input[name="email"]');
  72  |     const messageInput = page.locator('textarea[name="message"]');
  73  |     const submitBtn = page.locator('button[type="submit"]');
  74  | 
  75  |     await expect(nameInput).toBeVisible();
  76  |     await expect(emailInput).toBeVisible();
  77  |     await expect(messageInput).toBeVisible();
  78  |     await expect(submitBtn).toBeVisible();
  79  |   });
  80  | 
  81  |   test('Test 1.5: Verify WebGL canvas element "<canvas>" is present in the Hero component of the landing page', async ({ page }) => {
  82  |     await page.goto('/');
  83  | 
  84  |     // Verify WebGL canvas element exists and is visible in the Hero section
  85  |     const canvas = page.locator('canvas');
  86  |     await expect(canvas).toBeVisible();
  87  |   });
  88  | });
  89  | 
  90  | // ----------------------------------------------------
  91  | // FEATURE 2: Database CRUD & Admin Dashboard
  92  | // ----------------------------------------------------
  93  | 
  94  | test.describe('F2: Database CRUD & Admin Dashboard', () => {
  95  |   // Helper function to handle admin login
  96  |   async function adminLogin(page: Page) {
  97  |     await page.goto('/admin/login');
  98  |     await page.fill('input[type="email"], input[name="email"]', 'admin@agency.com');
  99  |     await page.fill('input[type="password"], input[name="password"]', 'adminpassword');
  100 |     await page.click('button[type="submit"]');
  101 |     await expect(page).toHaveURL(/\/admin/);
  102 |   }
  103 | 
  104 |   test('Test 2.1: Verify Admin Dashboard displays lists of services, blogs, and leads retrieved from the database', async ({ page }) => {
  105 |     await adminLogin(page);
  106 | 
  107 |     // Verify services list/container is present on Admin Dashboard
  108 |     await page.goto('/admin/services');
  109 |     const servicesList = page.locator('[data-testid="services-list"], .services-list, table');
  110 |     await expect(servicesList).toBeVisible();
  111 | 
  112 |     // Verify blogs list/container is present on Admin Blog Dashboard
  113 |     await page.goto('/admin/blog');
  114 |     const blogsList = page.locator('[data-testid="blogs-list"], .blogs-list, table');
  115 |     await expect(blogsList).toBeVisible();
  116 | 
  117 |     // Verify leads list/container is present on Admin Leads Dashboard
  118 |     await page.goto('/admin/leads');
  119 |     const leadsList = page.locator('[data-testid="leads-list"], .leads-list, table');
  120 |     await expect(leadsList).toBeVisible();
  121 |   });
  122 | 
  123 |   test('Test 2.2: Verify Admin can create a new service with valid title and description, and it appears in the list', async ({ page }) => {
  124 |     await adminLogin(page);
  125 |     await page.goto('/admin/services');
  126 | 
  127 |     const titleInput = page.locator('input[name="title"]');
  128 |     const descTextarea = page.locator('textarea[name="description"]');
  129 |     const testTitle = `Service Title ${Date.now()}`;
  130 |     const testDesc = 'Form-submitted service description for testing.';
  131 | 
  132 |     await titleInput.fill(testTitle);
  133 |     await descTextarea.fill(testDesc);
  134 | 
  135 |     await page.click('button[type="submit"]');
  136 | 
  137 |     // Confirm new service appears in the list
  138 |     const newServiceText = page.locator(`text=${testTitle}`);
  139 |     await expect(newServiceText).toBeVisible();
  140 |   });
  141 | 
  142 |   test('Test 2.3: Verify Admin can update an existing service\'s details, and the changes are persisted', async ({ page }) => {
  143 |     await adminLogin(page);
  144 |     await page.goto('/admin/services');
  145 | 
  146 |     // Click edit button for the first service in the list
  147 |     const editBtn = page.locator('button:has-text("Edit"), [data-testid="edit-service-btn"]').first();
  148 |     await editBtn.click();
  149 | 
  150 |     // Update service fields
  151 |     const titleInput = page.locator('input[name="title"]');
  152 |     const updatedTitle = `Updated Service Title ${Date.now()}`;
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
> 171 |     await titleInput.fill(deleteTitle);
      |                      ^ Error: locator.fill: Test timeout of 30000ms exceeded.
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
  253 |     await expect(consentBanner).toContainText(/cookie consent/i);
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
```