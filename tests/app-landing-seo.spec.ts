import { test, expect, type Page } from '@playwright/test';

const appRoutes = [
  {
    path: '/apps/beanbop',
    name: 'BeanBop',
    titlePattern: /BeanBop Smart Caffeine Tracker App/i,
    descriptionPattern: /caffeine.*hydration.*Sleep Shield/i,
    category: 'HealthApplication',
    operatingSystem: 'Android, iOS',
    featureList: ['Fast drink logging', 'Sleep Shield', 'Hydration context', 'Local-first data'],
    storeLinks: [
      'https://play.google.com/store/apps/details?id=com.nekocode.beanbop',
      'https://apps.apple.com/ph/app/beanbop-caffeine-tracker/id6760345252'
    ]
  },
  {
    path: '/apps/flipfocus',
    name: 'FlipFocus',
    titlePattern: /FlipFocus FSRS Flashcards and Study Games/i,
    descriptionPattern: /FSRS-5.*study games.*OCR/i,
    category: 'EducationalApplication',
    operatingSystem: 'Android',
    featureList: ['FSRS-5 scheduling', 'Offline-first library', 'OCR scanning', 'WiFi Direct sharing'],
    storeLinks: ['https://play.google.com/store/apps/details?id=com.nekocode.flipfocus']
  }
];

async function jsonLd(page: Page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap((script) => {
      const parsed = JSON.parse(script.textContent || '[]');
      return Array.isArray(parsed) ? parsed : [parsed];
    })
  );
}

test.describe('app landing SEO', () => {
  for (const app of appRoutes) {
    test(`${app.name} has app structured data, breadcrumbs, FAQ, and catalog sections`, async ({ page }) => {
      await page.goto(app.path);

      await expect(page.locator('[data-testid="app-landing"]')).toBeVisible();
      await expect(page.getByRole('heading', { name: /How it works/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Frequently asked questions/i })).toBeVisible();

      const structuredData = await jsonLd(page);
      const pageUrl = `https://nekocode.dev${app.path}/`;
      const metadata = await page.evaluate(() => ({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content')
      }));

      expect(metadata.title).toMatch(app.titlePattern);
      expect(metadata.title.length).toBeLessThanOrEqual(64);
      expect(metadata.description).toMatch(app.descriptionPattern);
      expect(metadata.description?.length ?? 999).toBeLessThanOrEqual(170);
      expect(metadata.canonical).toBe(pageUrl);
      expect(metadata.robots).toBe('index, follow, max-image-preview:large');

      expect(structuredData).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            mainEntity: expect.objectContaining({
              '@id': `${pageUrl}#app`
            })
          }),
          expect.objectContaining({
            '@type': 'BreadcrumbList',
            itemListElement: expect.arrayContaining([
              expect.objectContaining({
                name: 'Apps'
              }),
              expect.objectContaining({
                name: app.name
              })
            ])
          }),
          expect.objectContaining({
            '@type': expect.arrayContaining(['SoftwareApplication', 'MobileApplication']),
            name: app.name,
            applicationCategory: app.category,
            operatingSystem: app.operatingSystem,
            mainEntityOfPage: expect.objectContaining({
              '@id': `${pageUrl}#webpage`
            }),
            screenshot: expect.stringContaining('/assets/projects/'),
            featureList: app.featureList,
            ...(app.storeLinks.length > 0
              ? {
                  sameAs: app.storeLinks,
                  installUrl: app.storeLinks
                }
              : {}),
            offers: expect.objectContaining({
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            })
          }),
          expect.objectContaining({
            '@type': 'FAQPage',
            mainEntity: expect.arrayContaining([
              expect.objectContaining({
                '@type': 'Question'
              })
            ])
          })
        ])
      );

      for (const href of app.storeLinks) {
        await expect(page.locator(`a[href="${href}"]`)).toHaveCount(2);
      }
    });
  }
});

test('BeanBop live app page does not contain stale in-development download copy', async ({ page }) => {
  await page.goto('/apps/beanbop');

  await expect(page.locator('#download')).toContainText(/live on Android and iOS/i);
  await expect(page.getByText(/currently in development/i)).toHaveCount(0);
});

test('FlipFocus stats stay exact instead of animating mixed labels incorrectly', async ({ page }) => {
  await page.goto('/apps/flipfocus');

  await expect(page.locator('[data-testid="app-stat-values"]')).toContainText('7+');
  await expect(page.locator('[data-testid="app-stat-values"]')).toContainText('FSRS-5');
  await expect(page.locator('[data-testid="app-stat-values"]')).toContainText('Offline');
  await expect(page.locator('[data-testid="app-stat-values"]')).toContainText('3');
  await expect(page.getByText('FSRS-1')).toHaveCount(0);
});

test('apps catalog reads like a product catalog rather than a portfolio gallery', async ({ page }) => {
  await page.goto('/apps');

  await expect(page).toHaveTitle(/NekoCode App Catalog/i);
  await expect(page.getByRole('heading', { name: 'NekoCode App Catalog' })).toBeVisible();
  await expect(page.getByText(/Compare the live and upcoming NekoCode apps/i)).toBeVisible();
  await expect(page.getByText(/story of problem-solving and craft/i)).toHaveCount(0);
});
