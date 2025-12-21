import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://westcoastcode.com",
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@components/common/Button.astro",
        "@shortcodes/Accordion",
        "@shortcodes/Notice",
        "@shortcodes/Youtube",
        "@shortcodes/Tabs",
        "@shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      remarkMath,
    ],
    shikiConfig: {
      themes: {
        // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      },
    },
    extendDefaultPlugins: true,
  },
});
