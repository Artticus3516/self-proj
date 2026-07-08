import { test, expect } from '@playwright/test';

test('has title and main content', async ({ page }) => {
  // Navigate to root
  await page.goto('/');

  // Expect the page to have the correct title
  await expect(page).toHaveTitle('Create Next App');

  // Expect the main h1 heading to contain the starting text
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toContainText('To get started, edit the page.tsx file.');
});
