import data from '../fixtures/example.json'

describe('Forgot password', ()=>{
  it('forgot-password', function() {
    //redirect to forgot password page
    cy.visit(data.host);
    cy.get('a').forceClick()
    cy.url().should('include', '/forgot-password') //assert

    //input email
    cy.get("input[type='email']").as('email-field').type(data.sysAdminEmail);

    //assert
    cy.get('@email-field').should('have.value', data.sysAdminEmail)

    cy.get('.create-button').forceClick();
    cy.get('.alert-link').forceClick();
  });
})