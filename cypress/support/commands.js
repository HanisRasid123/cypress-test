// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import data from '../fixtures/example.json'
import moment from 'moment/moment';


Cypress.Commands.add('login', (email, password) => { 
  cy.visit(data.host);
  cy.get(':nth-child(4) > .control > .input').type(email);
  cy.get(':nth-child(5) > .control > .input').type(password);
  cy.get('.create-button').click();

  //assertions
  cy.url().should('include', '/system-admin/dashboard')
  cy.get('#pie-chart').should('be.visible')
  cy.get('#doughnut-chart').should('be.visible')
})

Cypress.Commands.add('download',(downloadPath, filePrefix, fileType) => {
    const now = new Date();
    var fileTs = 0;
    var files = [];
    var filename = "";
    if (filePrefix.includes("Fractionated_Product") || filePrefix.includes("Master_File")) {
      cy.task('readFileMaybe', downloadPath)
      .then(returnArray =>{
        files = returnArray.filter((i)=>{
          return i.includes(filePrefix)
        })
        filename = downloadPath + files[files.length - 1]
      })
      .then(()=>{
        return cy.readFile(filename)
      })
    }
    else {
      fileTs = moment(now).format("DDMMYYYY_HHmm")
      filename = downloadPath + filePrefix + fileTs + fileType;
      return cy.readFile(filename)
    }
  })
//
//
// -- This is a child command --
Cypress.Commands.add('colourCheck', { prevSubject: 'element'}, (subject, r, g, b) => {
  cy.wrap(subject).should('have.css','border-color','rgb(' + r + ', ' + g + ', ' + b + ')');
})
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })