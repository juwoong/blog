export const ko = {
  // Site metadata
  site: {
    title: 'Juwoong',
    description: '생각을 적고 세상과 나눕니다.',
  },

  // Tag labels
  tags: {
    personal: '개인적인 생각',
    idea: '아이디어',
    project: '프로젝트',
    develop: '개발',
    growth: '성장',
    gpt: 'GPT',
    retrospective: '회고',
  } as Record<string, string>,

  // UI strings
  ui: {
    all: '전체',
    search: '검색',
    searchPlaceholder: '검색...',
    lastUpdatedOn: '최종 수정:',
    readInLanguage: 'Read in English',
  },

  // Tag description patterns
  tagDescription: {
    single: '{label}에 관한 글',
    double: '{first} 그리고 {second}에 관한 글',
    multiple: '{list}, 그리고 {last}에 관한 글',
  },

  // Footer
  footer: {
    copyright: '© {year} Juwoong Bae. All rights reserved.',
  },

  // About page
  about: {
    title: 'About Me',
    description: '소개 페이지입니다.',
  },
} as const;

export type TranslationKeys = typeof ko;
