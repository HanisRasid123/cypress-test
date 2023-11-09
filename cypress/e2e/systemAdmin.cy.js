import data from '../fixtures/example.json'

beforeEach(()=> {
  cy.login(data.sysAdminEmail, data.sysAdminPassword)
})

describe('System Admin', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('OrganisationTest', function() {
    /* ==== Generated with Cypress Studio ==== */
    //navigate to organisation
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Organisation"]').click();
    cy.get('.menu-toggle > .fa').click();
    
    //assert
    cy.url().should('include','/organisation')

    //click create organisation
    cy.get('.create-button-margin').click();
    cy.url().should('include','/organisation/create')

    //input form data and submit
    cy.get('#txt_org_name').type(data.orgName,{force: true});
    cy.get('#txt_contact_title').type(data.jobTitle);
    cy.get('#txt_contact_name').type(data.name);
    cy.get('#txt_contact_number').type(data.phoneNo);
    cy.get('#txt_contact_email').type(data.contactEmail);
    cy.get('.save-section > :nth-child(2) > .column > :nth-child(1)').click();
    cy.url().should('eq',data.host + '/organisation')

    //search for new organisation
    cy.get('#txt_search').type(data.orgName);

    //assert new org in list
    cy.contains(data.orgName).should('be.visible');

    //click edit button
    cy.get('[title="Edit Organisation"] > .fa').click();
    cy.get('.textarea').type(data.note)
    cy.get('.update-section > .column > :nth-child(1)').click();
    cy.get('#btn_create').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it.only('userList', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate to user list
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Settings"]').click();
    cy.get('[data-name="Settings"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(1)').click();
    cy.url().should('include','/system-admin/user/user-list');

    //click create user
    cy.get('.create-button-margin').click({force: true});
    cy.get('form > .modal-card-body').should('not.be.hidden');

    //fill out form and submit
    cy.get(':nth-child(1) > :nth-child(1) > .control > .input').type(data.userFName);
    cy.get(':nth-child(1) > :nth-child(2) > .control > .input').type(data.userLName);
    cy.get(':nth-child(3) > :nth-child(1) > .control > .input').type(data.userEmail);
    cy.get(':nth-child(2) > .control > .select > select').select('1');
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.modal-card-foot').should('be.hidden');

    //search and select
    cy.get(".input[placeholder='Search']").type(data.userFName + " " + data.userLName, {force:true});
    cy.contains(data.userEmail).should('be.visible');
    cy.get(".input[placeholder='Search']").clear();
    cy.get(".input[placeholder='Search']").type(data.userEmail, {force:true});
    cy.contains(data.userEmail).should('be.visible');
    cy.get('tbody > tr > .has-text-centered > .custom-checkbox > .checkmark').click();

    //edit user
    cy.get('[data-label="Edit User"] > .button').click();
    cy.get(':nth-child(5) > :nth-child(1) > .control > .select > select').select('33');
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.modal-card-foot').should('be.hidden');

    //reset password
    cy.get('[data-label="Reset Password"] > .button > .fas').click();
    cy.get('.reset-admin-modal > .modal > .modal-card > .modal-card-foot > .button').click();
    cy.get('.reset-admin-modal').should('be.hidden');

    //activate user
    cy.get('.button > .fa').click();
    cy.get('.activate-deactivate-modal > .modal > .modal-card > .modal-card-foot > .button').click();
    cy.get('.activate-deactivate-modal').should('be.hidden');
    /* ==== End Cypress Studio ==== */
  });
})