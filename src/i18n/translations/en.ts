import type { TranslationKeys } from "./ko";

export const en: TranslationKeys = {
  // Site metadata
  site: {
    title: "Juwoong",
    description: "Jot down some thoughts and share them with the world.",
  },

  // Tag labels
  tags: {
    personal: "Personal Thoughts",
    idea: "Ideas",
    project: "Projects",
    develop: "Development",
    growth: "Growth",
    gpt: "GPT",
    retrospective: "Retrospective",
    translation: "Translation",
  } as Record<string, string>,

  // UI strings
  ui: {
    all: "All",
    search: "Search",
    searchPlaceholder: "Search...",
    lastUpdatedOn: "Last updated on",
    readInLanguage: "한국어로 읽기",
    originalArticle: "Original article",
    translationDisclaimerTitle: "Translation note",
    translationDisclaimer:
      "This post is a translation of the original article. Some wording or nuance may differ from the original.",
    translationDisclaimerSource:
      "Please refer to the original article for important details.",
    views: "views",
    series: "Series",
    seriesDescription: "Explore posts collected into ongoing series.",
    seriesEmpty: "No published series yet.",
    seriesPart: "Part {order}",
  },

  // Tag description patterns
  tagDescription: {
    single: "Posts about {label}",
    double: "Posts about {first} and {second}",
    multiple: "Posts about {list}, and {last}",
  },

  // Footer
  footer: {
    copyright: "© {year} Juwoong Bae. All rights reserved.",
  },

  // About page
  about: {
    title: "About Me",
    description: "About page.",
  },
} as const;
