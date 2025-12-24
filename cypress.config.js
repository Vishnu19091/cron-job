const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    downloadsFolder: false,
    screenshotsFolder: false,
    setupNodeEvents(on, config) {},
  },
});
