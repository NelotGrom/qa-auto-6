const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'bf6mo6',
  e2e: {
    //specPattern: "**/*.js",
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    video: false,    
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
