import { test, expect } from '@playwright/test';

const frendLystGooglePlayUrl = 'https://play.google.com/store/apps/details?id=com.nekocode.frendlyst';
const frendLystAppStoreUrl = 'https://apps.apple.com/us/app/frendlyst-social-game/id6763485928';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/NekoCode/);
});

test('home page has search-friendly SEO and social metadata', async ({ page }) => {
    await page.goto('/');

    const metadata = await page.evaluate(() => ({
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
        twitterImageAlt: document.querySelector('meta[name="twitter:image:alt"]')?.getAttribute('content'),
        jsonLd: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
            (script) => script.textContent || ''
        )
    }));

    await expect(page).toHaveTitle('NekoCode Apps | Privacy-First Mobile App Showcase');
    expect(metadata.description).toMatch(/FrendLyst, FlipFocus, BeanBop, and SYSTEM Fitness/i);
    expect(metadata.ogTitle).toBe('NekoCode Apps | Privacy-First Mobile App Showcase');
    expect(metadata.ogImage).toBe('https://nekocode.dev/og-image.png');
    expect(metadata.twitterImageAlt).toMatch(/NekoCode mobile app design and development studio/i);

    const structuredData = metadata.jsonLd.flatMap((entry) => JSON.parse(entry));

    expect(structuredData).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                '@type': 'Organization',
                name: 'NekoCode',
                url: 'https://nekocode.dev/'
            }),
            expect.objectContaining({
                '@type': 'WebSite',
                name: 'NekoCode',
                url: 'https://nekocode.dev/'
            }),
            expect.objectContaining({
                '@type': 'WebPage',
                name: 'NekoCode Apps | Privacy-First Mobile App Showcase',
                url: 'https://nekocode.dev/'
            })
        ])
    );
});

test('home page leads with app-showcase framing instead of portfolio CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'NekoCode Apps', level: 1 })).toBeVisible();
    await expect(page.getByText(/led by FrendLyst, a live social discovery game/i)).toBeVisible();

    const heroActionLabels = await page.locator('[data-testid="hero-actions"] a').evaluateAll((links) =>
        links.map((link) => link.getAttribute('aria-label') ?? link.textContent?.replace(/\s+/g, ' ').trim())
    );
    expect(heroActionLabels).toEqual([
        'Download on Google Play',
        'Download on App Store',
        'Explore all apps'
    ]);

    const appShelf = page.locator('[data-testid="hero-app-shelf"]');
    await expect(appShelf).toBeVisible();
    await expect(appShelf.getByText('FrendLyst')).toBeVisible();
    await expect(appShelf.getByText('FlipFocus')).toBeVisible();
    await expect(appShelf.getByText('BeanBop')).toBeVisible();
    await expect(appShelf.getByText('SYSTEM Fitness')).toBeVisible();
});

test('home page leads with a flagship FrendLyst product scene instead of a plain catalog', async ({ page }) => {
    await page.goto('/');

    const hero = page.locator('[data-testid="app-showcase-hero"]');
    await expect(hero.getByRole('heading', { name: 'NekoCode Apps', level: 1 })).toBeVisible();
    await expect(hero.getByRole('link', { name: 'Download on Google Play' })).toHaveAttribute(
        'href',
        frendLystGooglePlayUrl
    );
    await expect(hero.getByRole('link', { name: 'Download on App Store' })).toHaveAttribute(
        'href',
        frendLystAppStoreUrl
    );

    const flagship = hero.locator('[data-testid="flagship-frendlyst-scene"]');
    const featureGrid = flagship.locator('.phone-feature-grid');
    await expect(flagship).toBeVisible();
    await expect(flagship.locator('.phone-frame')).toBeVisible();
    await expect(featureGrid.getByText('Profile Worth', { exact: true })).toBeVisible();
    await expect(featureGrid.getByText('Friend Market', { exact: true })).toBeVisible();
    await expect(featureGrid.getByText('Clubs', { exact: true })).toBeVisible();
    await expect(featureGrid.getByText('Gifts', { exact: true })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Every app gets a launch page' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Featured apps' })).toHaveCount(0);
});

test('home page store badges use matching labels and store icons', async ({ page }) => {
    await page.goto('/');

    const badges = page.locator('[data-testid="hero-actions"] .store-badge');
    await expect(badges).toHaveCount(2);
    await expect(badges.locator('.store-icon')).toHaveCount(2);

    const badgeData = await badges.evaluateAll((links) =>
        links.map((link) => ({
            label: link.querySelector('.store-label')?.textContent?.trim(),
            name: link.querySelector('.store-name')?.textContent?.trim(),
            iconWidth: Math.round(link.querySelector('.store-icon')?.getBoundingClientRect().width ?? 0),
            iconHeight: Math.round(link.querySelector('.store-icon')?.getBoundingClientRect().height ?? 0)
        }))
    );

    expect(badgeData).toEqual([
        { label: 'Download on', name: 'Google Play', iconWidth: 24, iconHeight: 24 },
        { label: 'Download on', name: 'App Store', iconWidth: 24, iconHeight: 24 }
    ]);
});

test('home page hero CTA and app carousel align visually and update the phone preview', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const actionMetrics = await page.locator('[data-testid="hero-actions"]').evaluate((actions) => {
        const links = Array.from(actions.querySelectorAll('a'));
        const [googlePlay, appStore, explore] = links;
        const googleRect = googlePlay.getBoundingClientRect();
        const appStoreRect = appStore.getBoundingClientRect();
        const exploreRect = explore.getBoundingClientRect();

        return {
            storeRowLeft: Math.round(googleRect.left),
            storeRowWidth: Math.round(appStoreRect.right - googleRect.left),
            exploreLeft: Math.round(exploreRect.left),
            exploreWidth: Math.round(exploreRect.width)
        };
    });

    expect(actionMetrics.exploreLeft).toBe(actionMetrics.storeRowLeft);
    expect(actionMetrics.exploreWidth).toBe(actionMetrics.storeRowWidth);

    const carousel = page.locator('[data-testid="hero-app-shelf"]');
    await expect(carousel.getByRole('button', { name: 'FrendLyst Live' })).toHaveAttribute('aria-pressed', 'true');

    await carousel.getByRole('button', { name: 'BeanBop Live' }).click();

    const flagship = page.locator('[data-testid="flagship-frendlyst-scene"]');
    await expect(flagship.locator('[data-carousel-title]')).toHaveText('BeanBop');
    await expect(flagship.locator('[data-carousel-status]')).toHaveText('LIVE');
    await expect(flagship.locator('[data-carousel-profile-label]')).toHaveText('Fast drink logging');
    await expect(flagship.locator('.phone-feature-grid')).toContainText('Sleep Shield');
    await expect(carousel.getByRole('button', { name: 'BeanBop Live' })).toHaveAttribute('aria-pressed', 'true');
    await expect(carousel.getByRole('button', { name: 'FrendLyst Live' })).toHaveAttribute('aria-pressed', 'false');
});

test('home page does not show internal site-explainer copy as a user section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Built for app discovery' })).toHaveCount(0);
    await expect(page.getByText(/The site behaves like a product catalog/i)).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Search visibility' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Store-ready' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'App sites' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Privacy links' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Product loops' })).toHaveCount(0);
    await expect(page.getByText(/Google Play and App Store paths stay visible/i)).toHaveCount(0);
    await expect(page.getByText(/Each product gets a focused landing page/i)).toHaveCount(0);
});

test('home page top navigation includes catalog without individual app links', async ({ page }) => {
    await page.goto('/');

    const topNavLabels = await page.locator('.nav-links .nav-link').allTextContents();

    expect(topNavLabels.map((label) => label.trim())).toEqual(['Home', 'Catalog', 'Team', 'Contact']);

    const navHrefs = await page
        .locator('.nav-links .nav-link')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href')));

    expect(navHrefs).toContain('/apps');
    expect(navHrefs).not.toEqual(expect.arrayContaining(['/apps/frendlyst', '/apps/beanbop', '/apps/flipfocus']));
});

test('home page shows FrendLyst as a live mobile app without web platform', async ({ page }) => {
    await page.goto('/');

    const frendLystCard = page.locator('[data-testid="hero-app-shelf"] button', { hasText: 'FrendLyst' }).first();
    await expect(frendLystCard).toBeVisible();
    await expect(frendLystCard.getByText('Live')).toBeVisible();

    const flagship = page.locator('[data-testid="flagship-frendlyst-scene"]');
    const featureGrid = flagship.locator('.phone-feature-grid');
    await expect(featureGrid.getByText('Profile Worth', { exact: true })).toBeVisible();
    await expect(featureGrid.getByText('Friend Market', { exact: true })).toBeVisible();
    await expect(flagship.getByText('Web')).toHaveCount(0);
});

