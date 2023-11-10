import moment from 'moment/moment';
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
  it('userList', function() {
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
    cy.get('.status.active').colourCheck(23,190,187); //status colour
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('userRolePermissions', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate to userRolePermissions
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Settings"]').click();
    cy.get('[data-name="Settings"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(2)').click();
    cy.url().should('include','/system-admin/user/user-role-permissions');

    //create user role
    cy.get('.create-button-margin').click({force:true});
    cy.get('.input').type(data.userRole);
    cy.get('select').select('1');
    cy.get(':nth-child(2) > .panel > .panel-block > .field > .control > .select > select').select('1');
    cy.get(':nth-child(1) > .field > .control > .select > select').select('1');
    cy.get('.is-1 > .create-button').click();
    cy.get(':nth-child(6) > .column > :nth-child(2)').click();

    //search user role and select
    cy.get('.input').type(data.userRole);
    cy.contains(data.userRole).should('be.visible');
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();
    
    //edit user role
    cy.get('[data-label="Edit User Role"] > .button > .fa').click();
    cy.url().should('include', '/system-admin/user/user-role-process')
    cy.get(':nth-child(1) > .panel > .panel-block > .field > .control > .select > select').select('2');
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get(':nth-child(2) > .panel > .panel-block > .field > .control > .select > select').select('1');
    cy.get(':nth-child(1) > .field > .control > .select > select').select('12');
    cy.get('.is-1 > .create-button').click({force:true});
    cy.get(':nth-child(6) > .column > :nth-child(2)').click();
    cy.url().should('include','/system-admin/user/user-role-permissions')

    //search user role and select
    cy.get('.input').type(data.userRole);
    cy.contains(data.userRole).should('be.visible');
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();

    //deactivate user
    cy.get('.activate-deactivate-admin > .control > .select > select').select('0');
    cy.get('.with-form > .buttons > .is-dark > .button').click();
    cy.get('.modal-card-foot > :nth-child(2)').click()
    cy.get('.status.deactive').colourCheck(243, 146, 55);
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('userGroups', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Settings"]').click();
    cy.get('[data-name="Settings"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(3)').click();
    cy.url().should('include','/system-admin/user/user-groups');

    //create user group
    cy.get('.create-button').click({force:true});
    cy.url().should('include','/system-admin/user/user-group-process');
    cy.get('.input').type(data.userGroups, {force:true});
    cy.get('#checkAll').check({force: true});
    cy.get('.has-text-center > .create-button').click();
    cy.get('.has-text-right > :nth-child(2)').click();
    cy.url().should('include','/system-admin/user/user-groups');


    //search 
    cy.get('.input').type(data.userGroups, {force:true});
    // cy.get('.has-text-right > :nth-child(2)').click();
    // cy.get('.input').type(data.userGroups, {force: true});
    cy.get('tbody > tr > :nth-child(1) > .custom-checkbox > .checkmark').click({force: true});

    //edit
    cy.get('[data-label="Edit User Group"] > .button > .fa').click();
    cy.get(':nth-child(9) > [width="45"] > .custom-checkbox > .checkmark').click();
    cy.get(':nth-child(4) > .has-text-center > .create-button').click();
    cy.get('.has-text-right > :nth-child(2)').click();
    cy.url().should('include', '/system-admin/user/user-groups')

    //search
    cy.get('.input').type(data.userGroups, {force: true});
    cy.contains(data.userGroups).should('be.visible');
    cy.get('tbody > tr > :nth-child(1) > .custom-checkbox > .checkmark').click();

    //deactivate
    cy.get('.activate-deactivate-admin > .control > .select > select').select('0');
    cy.get('.with-form > .buttons > .is-dark > .button').click();
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.status.deactive').colourCheck(243, 146, 55);
    /* ==== End Cypress Studio ==== */
  });


  /* ==== Test Created with Cypress Studio ==== */
  it('locationGroups', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Settings"]').click();
    cy.get('[data-name="Settings"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(5)').click();
    cy.url().should('include','/system-admin/user/location-groups')

    //create location group
    cy.get('.create-button').click();
    cy.url().should('include','/system-admin/user/location-group-process')
    cy.get('.input').type('TestLocationGroup');
    cy.get('select').select('1');
    cy.get(':nth-child(2) > .field > .control > .select > select').select('1');
    cy.get('.panel-block > .columns > .has-text-right > .create-button').click();
    cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    cy.url().should('include','/system-admin/user/location-groups')

    //search 
    cy.get('.input').type('TestLocationGroup');
    cy.contains(data.locationGroup)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();

    //edit
    cy.get('[data-label="Edit Location Group"] > .button > .fa').click();
    cy.url().should('include', '/system-admin/user/location-group-process')
    cy.get(':nth-child(2) > .field > .control > .select > select').select('2');
    cy.get('.panel-block > .columns > .has-text-right > .create-button').click();
    cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    cy.url().should('include','/system-admin/user/location-groups')

    //search
    cy.get('.input').type('TestLocationGroup');
    cy.contains(data.locationGroup)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();

    //deactivate
    cy.get('.activate-deactivate-admin > .control > .select > select').select('0');
    cy.get('.with-form > .buttons > .is-dark > .button > .fa').click();
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.status.deactive').colourCheck(243, 146, 55);
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it.only('deviceRegistrationRecord', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Devices"]').click();
    cy.get('[data-name="Devices Registration Record"]').click();
    cy.get('.menu-toggle > .fa').click();

    //filter by org and location
    cy.contains('Organisations').siblings().children().children().as('orgSelect');
    cy.get('@orgSelect').select('8',{force:true});
    cy.contains('Locations').siblings().children().children().as('locSelect');
    cy.get('@locSelect').select('38',{force:true});

    //assert data is not empty and date validation for registration
    let rowData = [];
    let count = 0;
    cy.get('td').each(item =>{
      cy.get(item).should('not.be.empty')
      rowData.push(item.text());
      count++
    })
    .then(() => {
      let check = moment(rowData[7], "DD/MM/YYYY HH:mm:ss", true).isValid();
      cy.wrap(check).should('eq', true)
    })

    /* ==== End Cypress Studio ==== */
  });
})