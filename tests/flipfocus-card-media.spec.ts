import { test, expect } from '@playwright/test';

function flipfocusCard(page: import('@playwright/test').Page) {
  return page.locator('.project-card').filter({ has: page.locator('.card-title', { hasText: 'FlipFocus' }) }).first();
}

async function expectContainedCoverImage(coverImage: import('@playwright/test').Locator) {
  await expect(coverImage).toHaveAttribute('src', /\/assets\/projects\/flipfocus\/cover\.png$/);
  await expect.poll(async () => coverImage.evaluate((img) => getComputedStyle(img).objectFit)).toBe('contain');
}

test('home FlipFocus card uses cover image with non-stretched fit', async ({ page }) => {
  await page.goto('/');

  const card = page.locator('.lineup-card', { hasText: 'FlipFocus' }).first();
  const coverImage = card.locator('.lineup-media > img');

  await expect(coverImage).toHaveAttribute('src', /\/assets\/projects\/flipfocus\/cover\.png$/);
  await expect.poll(async () => coverImage.evaluate((img) => getComputedStyle(img).objectFit)).toBe('cover');
  await expect.poll(async () => card.locator('.lineup-media').evaluate((media) => getComputedStyle(media).overflow)).toBe('hidden');
  await expect.poll(async () =>
    card.locator('.lineup-media').evaluate((media) => {
      const rect = media.getBoundingClientRect();
      return Number((rect.width / rect.height).toFixed(2));
    })
  ).toBe(2);
});

test('work FlipFocus card uses cover image with non-stretched fit', async ({ page }) => {
  await page.goto('/work');

  const card = flipfocusCard(page);
  const coverImage = card.locator('.card-media > img');

  await expectContainedCoverImage(coverImage);
});
