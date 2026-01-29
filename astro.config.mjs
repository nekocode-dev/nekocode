import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://nekocode.dev',
    // base: '/nekocode/', // Removed for custom domain
    output: 'static',

    // Prefetch links on hover for instant navigation
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover'
    },

    integrations: [
        mdx(),
        sitemap()
    ],
    markdown: {
        shikiConfig: {
            theme: 'github-dark'
        }
    },
    vite: {
        css: {
            modules: {
                localsConvention: 'camelCase'
            }
        }
    }
});
