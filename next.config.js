/** @type {import('next').NextConfig} */
// const StylelintPlugin = require("stylelint-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['src/styles'],
    prependData: `@import "_mixins.sass"; @import "variables.scss";`,
  },
  env: {
    CMS_URL: process.env.API_CRM_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(ts)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    });
    // config.plugins.push(new StylelintPlugin());
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: `${
          process.env.NODE_ENV === 'development'
            ? 'https://cms.lottery.stage.plat.agency'
            : 'API_CRM_URL'
        }/sitemap/index.xml`,
      },
    ];
  },
};

module.exports = nextConfig;
