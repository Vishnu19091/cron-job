const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    downloadsFolder: "false",
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {},
  },
});
