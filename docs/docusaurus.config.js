// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';
import { remarkGitBook, rehypeGitBook } from 'docusaurus-plugin-gitbook';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'docusaurus-plugin-gitbook',
  tagline: 'Write on GitBook. Host anywhere.',
  favicon: 'img/favicon.ico',

  url: 'https://jasny.net',
  baseUrl: '/docusaurus-plugin-gitbook/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'md',
  },

  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  ],

  plugins: ['docusaurus-plugin-gitbook'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          beforeDefaultRemarkPlugins: [remarkGitBook],
          rehypePlugins: [rehypeGitBook],
        },
        blog: false,
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
        title: 'docusaurus-plugin-gitbook',
        items: [
          {
            href: 'https://github.com/jasny/docusaurus-plugin-gitbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Introduction', to: '/' },
              { label: 'Getting Started', to: '/getting-started' },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/jasny/docusaurus-plugin-gitbook',
              },
              {
                label: 'npm',
                href: 'https://www.npmjs.com/package/docusaurus-plugin-gitbook',
              },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} Arnold Daniels. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
