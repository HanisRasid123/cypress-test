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
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })