# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1.spec.ts >> F2: Database CRUD & Admin Dashboard >> Test 2.1: Verify Admin Dashboard displays lists of services, blogs, and leads retrieved from the database
- Location: tests\tier1.spec.ts:104:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="services-list"], .services-list, table')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid="services-list"], .services-list, table')

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
- heading "Admin Portal" [level=1]
- paragraph: Sign in to access your dashboard
- text: Username
- textbox "Username":
  - /placeholder: admin
- text: Password
- textbox "Password":
  - /placeholder: ••••••••
- button "Sign In"
- paragraph: "Demo credentials: admin / password"
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
  10  | 
  11  |     // Verify main layout elements
  12  |     const header = page.locator('header');
  13  |     await expect(header).toBeVisible();
  14  | 
  15  |     const footer = page.locator('footer');
  16  |     await expect(footer).toBeVisible();
  17  | 
  18  |     // Verify navigation links for "/", "/services", "/about", and "/contact"
  19  |     const homeLink = page.locator('a[href="/"]').first();
  20  |     const servicesLink = page.locator('a[href="/services"]').first();
  21  |     const aboutLink = page.locator('a[href="/about"]').first();
  22  |     const contactLink = page.locator('a[href="/contact"]').first();
  23  | 
  24  |     await expect(homeLink).toBeVisible();
  25  |     await expect(servicesLink).toBeVisible();
  26  |     await expect(aboutLink).toBeVisible();
  27  |     await expect(contactLink).toBeVisible();
  28  |   });
  29  | 
  30  |   test('Test 1.2: Verify pre-loader is displayed initially and eventually dismissed (content revealed)', async ({ page }) => {
  31  |     await page.goto('/');
  32  | 
  33  |     // Pre-loader element should be dismissed and hidden once loaded
  34  |     const preloader = page.locator('#preloader, #pre-loader, .preloader, [data-testid="preloader"]');
  35  |     await expect(preloader).toBeHidden({ timeout: 10000 });
  36  | 
  37  |     // Verify main content is visible after pre-loader is dismissed
  38  |     const mainContent = page.locator('main');
  39  |     await expect(mainContent).toBeVisible();
  40  |   });
  41  | 
  42  |   test('Test 1.3: Verify navigation to Services page "/services" and rendering of its header and content', async ({ page }) => {
  43  |     await page.goto('/');
  44  |     const servicesLink = page.locator('a[href="/services"]').first();
  45  |     await servicesLink.click();
  46  | 
  47  |     // Verify correct page URL
  48  |     await expect(page).toHaveURL(/\/services/);
  49  | 
  50  |     // Verify Services header and content
  51  |     const servicesHeader = page.locator('h1, h2').first();
  52  |     await expect(servicesHeader).toBeVisible();
  53  |     await expect(servicesHeader).not.toBeEmpty();
  54  |   });
  55  | 
  56  |   test('Test 1.4: Verify navigation to About page "/about" and Contact page "/contact" and rendering of their respective contents', async ({ page }) => {
  57  |     // Navigate to About page
  58  |     await page.goto('/about');
  59  |     await expect(page).toHaveURL(/\/about/);
  60  |     const aboutHeader = page.locator('h1, h2').first();
  61  |     await expect(aboutHeader).toBeVisible();
  62  | 
  63  |     // Navigate to Contact page
  64  |     await page.goto('/contact');
  65  |     await expect(page).toHaveURL(/\/contact/);
  66  |     const contactHeader = page.locator('h1, h2').first();
  67  |     await expect(contactHeader).toBeVisible();
  68  | 
  69  |     // Verify Contact form inputs and submit button presence
  70  |     const nameInput = page.locator('input[name="name"]');
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
> 110 |     await expect(servicesList).toBeVisible();
      |                                ^ Error: expect(locator).toBeVisible() failed
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
```