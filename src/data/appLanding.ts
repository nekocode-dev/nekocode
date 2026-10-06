export type StoreLink = {
  label: 'Google Play' | 'App Store';
  href: string;
};

export type AppLink = {
  label: string;
  href: string;
};

export type LandingItem = {
  title: string;
  description: string;
};

export type AppLandingConfig = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroDescription: string;
  icon: string;
  heroImage: string;
  heroImageAlt: string;
  category: string;
  applicationCategory: string;
  operatingSystem: string;
  availability: string;
  downloadDescription: string;
  downloadNote: string;
  storeLinks: StoreLink[];
  platformNotes: string[];
  stats: LandingItem[];
  workflow: LandingItem[];
  features: LandingItem[];
  faqs: LandingItem[];
  legalLinks: AppLink[];
  theme: {
    accent: string;
    accentRgb: string;
    accentContrast: string;
    glow: string;
  };
};

const basePath = (path: string) => `/assets/projects/${path}`;

export const appLandingPages = {
  beanbop: {
    slug: 'beanbop',
    name: 'BeanBop',
    metaTitle: 'BeanBop Smart Caffeine Tracker App',
    metaDescription:
      'Download BeanBop on Android and iOS. Track caffeine, hydration, Sleep Shield timing, and private local-first daily drink logs.',
    heroHeadline: 'Track caffeine without making wellness feel heavy',
    heroDescription:
      'BeanBop is a local-first caffeine tracker for fast drink logging, sleep-aware guidance, hydration context, and private daily routines.',
    icon: basePath('beanbop/logo.webp'),
    heroImage: basePath('beanbop/cover.webp'),
    heroImageAlt: 'BeanBop caffeine tracker app artwork',
    category: 'Caffeine tracker',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android, iOS',
    availability: 'Live on Android and iOS',
    downloadDescription:
      'BeanBop is live on Android and iOS. Download it from the official Google Play and App Store listings.',
    downloadNote: 'Local-first, privacy-first, no required account, and built for quick daily logging.',
    storeLinks: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.nekocode.beanbop'
      },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/ph/app/beanbop-caffeine-tracker/id6760345252'
      }
    ],
    platformNotes: ['Android', 'iOS', 'Private local data'],
    stats: [
      { title: 'Offline', description: 'first storage' },
      { title: '4', description: 'caffeine zones' },
      { title: 'Private', description: 'by default' },
      { title: 'Fast', description: 'drink logging' }
    ],
    workflow: [
      {
        title: 'Log the drink',
        description: 'Add coffee, tea, soda, energy drinks, or water in a few taps.'
      },
      {
        title: 'Read your zone',
        description: 'See where your caffeine level sits across the day without a complex dashboard.'
      },
      {
        title: 'Protect bedtime',
        description: 'Use Sleep Shield guidance to understand estimated caffeine before rest.'
      }
    ],
    features: [
      {
        title: 'Fast drink logging',
        description: 'Common drinks and daily routines are optimized for repeated use.'
      },
      {
        title: 'Sleep Shield',
        description: 'Sleep-aware caffeine estimates help users avoid late-day surprises.'
      },
      {
        title: 'Hydration context',
        description: 'Water logging sits beside caffeine so the daily picture is more useful.'
      },
      {
        title: 'Local-first data',
        description: 'Logs and preferences stay on-device by default with import and export support.'
      }
    ],
    faqs: [
      {
        title: 'Is BeanBop live?',
        description: 'Yes. BeanBop is available through the official Android and iOS store listings.'
      },
      {
        title: 'Does BeanBop require an account?',
        description: 'No account is required for the core local-first tracking flow.'
      },
      {
        title: 'What does BeanBop track?',
        description: 'BeanBop tracks caffeine, drink history, hydration, zones, and sleep-aware caffeine signals.'
      }
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/apps/beanbop/privacy' },
      { label: 'Terms', href: '/apps/beanbop/terms' }
    ],
    theme: {
      accent: '#E4A76B',
      accentRgb: '228, 167, 107',
      accentContrast: '#1B120B',
      glow: '#8A4D2C'
    }
  },
  flipfocus: {
    slug: 'flipfocus',
    name: 'FlipFocus',
    metaTitle: 'FlipFocus FSRS Flashcards and Study Games',
    metaDescription:
      'Download FlipFocus on Google Play. Study with FSRS-5 spaced repetition, offline flashcards, study games, OCR scanning, and local-first learning data.',
    heroHeadline: 'Study smarter with offline flashcards and games',
    heroDescription:
      'FlipFocus combines FSRS-5 scheduling, study games, OCR, imports, and local-first privacy for focused learning on mobile.',
    icon: basePath('flipfocus/icon.png'),
    heroImage: basePath('flipfocus/cover.png'),
    heroImageAlt: 'FlipFocus smart flashcard app artwork',
    category: 'Study and flashcards',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Android',
    availability: 'Live on Android. iOS coming soon.',
    downloadDescription:
      'FlipFocus is live on Google Play. iOS is marked as coming soon while the Android app is available now.',
    downloadNote: 'Free, ad-supported, offline ready, and no account required for core study flows.',
    storeLinks: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.nekocode.flipfocus'
      }
    ],
    platformNotes: ['Android', 'iOS coming soon', 'Offline study'],
    stats: [
      { title: '7+', description: 'game modes' },
      { title: 'FSRS-5', description: 'algorithm' },
      { title: 'Offline', description: 'ready' },
      { title: '3', description: 'card types' }
    ],
    workflow: [
      {
        title: 'Create or import decks',
        description: 'Bring cards from Anki, Quizlet, CSV, OCR scans, or manual creation.'
      },
      {
        title: 'Study with timing',
        description: 'FSRS-5 schedules reviews around memory patterns instead of fixed repetition.'
      },
      {
        title: 'Practice through games',
        description: 'Modes like typing, matching, speed rounds, and streak challenges keep sessions active.'
      }
    ],
    features: [
      {
        title: 'FSRS-5 scheduling',
        description: 'Adaptive spaced repetition keeps review timing aligned with retention.'
      },
      {
        title: 'Offline-first library',
        description: 'Core study content works without an account or constant internet connection.'
      },
      {
        title: 'OCR scanning',
        description: 'Turn printed or photographed text into study material faster.'
      },
      {
        title: 'WiFi Direct sharing',
        description: 'Share flashcards with nearby devices without cloud upload.'
      }
    ],
    faqs: [
      {
        title: 'Is FlipFocus live?',
        description: 'FlipFocus is live on Google Play. The iOS listing is not linked yet.'
      },
      {
        title: 'Can FlipFocus work offline?',
        description: 'Yes. Core deck, review, and study flows are designed for offline use.'
      },
      {
        title: 'What can I import?',
        description: 'FlipFocus supports workflows for Anki, Quizlet, CSV, and OCR-assisted card creation.'
      }
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/apps/flipfocus/privacy' },
      { label: 'Terms', href: '/apps/flipfocus/terms' },
      { label: 'Report Bug', href: '/apps/flipfocus/report-bug' },
      { label: 'Pricing', href: '/apps/flipfocus/pricing' }
    ],
    theme: {
      accent: '#F5E6D3',
      accentRgb: '245, 230, 211',
      accentContrast: '#171717',
      glow: '#6495ED'
    }
  }
} satisfies Record<string, AppLandingConfig>;

