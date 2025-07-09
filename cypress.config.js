const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://letosilv.github.io/WS-ar-condicionado/",
    specPattern: "cypress/e2e/*.cy.js",
    supportFile: false
  }
});
