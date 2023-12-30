// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "IEEE at UCLA Project Docs",
  tagline: "Hands-on Engineering",
  favicon: "img/logo_ieee.svg",

  // Set the production url of your site here
  url: "https://projects.ieeebruins.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/UCLA-IEEE/projects.ieeebruins.com/tree/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "IEEE at UCLA Project Docs",
        logo: {
          alt: "IEEE Logo",
          src: "img/logo_ieee.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://ieeebruins.com",
            label: "ieeebruins.com",
            position: "left",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "More of us!",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/RREtsea",
              },
              {
                label: "Instagram",
                href: "https://instagram.com/uclaieee",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} IEEE at UCLA. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.nightOwlLight,
        darkTheme: themes.nightOwl,
        additionalLanguages: ["verilog"],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),
};

module.exports = config;
