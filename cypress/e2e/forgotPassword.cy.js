import data from '../fixtures/example.json'

describe('Forgot password', ()=>{
  it('forgot-password', function() {
    cy.visit(Cypress.env('host'));
    cy.get("a[href='/forgot-password']").click()
    cy.url().should('include', '/forgot-password').then(()=>{
      cy.get("input[type='email']").as('email-field').should('be.visible');
    })
    cy.get('@email-field').type(data.sysAdminEmail).then(()=>{
      //assert
      cy.get('@email-field').should('have.value', data.sysAdminEmail)
    })
    
    cy.get('.create-button').click();
    cy.get('.alert-link').click();
  });
})