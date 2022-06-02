/** @type {import('next').NextConfig} */
// const StylelintPlugin = require("stylelint-webpack-plugin");

const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/assets/styles'],
    prependData: `@import "_mixins.sass";`,
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