test('home page lineup cards use consistent wide product artwork', async ({ page }) => {
    await page.goto('/');

    const lineupCards = page.locator('.lineup-card');
    await expect(lineupCards).toHaveCount(4);

    const mediaMetrics = await lineupCards.evaluateAll((cards) =>
        cards.map((card) => {
            const title = card.querySelector('h3')?.textContent?.trim();
            const media = card.querySelector('.lineup-media');
            const image = media?.querySelector('img');
            const titleRow = card.querySelector('.lineup-title-row');
            const mediaRect = media?.getBoundingClientRect();
            const imageRect = image?.getBoundingClientRect();
            const titleRect = titleRow?.getBoundingClientRect();

            return {
                title,
                src: image?.getAttribute('src'),
                mediaAspect: mediaRect ? mediaRect.width / mediaRect.height : 0,
                imageFillRatio: mediaRect && imageRect ? imageRect.width / mediaRect.width : 0,
                imageBottomDelta: mediaRect && imageRect ? imageRect.bottom - mediaRect.bottom : 0,
                titleTopDelta: mediaRect && titleRect ? titleRect.top - mediaRect.bottom : 0,
                mediaOverflow: media ? getComputedStyle(media).overflow : ''
            };
        })
    );

    for (const metric of mediaMetrics) {
        expect(metric.mediaAspect, `${metric.title} media should be wide`).toBeGreaterThan(1.85);
        expect(metric.imageFillRatio, `${metric.title} image should fill the media frame`).toBeGreaterThan(0.98);
        expect(metric.imageBottomDelta, `${metric.title} image should not leak below the media frame`).toBeLessThan(1);
        expect(metric.titleTopDelta, `${metric.title} details should start below the media frame`).toBeGreaterThan(0);
        expect(metric.mediaOverflow, `${metric.title} media frame should clip its image`).toBe('hidden');
    }

    const frendLystLineupCard = page.locator('.lineup-card', { hasText: 'FrendLyst' }).first();
    await expect(frendLystLineupCard.locator('.lineup-title-row img')).toHaveAttribute(
        'src',
        /\/assets\/projects\/frendlyst\/icon\.png$/
    );
    await expect(frendLystLineupCard.locator('.lineup-media img')).toHaveAttribute(
        'src',
        /\/assets\/projects\/frendlyst\/promo\.jpg$/
    );
});

test('FrendLyst app page links to live Android and iOS store listings', async ({ page }) => {
    await page.goto('/apps/frendlyst');

    const download = page.locator('#download');
    await expect(download.getByText(/FrendLyst is live on Android and iOS/i)).toBeVisible();
    await expect(download.getByRole('button', { name: /Coming Soon/i })).toHaveCount(0);

    const googlePlay = download.getByRole('link', { name: 'Google Play' });
    const appStore = download.getByRole('link', { name: 'App Store' });

    await expect(googlePlay).toHaveAttribute('href', frendLystGooglePlayUrl);
    await expect(googlePlay).toHaveAttribute('target', '_blank');
    await expect(appStore).toHaveAttribute('href', frendLystAppStoreUrl);
    await expect(appStore).toHaveAttribute('target', '_blank');
});

test('default social image exists for previews', async ({ request }) => {
    const response = await request.get('/og-image.png');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
});

test('hero section is visible', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    await expect(page.locator('h1.text-hero')).toBeVisible();
});

test('hero words stay readable without accidental highlight boxes in reduced-motion mode', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const contrastData = await page.evaluate(() => {
        const parseRgb = (value: string) => {
            const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (!match) return null;
            return [Number(match[1]), Number(match[2]), Number(match[3])];
        };

        const luminance = ([red, green, blue]: number[]) => {
            const values = [red, green, blue].map((channel) => {
                const normalized = channel / 255;
                return normalized <= 0.03928
                    ? normalized / 12.92
                    : Math.pow((normalized + 0.055) / 1.055, 2.4);
            });

            return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
        };

        const contrastRatio = (foreground: number[], background: number[]) => {
            const foregroundLum = luminance(foreground);
            const backgroundLum = luminance(background);
            const lighter = Math.max(foregroundLum, backgroundLum);
            const darker = Math.min(foregroundLum, backgroundLum);

            return (lighter + 0.05) / (darker + 0.05);
        };

        const pageBackground = parseRgb(getComputedStyle(document.body).backgroundColor);

        return Array.from(document.querySelectorAll('[data-testid="app-showcase-hero"] .word')).map(
            (word) => {
                const styles = getComputedStyle(word);
                const foreground = parseRgb(styles.webkitTextFillColor || styles.color);

                return {
                    text: word.textContent,
                    color: styles.color,
                    webkitTextFillColor: styles.webkitTextFillColor,
                    backgroundColor: styles.backgroundColor,
                    contrast: foreground && pageBackground ? contrastRatio(foreground, pageBackground) : 0
                };
            }
        );
    });

    expect(contrastData.length).toBeGreaterThan(0);
    for (const word of contrastData) {
        expect(word.backgroundColor).toBe('rgba(0, 0, 0, 0)');
        expect(word.contrast).toBeGreaterThanOrEqual(4.5);
    }
});

