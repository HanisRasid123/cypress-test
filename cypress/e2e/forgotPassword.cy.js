import data from '../fixtures/example.json'

describe('Forgot password', ()=>{
  it.skip('forgot-password', function() {
    cy.intercept(data.host).as('landing')
    cy.visit(data.host);
    cy.get('a').click()
    cy.url().should('include', '/forgot-password').then(()=>{
      cy.get("input[type='email']").as('email-field').should('be.visible');
    })
    cy.get('@email-field').type(data.sysAdminEmail).then(()=>{
      //assert
      cy.get('@email-field').should('have.value', data.sysAdminEmail)
    })
    
    cy.get('.create-button').click();
    cy.get('.alert-link').click();
    cy.url().should('include','/landing');
  });
})