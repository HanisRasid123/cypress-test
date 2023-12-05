const { defineConfig } = require("cypress");
const nodemailer = require("nodemailer");
const { afterRunHook } = require("cypress-mochawesome-reporter/lib");
const config = require('./run')

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/results",
    charts: true,
    reportPageTitle: "Sanity Automation Testing",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    overwrite: true,
  },
  e2e: {
    retries: 1,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("after:run", async (results) => {
        await afterRunHook();
        await sendMail();
      });
      on("before:browser:launch", (browser, launchOptions)=>{
        
      })
    },
    experimentalStudio: true,
  },
});

function sendMail() {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      from: "automatedTest@controlpoint.healthrfid.com",
      host: "email-smtp.us-east-1.amazonaws.com",
      secure: true, // use SSL
      port: 465,
      transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
      auth: {
        user: config.user,
        pass: config.pass,
      },
      rateLimit: 1, // do not send more than 1 message in a second
    });

    const sendEmailData = {
      from: "automatedTest@controlpoint.healthrfid.com",
      to: config.to,
      subject: "Automated Sanity Report " + new Date().toDateString(),
      text: "This email includes a HTML report of the automated sanity test.",
      attachments: { path: "./cypress/results/index.html" },
    };

    transporter.sendMail(sendEmailData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