export function appStructuredData(app: AppLandingConfig, pageUrl: string, siteUrl: string) {
  const faqId = `${pageUrl}#faq`;
  const appId = `${pageUrl}#app`;
  const webpageId = `${pageUrl}#webpage`;
  const storeUrls = app.storeLinks.map((link) => link.href);
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'MobileApplication'],
    '@id': appId,
    name: app.name,
    url: pageUrl,
    image: `${siteUrl}${app.heroImage.slice(1)}`,
    screenshot: `${siteUrl}${app.heroImage.slice(1)}`,
    description: app.metaDescription,
    applicationCategory: app.applicationCategory,
    applicationSubCategory: app.category,
    operatingSystem: app.operatingSystem,
    featureList: app.features.map((feature) => feature.title),
    keywords: [
      app.name,
      app.category,
      app.applicationCategory,
      ...app.features.map((feature) => feature.title)
    ],
    mainEntityOfPage: {
      '@id': webpageId
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    publisher: {
      '@id': `${siteUrl}#organization`
    },
    ...(storeUrls.length > 0
      ? {
          sameAs: storeUrls,
          installUrl: storeUrls
        }
      : {})
  };

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Apps',
          item: `${siteUrl}apps/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: app.name,
          item: pageUrl
        }
      ]
    },
    {
      ...appSchema
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': faqId,
      mainEntity: app.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.description
        }
      }))
    }
  ];
}
