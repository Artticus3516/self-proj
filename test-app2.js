const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const navHtml = await page.evaluate(() => {
    // Try to find the Start a Project button's parent
    const links = Array.from(document.querySelectorAll('a'));
    const startProject = links.find(l => l.textContent.includes('Start a Project'));
    if (startProject) {
      return startProject.parentElement.innerHTML;
    }
    return 'Not found';
  });

  console.log('--- NAV HTML ---');
  console.log(navHtml);
  console.log('----------------');

  const btnHtml = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (btn) return btn.outerHTML;
    return 'ThemeToggle button not found';
  });
  console.log('--- BUTTON HTML ---');
  console.log(btnHtml);
  
  await browser.close();
}
run();
