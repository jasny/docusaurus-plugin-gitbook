// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';
import { remarkGitBook, rehypeGitBook } from 'docusaurus-plugin-gitbook';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GitBook Plugin Example',
  tagline: 'Demonstrating GitBook syntax in Docusaurus',
  favicon: 'img/favicon.ico',

  url: 'https://example.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'md',
    preprocessor: ({ filePath, fileContent }) => {
      // Temporarily escape GitBook syntax to prevent MDX from parsing it
      // The remark plugin will handle the actual transformation
      return fileContent;
    },
  },

  plugins: ['docusaurus-plugin-gitbook'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          beforeDefaultRemarkPlugins: [remarkGitBook],
          rehypePlugins: [rehypeGitBook],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'GitBook Plugin Demo',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
