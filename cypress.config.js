const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            var list = fs.readdirSync(filename)
            return list
          }
          return null
        },
      })
    },
    experimentalStudio: true,
    video: true
  },
});
