export const ko = {
  // Site metadata
  site: {
    title: "Juwoong",
    description: "생각을 적고 세상과 나눕니다.",
  },

  // Tag labels
  tags: {
    personal: "개인적인 생각",
    idea: "아이디어",
    project: "프로젝트",
    develop: "개발",
    growth: "성장",
    gpt: "GPT",
    retrospective: "회고",
    translation: "번역",
  } as Record<string, string>,

  // UI strings
  ui: {
    all: "전체",
    search: "검색",
    searchPlaceholder: "검색...",
    lastUpdatedOn: "최종 수정:",
    readInLanguage: "Read in English",
    originalArticle: "원본 글",
    translationDisclaimerTitle: "번역 안내",
    translationDisclaimer:
      "이 글은 원문을 번역한 글입니다. 오역이나 뉘앙스 차이가 있을 수 있습니다.",
    translationDisclaimerSource:
      "중요한 내용은 원본 글을 함께 확인해주세요.",
    views: "views",
    aside: "여담",
    series: "시리즈",
    seriesDescription: "주제별로 이어지는 글을 모아 읽어보세요.",
    seriesEmpty: "아직 공개된 시리즈가 없습니다.",
    seriesPart: "{order}편",
  },

  // Tag description patterns
  tagDescription: {
    single: "{label}에 관한 글",
    double: "{first} 그리고 {second}에 관한 글",
    multiple: "{list}, 그리고 {last}에 관한 글",
  },

  // Footer
  footer: {
    copyright: "© {year} Juwoong Bae. All rights reserved.",
  },

  // About page
  about: {
    title: "About Me",
    description: "소개 페이지입니다.",
  },
} as const;

export type TranslationKeys = typeof ko;
