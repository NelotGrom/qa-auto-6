const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  projectId: 'bf6mo6',
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    video: false,    
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      const bundler = createBundler({
      plugins: [createEsbuildPlugin(config)],
      });
      
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);
      
      return config;
    },
  },
});
