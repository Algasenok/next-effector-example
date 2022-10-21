/** @type {import('next').NextConfig} */
// const StylelintPlugin = require("stylelint-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
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
};

module.exports = nextConfig;
