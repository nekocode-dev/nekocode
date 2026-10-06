import { test, expect } from '@playwright/test';

function flipfocusCard(page: import('@playwright/test').Page) {
  return page.locator('.project-card').filter({ has: page.locator('.card-title', { hasText: 'FlipFocus' }) }).first();
}

async function expectContainedCoverImage(coverImage: import('@playwright/test').Locator) {
  await expect(coverImage).toHaveAttribute('src', /\/assets\/projects\/flipfocus\/cover\.png$/);
  await expect.poll(async () => coverImage.evaluate((img) => getComputedStyle(img).objectFit)).toBe('contain');
}

test('work FlipFocus card uses cover image with non-stretched fit', async ({ page }) => {
  await page.goto('/work');

  const card = flipfocusCard(page);
  const coverImage = card.locator('.card-media > img');

  await expectContainedCoverImage(coverImage);
});
