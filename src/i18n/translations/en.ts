import type { TranslationKeys } from './ko';

export const en: TranslationKeys = {
  // Site metadata
  site: {
    title: 'Juwoong',
    description: 'Jot down some thoughts and share them with the world.',
  },

  // Tag labels
  tags: {
    personal: 'Personal Thoughts',
    idea: 'Ideas',
    project: 'Projects',
    develop: 'Development',
    growth: 'Growth',
    gpt: 'GPT',
    retrospective: 'Retrospective',
  } as Record<string, string>,

  // UI strings
  ui: {
    all: 'All',
    search: 'Search',
    searchPlaceholder: 'Search...',
    lastUpdatedOn: 'Last updated on',
    readInLanguage: '한국어로 읽기',
  },

  // Tag description patterns
  tagDescription: {
    single: 'Posts about {label}',
    double: 'Posts about {first} and {second}',
    multiple: 'Posts about {list}, and {last}',
  },

  // Footer
  footer: {
    copyright: '© {year} Juwoong Bae. All rights reserved.',
  },

  // About page
  about: {
    title: 'About Me',
    description: 'About page.',
  },
} as const;
