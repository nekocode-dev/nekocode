import { test, expect } from '@playwright/test';

test('homepage retains search and social metadata for the current apps', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('NekoCode Apps | Privacy-First Mobile App Showcase');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toMatch(/BeanBop and FlipFocus/);
  expect(description).not.toMatch(/FrendLyst|SYSTEM Fitness/i);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://nekocode.dev/og-image.png');
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts => scripts.flatMap(script => JSON.parse(script.textContent || '[]')));
  expect(schemas).toEqual(expect.arrayContaining([expect.objectContaining({ '@type': 'Organization', name: 'NekoCode' })]));
});

test('homepage hero and featured cards navigate to existing pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'NekoCode', exact: true, level: 1 })).toBeVisible();
  await expect(page.getByText('Apps for a kinder tomorrow.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore Our Apps' })).toHaveAttribute('href', '/apps');
  await expect(page.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact');
  const cards = page.locator('[data-testid="featured-apps"] a');
  await expect(cards).toHaveCount(2);
  expect(await cards.locator('h3').allTextContents()).toEqual(['BeanBop', 'FlipFocus']);
  const originalIcons = { beanbop: '/assets/projects/beanbop/logo.webp', flipfocus: '/assets/projects/flipfocus/icon.png' };
  for (const [slug, icon] of Object.entries(originalIcons)) {
    await expect(cards.filter({ has: page.locator(`img[src="${icon}"]`) })).toHaveAttribute('href', `/apps/${slug}`);
  }
  await expect(page.locator('.nav-logo img')).toHaveAttribute('src', '/Nekocode.png');
  await expect(page.locator('.footer-logo img')).toHaveAttribute('src', '/Nekocode.png');
  await page.getByRole('link', { name: 'Explore Our Apps' }).click();
  await expect(page.getByRole('heading', { name: 'NekoCode App Catalog' })).toBeVisible();
});

test('withdrawn apps are absent from site listings and sitemap', async ({ page, request }) => {
  for (const path of ['/', '/apps', '/work', '/team', '/contact']) {
    await page.goto(path);
    await expect(page.locator('footer')).toContainText('Nine lives of code.');
    await expect(page.locator('footer visitor-counter')).toHaveCount(1);
    await expect(page.locator('body')).not.toContainText(/FrendLyst|SYSTEM Fitness/i);
    await expect(page.locator('a[href*="/apps/frendlyst"], a[href*="/apps/system-fitness"]')).toHaveCount(0);
  }
  const sitemap = await request.get('/sitemap-0.xml');
  expect(await sitemap.text()).not.toMatch(/frendlyst|system-fitness/i);
  for (const path of ['/apps/frendlyst/', '/apps/system-fitness/']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test('hero artwork and app icons load successfully', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => page.locator('.hero-art img, .app-icon').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
});

test('mobile menu supports keyboard dismissal and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('[data-mobile-toggle]');
  await expect(toggle).toHaveAccessibleName('Open menu');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAccessibleName('Close menu');
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole('link', { name: 'Apps', exact: true }).click();
  await expect(page).toHaveURL(/\/apps\/?$/);
});

test('responsive homepage remains readable without horizontal overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1024, 1536]) {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-art img')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}px`).toBe(true);
  }
});

test('contact form remains available', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('form')).toBeVisible();
});

test('restored visitor counter displays the service total and does not count returning visitors twice', async ({ page }) => {
  const actions: string[] = [];
  await page.route('**/visitor-counter-test*', async route => {
    actions.push(new URL(route.request().url()).searchParams.get('action') || '');
    await route.fulfill({ json: { count: 1234 } });
  });
  // Exercise the production component without incrementing the real service during tests.
  await page.route('http://localhost:4321/', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/data-script-url(?:="[^"]*")?/g, 'data-script-url="http://localhost:4321/visitor-counter-test"');
    await route.fulfill({ response, body });
  });
  await page.goto('/');
  await expect(page.locator('visitor-counter .count')).toHaveText('1,234');
  await expect(page.locator('visitor-counter')).toHaveAttribute('data-state', 'ready');
  await page.reload();
  await expect(page.locator('visitor-counter .count')).toHaveText('1,234');
  expect(actions).toEqual(['increment_visitor', 'get_count']);
});

test('visitor counter handles a failed service without displaying a fabricated total', async ({ page }) => {
  let requests = 0;
  await page.route('**/visitor-counter-test*', route => {
    requests++;
    return route.fulfill({ status: 503, body: 'Unavailable' });
  });
  await page.route('http://localhost:4321/', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/data-script-url(?:="[^"]*")?/g, 'data-script-url="http://localhost:4321/visitor-counter-test"');
    await route.fulfill({ response, body });
  });
  await page.goto('/');
  await expect(page.locator('visitor-counter .count')).toHaveText('—');
  await expect(page.locator('visitor-counter')).toHaveAttribute('data-state', 'unavailable');
  expect(requests).toBe(1);
});
