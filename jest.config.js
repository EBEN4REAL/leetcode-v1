const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "react-firebase-hooks/auth":
      "<rootDir>/src/__mocks__/react-firebase-hooks/auth.ts",
  },
};

module.exports = async () => ({
  /**
   * Using ...(await createJestConfig(customJestConfig)()) to override transformIgnorePatterns
   * provided byt next/jest.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
   */
  ...(await createJestConfig(customJestConfig)()),
  /**
   * Swiper uses ECMAScript Modules (ESM) and Jest provides some experimental support for it
   * but "node_modules" are not transpiled by next/jest yet.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
   * @link https://jestjs.io/docs/ecmascript-modules
   */
   transformIgnorePatterns: [
    "/node_modules/(?![swiper/react/swiper.js])", // verify and replace here the path what are causing issue to you
    "/node_modules/(?![swiper/react/swiper-react.js])", // verify and replace here the path what are causing issue to you
    "/node_modules/(?![swiper/react/swiper-slide.js])" // verify and replace here the path what are causing issue to you
],
});

// const nextJest = require('next/jest');

// const createJestConfig = nextJest({
//   dir: './',
// });

// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   moduleDirectories: ['node_modules', '<rootDir>/'],
//   testEnvironment: 'jest-environment-jsdom',
//   "transform": {
//     "\\.[jt]sx?$": "babel-jest",
//     "\\.css$": "some-css-transformer",
//   }
// };

// module.exports = async () => ({
//   /**
//    * Using ...(await createJestConfig(customJestConfig)()) to override transformIgnorePatterns
//    * provided byt next/jest.
//    *
//    * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
//    */
//   ...(await createJestConfig(customJestConfig)()),
//   /**
//    * Swiper uses ECMAScript Modules (ESM) and Jest provides some experimental support for it
//    * but "node_modules" are not transpiled by next/jest yet.
//    *
//    * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
//    * @link https://jestjs.io/docs/ecmascript-modules
//    */
// transformIgnorePatterns: [
//   'node_modules/(?!(swiper|ssr-window|dom7)/)',
// ],

// })
