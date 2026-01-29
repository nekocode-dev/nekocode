import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/NekoCode/);
});

test('hero section is visible', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    await expect(page.locator('h1.text-hero')).toBeVisible();
});

test('contact form navigation', async ({ page }) => {
    await page.goto('/');

    // Find a link to contact page (assuming there is one, or we check the contact page directly)
    // If no direct link, we just check the contact page availability
    await page.goto('/contact');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('form')).toBeVisible();
});