test('mobile first fold shows the flagship scene without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const flagship = page.locator('[data-testid="flagship-frendlyst-scene"]');
    const phoneFrame = flagship.locator('.phone-frame');

    await expect(flagship).toBeVisible();
    await expect(phoneFrame).toBeVisible();

    const box = await phoneFrame.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.y ?? 999).toBeLessThan(844);

    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasHorizontalOverflow).toBe(false);
});

test('home page keeps the member section below the app showcase', async ({ page }) => {
    await page.goto('/');

    const teamSection = page.locator('[data-testid="home-team-section"]');

    await expect(teamSection).toBeVisible();
    await expect(teamSection.getByRole('heading', { name: 'Meet the Team' })).toBeVisible();
    await expect(teamSection.getByRole('heading', { name: 'NekoCode' })).toBeVisible();
    await expect(teamSection.getByRole('heading', { name: 'DaniCat' })).toBeVisible();
});

test('home team hash lands on the member cards', async ({ page }) => {
    await page.goto('/#team');

    const teamSection = page.locator('#team[data-testid="home-team-section"]');
    await expect(teamSection.getByRole('heading', { name: 'Meet the Team' })).toBeVisible();

    await page.waitForFunction(() => {
        const section = document.querySelector('#team[data-testid="home-team-section"]');
        if (!section) return false;
        const top = Math.round(section.getBoundingClientRect().top);
        return top >= 0 && top <= 260;
    }, null, { timeout: 7000 });

    const sectionTop = await teamSection.evaluate((section) => Math.round(section.getBoundingClientRect().top));
    expect(sectionTop).toBeGreaterThanOrEqual(0);
    expect(sectionTop).toBeLessThanOrEqual(260);
});

test('home team character cards keep the old design without excessive blank space', async ({ page }) => {
    await page.goto('/');

    const teamSection = page.locator('[data-testid="home-team-section"]');
    await teamSection.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
        Array.from(document.querySelectorAll('[data-testid="home-team-section"] .team-card img')).every(
            (image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
        )
    );

    const cardMetrics = await teamSection.locator('.team-card').evaluateAll((cards) =>
        cards.map((card) => {
            const cardRect = card.getBoundingClientRect();
            const bioRect = card.querySelector('.bio')?.getBoundingClientRect();
            const image = card.querySelector('img');

            return {
                name: card.querySelector('.name')?.textContent?.trim(),
                cardHeight: Math.round(cardRect.height),
                blankAfterBio: bioRect ? Math.round(cardRect.bottom - bioRect.bottom) : null,
                imageLoaded: Boolean(image?.complete && image.naturalWidth > 0)
            };
        })
    );

    expect(cardMetrics).toHaveLength(2);

    const cardHeights = cardMetrics.map((card) => card.cardHeight);
    expect(Math.max(...cardHeights) - Math.min(...cardHeights)).toBeLessThanOrEqual(4);

    for (const card of cardMetrics) {
        expect(card.imageLoaded).toBe(true);
        expect(card.cardHeight).toBeLessThanOrEqual(400);
        expect(card.blankAfterBio).not.toBeNull();
        expect(card.blankAfterBio ?? 999).toBeLessThanOrEqual(110);
    }
});

test('team cards do not show X social buttons', async ({ page }) => {
    await page.goto('/');

    const homeTeamSection = page.locator('[data-testid="home-team-section"]');
    await expect(homeTeamSection.getByRole('link', { name: 'X / Twitter' })).toHaveCount(0);

    await page.goto('/team');
    await expect(page.locator('.team-grid').getByRole('link', { name: 'X / Twitter' })).toHaveCount(0);
});

test('contact form navigation', async ({ page }) => {
    await page.goto('/');

    // Find a link to contact page (assuming there is one, or we check the contact page directly)
    // If no direct link, we just check the contact page availability
    await page.goto('/contact');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('form')).toBeVisible();
});
