// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.juwoong.me',
  integrations: [mdx(), sitemap()],

  markdown: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
	},

  adapter: netlify(),

  // i18n configuration
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,  // Korean at root: /
    },
  },
});