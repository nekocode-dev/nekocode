import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

type Rewrite = {
    source: string;
    destination: string;
    has?: Array<{ type: string; value: string }>;
};

test('vercel config maps app subdomains to app pages', async () => {
    const config = JSON.parse(await readFile('vercel.json', 'utf8')) as { rewrites: Rewrite[] };

    const rewriteKeys = config.rewrites.map((rewrite) => ({
        host: rewrite.has?.find((condition) => condition.type === 'host')?.value,
        source: rewrite.source,
        destination: rewrite.destination
    }));

    expect(rewriteKeys).toEqual(
        expect.arrayContaining([
            {
                host: 'frendlyst.nekocode.dev',
                source: '/',
                destination: '/apps/frendlyst'
            },
            {
                host: 'frendlyst.nekocode.dev',
                source: '/privacy',
                destination: '/apps/frendlyst/privacy'
            },
            {
                host: 'beanbop.nekocode.dev',
                source: '/',
                destination: '/apps/beanbop'
            },
            {
                host: 'flipfocus.nekocode.dev',
                source: '/',
                destination: '/apps/flipfocus'
            },
            {
                host: 'system-fitness.nekocode.dev',
                source: '/',
                destination: '/apps/system-fitness'
            }
        ])
    );
});
