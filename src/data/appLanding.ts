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
  frendlyst: {
    slug: 'frendlyst',
    name: 'FrendLyst',
    metaTitle: 'FrendLyst Social Discovery Game App',
    metaDescription:
      'Download FrendLyst on Android and iOS. Build profile worth, join clubs, send gifts, and discover friends through a playful social economy.',
    heroHeadline: 'Discover people through a social game loop',
    heroDescription:
      'FrendLyst turns profiles, gifts, clubs, rankings, and safety controls into one mobile social discovery experience.',
    icon: basePath('frendlyst/icon.png'),
    heroImage: basePath('frendlyst/cover.png'),
    heroImageAlt: 'FrendLyst social discovery app artwork',
    category: 'Social discovery game',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Android, iOS',
    availability: 'Live on Android and iOS',
    downloadDescription:
      'FrendLyst is live on Android and iOS. Download it from the official Google Play and App Store listings.',
    downloadNote: 'Social discovery, profile worth, gifts, clubs, leaderboards, and safety systems.',
    storeLinks: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.nekocode.frendlyst'
      },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/us/app/frendlyst-social-game/id6763485928'
      }
    ],
    platformNotes: ['Android', 'iOS', 'No web app listing'],
    stats: [
      { title: 'Live', description: 'mobile app' },
      { title: 'Clubs', description: 'community layer' },
      { title: 'Gifts', description: 'social economy' },
      { title: 'Safety', description: 'moderation controls' }
    ],
    workflow: [
      {
        title: 'Build a profile',
        description: 'Set up your presence, grow profile worth, and make activity visible.'
      },
      {
        title: 'Discover and support',
        description: 'Find people through rankings, spotlight lists, gifts, and social momentum.'
      },
      {
        title: 'Join clubs',
        description: 'Create communities with chat, shared vaults, member tools, and leaderboards.'
      }
    ],
    features: [
      {
        title: 'Profile worth',
        description: 'A visible score shaped by profile activity, streaks, support, and attention.'
      },
      {
        title: 'Friend market',
        description: 'Discovery lists and rankings make social growth easier to scan and act on.'
      },
      {
        title: 'Gifts and wallet',
        description: 'Send gifts, collect coins, and make support visible inside the product loop.'
      },
      {
        title: 'Trust controls',
        description: 'Verification, reporting, blocking, moderation, and account status tools.'
      }
    ],
    faqs: [
      {
        title: 'Is FrendLyst live?',
        description: 'Yes. FrendLyst is available through the official Android and iOS store listings.'
      },
      {
        title: 'Does FrendLyst have a web version?',
        description: 'No public web app is listed here. The download path is Android and iOS.'
      },
      {
        title: 'Where can I get support?',
        description: 'Use the FrendLyst support page for help, account questions, and account deletion requests.'
      }
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/apps/frendlyst/privacy' },
      { label: 'Terms', href: '/apps/frendlyst/terms' },
      { label: 'Support', href: '/apps/frendlyst/support' }
    ],
    theme: {
      accent: '#7C5CFF',
      accentRgb: '124, 92, 255',
      accentContrast: '#FFFFFF',
      glow: '#ED6A5D'
    }
  },
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
  },
  'system-fitness': {
    slug: 'system-fitness',
    name: 'SYSTEM Fitness',
    metaTitle: 'SYSTEM Fitness Quest Workout Tracker App',
    metaDescription:
      'Explore SYSTEM Fitness, a coming-soon gamified workout tracker with daily quests, pose verification, class progression, and real strength routines.',
    heroHeadline: 'Turn workouts into daily quests with real verification',
    heroDescription:
      'SYSTEM Fitness is a coming-soon mobile fitness app that uses gamified contracts, classes, challenges, and pose-aware workout verification.',
    icon: basePath('system/cover.png'),
    heroImage: basePath('system/cover.png'),
    heroImageAlt: 'SYSTEM Fitness gamified workout tracker artwork',
    category: 'Gamified fitness tracker',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android, iOS',
    availability: 'Coming soon for Android and iOS',
    downloadDescription:
      'SYSTEM Fitness is coming soon. Store links will be added when the app is ready for public download.',
    downloadNote: 'Daily quests, verified reps, classes, gates, bosses, and progression systems.',
    storeLinks: [],
    platformNotes: ['Android planned', 'iOS planned', 'In development'],
    stats: [
      { title: 'Quests', description: 'daily contracts' },
      { title: 'ML Kit', description: 'pose checks' },
      { title: 'Classes', description: 'training paths' },
      { title: 'Bosses', description: 'weekly challenges' }
    ],
    workflow: [
      {
        title: 'Accept a quest',
        description: 'Start from daily workout contracts built around strength, movement, and consistency.'
      },
      {
        title: 'Verify the reps',
        description: 'Pose-aware tracking helps connect the game loop to real workout completion.'
      },
      {
        title: 'Level the character',
        description: 'Classes, gates, bosses, and progression make effort visible over time.'
      }
    ],
    features: [
      {
        title: 'Daily contracts',
        description: 'Workout quests create a clear next action instead of a loose routine list.'
      },
      {
        title: 'Pose verification',
        description: 'ML-powered movement checks support real-world effort and rep counting.'
      },
      {
        title: 'Class paths',
        description: 'Fighter, Strider, and Shadow-style paths shape workout identity.'
      },
      {
        title: 'Challenge loop',
        description: 'Gates, bosses, rewards, and penalties add structure to weekly consistency.'
      }
    ],
    faqs: [
      {
        title: 'Is SYSTEM Fitness live?',
        description: 'No. SYSTEM Fitness is currently marked as coming soon.'
      },
      {
        title: 'What platforms are planned?',
        description: 'The planned public app targets Android and iOS.'
      },
      {
        title: 'What makes it different from a normal workout tracker?',
        description: 'The product is built around quests, classes, verified reps, and progression rather than passive logging.'
      }
    ],
    legalLinks: [],
    theme: {
      accent: '#5FB6FF',
      accentRgb: '95, 182, 255',
      accentContrast: '#06111B',
      glow: '#5FB6FF'
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
