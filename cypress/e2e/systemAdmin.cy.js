import moment from 'moment/moment';
import data from '../fixtures/example.json'

beforeEach(()=> {
  cy.login(data.sysAdminEmail, data.sysAdminPassword)
})

describe('System Admin', () => {
  // /* ==== Test Created with Cypress Studio ==== */
  it('OrganisationTest', function() {
    /* ==== Generated with Cypress Studio ==== */
    //navigate to organisation
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Organisation"]').click();
    cy.get('.menu-toggle > .fa').click();
    
    //assert
    cy.url().should('include','/organisation')

    //click create organisation
    // cy.get('.create-button-margin').click();
    // cy.url().should('include','/organisation/create')

    //input form data and submit
    // cy.get('#txt_org_name').type(data.orgName,{force: true});
    // cy.get('#txt_contact_title').type(data.jobTitle);
    // cy.get('#txt_contact_name').type(data.name);
    // cy.get('#txt_contact_number').type(data.phoneNo);
    // cy.get('#txt_contact_email').type(data.contactEmail);
    // cy.get('.save-section > :nth-child(2) > .column > :nth-child(1)').click();
    // cy.url().should('eq',data.host + '/organisation')

    //search for new organisation
    cy.get('#txt_search').type(data.orgName);

    //assert only new org in list
    cy.get('tbody > tr').should('be.length', 1);

    //edit comment
    cy.get('[title="Edit Organisation"] > .fa').click();
    cy.get('.textarea').clear();
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
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(1)').click();
    cy.url().should('include','/system-admin/user/user-list');

    //click create user
    // cy.get('.create-button-margin').click({force: true});
    // cy.get('form > .modal-card-body').should('not.be.hidden');

    //fill out form and submit
    // cy.get(':nth-child(1) > :nth-child(1) > .control > .input').type(data.userFName);
    // cy.get(':nth-child(1) > :nth-child(2) > .control > .input').type(data.userLName);
    // cy.get(':nth-child(3) > :nth-child(1) > .control > .input').type(data.userEmail);
    // cy.get(':nth-child(2) > .control > .select > select').select('1');
    // cy.get('.modal-card-foot > :nth-child(2)').click();
    // cy.get('.modal-card-foot').should('be.hidden');

    //search and select
    cy.get(".input[placeholder='Search']").type(data.userFName + " " + data.userLName, {force:true});
    cy.contains(data.userEmail).should('be.visible');
    cy.get(".input[placeholder='Search']").clear();
    cy.get(".input[placeholder='Search']").type(data.userEmail);
    cy.contains(data.userEmail).should('be.visible');
    cy.get('tbody > tr > td > .custom-checkbox > .checkmark').click();

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
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(2)').click();
    cy.url().should('include','/system-admin/user/user-role-permissions');

    //create user role
    // cy.get('.create-button-margin').click();
    // cy.url().should('include', 'system-admin/user/user-role-process')
    // cy.get('.input').type(data.userRole);
    // cy.get('select').select('1');
    // cy.get(':nth-child(2) > .panel > .panel-block > .field > .control > .select > select').select('1');
    // cy.get(':nth-child(1) > .field > .control > .select > select').select('1');
    // cy.get('.is-1 > .create-button').contains('Add').should('be.visible')
    // cy.get('.is-1 > .create-button').contains('Add').trigger('click')
    // cy.get('#feature0').should('be.visible')
    // cy.get('.create-button').contains('Create').trigger('click',{force:true});
    // cy.url().should('include','system-admin/user/user-role-permissions')

    //search user role and select
    cy.get('.input').should('not.be.disabled')
    cy.get('.input').type(data.userRole, {force:true});
    cy.wait(1000)
    cy.contains(data.userRole).should('be.visible');
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').should('have.length',1)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();

    //edit user role
    cy.get('[data-label="Edit User Role"] > .button > .fa').click();
    cy.url().should('include', '/system-admin/user/user-role-process')
    cy.get(':nth-child(1) > .field > .control > .select > select').select('12');
    cy.get('.is-1 > .create-button').trigger('click')
    cy.get('#feature0').should('be.visible')
    cy.get('.create-button').contains('Update').click();

    //search user role and select
    cy.get('.input').type(data.userRole);
    cy.contains(data.userRole).should('be.visible');
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').should('have.length',1)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();

    //deactivate user
    cy.get('.activate-deactivate-admin > .control > .select > select').select('0');
    cy.get('.with-form > .buttons > .is-dark > .button').click();
    cy.get('.modal-card-foot > :nth-child(2)').click()
    cy.get('.status.deactive').colourCheck(243, 146, 55);
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();
    cy.get('#\\31 2').check();
    cy.get('.activate-deactivate-admin > .control > .select > select').select('1');
    cy.get('.with-form > .buttons > .is-dark > .button').click();
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.status').should('have.class', 'active');

  });

  /* ==== Test Created with Cypress Studio ==== */
  it('userGroups', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Settings"]').click();
    cy.get('[data-name="Settings"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(3)').click();
    cy.url().should('include','/system-admin/user/user-groups');

    //create user group
    // cy.get('.create-button').click();
    // cy.url().should('include','/system-admin/user/user-group-process');
    // cy.get('.input').type(data.userGroups, {});
    // cy.get('#checkAll').check({force: true});
    // cy.get('.has-text-center > .create-button').click();
    // cy.get('.has-text-right > :nth-child(2)').click();
    // cy.url().should('include','/system-admin/user/user-groups');


    //search 
    cy.get('.input').type(data.userGroups, {force:true});
    cy.get('tbody > tr > :nth-child(1) > .custom-checkbox > .checkmark').should('have.length', 1).click({force: true});

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
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.activate-deactivate-admin > .control > .select > select').select('1');
    cy.get('.with-form > .buttons > .is-dark > .button').click();
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.status').should('have.class', 'active');
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
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('[style="height: auto;"] > :nth-child(5)').click();
    cy.url().should('include','/system-admin/user/location-groups')

    cy.get('.create-button').click();

    //create test group
    cy.get('.input').type('test group name');
    cy.get('select').select(1);
    cy.get(':nth-child(2) > .field > .control > .select > select').select(1);
    cy.get('.panel-block > .columns > .has-text-right > .create-button').click();
    cy.get('#feature0').should('be.visible');
    cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    cy.get('.title').contains('Location Groups').should('be.visible');

    //delete test group
    cy.get('.input').type('test group name', {force:true});
    cy.get('td').contains('test group name').should('be.visible')
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click();
    cy.get('[data-label="Delete Location Group"] > .button > .fa').click();
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('td').should('not.exist')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('deviceRegistrationRecord', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Devices"]').click();
    cy.get('[data-name="Devices Registration Record"]').click();
    cy.get('.menu-toggle > .fa').click();

    //filter by org and location
    cy.contains('Organisations').siblings().children().children().as('orgSelect');
    cy.get('@orgSelect').select('8',{});
    cy.contains('Locations').siblings().children().children().as('locSelect');
    cy.get('@locSelect').select('38',{});

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

  /* ==== Test Created with Cypress Studio ==== */
  it('patientData', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('select').select(1);
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(1)').trigger('click');
    cy.url().should('include',"/system-product/patient-data")

    
    // //download file and verify
    // cy.get('tbody').should('be.visible').then(()=>{
    //   cy.get(':nth-child(2) > .create-button-margin').click()
    // })
    // // cy.download(data.downloadPath, data.patientDataFilePrefix, ".0.xlsx").should('exist')

    // //add patient
    // cy.get(':nth-child(1) > .create-button-margin').click();
    // cy.get('.modal-card-body > :nth-child(1) > :nth-child(1) > :nth-child(1) > .input').type(data.patientfName, {force:true});
    // cy.get(':nth-child(3) > .input').type(data.patientlName, {force:true});
    // cy.get(':nth-child(4) > .field > .control > .select > select').select('0');
    // cy.get('.modal-card-foot > :nth-child(2)').click();
    // cy.get(':nth-child(1) > :nth-child(1) > .field > .control > .select > select').select('91');
    // cy.get(':nth-child(2) > .field > .input').type(data.patientMRN, {force:true});
    // cy.get('.modal-card-foot > :nth-child(2)').click();
    // cy.get(':nth-child(6) > .control > .input').type(data.patientfName + " " + data.patientlName, {force:true});
    // cy.contains(data.patientfName, {matchCase: false}).should('be.visible')
    // cy.contains(data.patientlName, {matchCase: false}).should('be.visible')
    // cy.contains(data.patientMRN, {matchCase: false}).should('be.visible')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('bloodData', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('select').select(1);
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(5)').trigger('click');
    cy.url().should('include','system-product/blood-data')

    //download and verify
    cy.wait(1000)
    cy.get('.create-button-margin').click()


    //test search function
    // cy.get('.input').type(data.bloodComponent.donationId, {force:true});
    // cy.contains(data.bloodComponent.donationId).should('be.visible')
    // cy.get('.input').clear();
    // cy.get('.input').type(data.bloodComponent.componentName, {});
    // cy.contains(data.bloodComponent.componentName).should('be.visible')
    // cy.get('.input').clear();
    // cy.get('.input').type(data.bloodComponent.componentCat, {});
    // cy.contains(data.bloodComponent.componentCat)
    // cy.get('.input').clear();
    // cy.get('#select_status').select("1",{})
    // cy.contains(data.bloodComponent.componentCat).should('be.visible')
    // cy.get('.create-button-margin').click();
    //get current date ------------------PUT INTO CUSTOM METHOD
    // cy.download(data.downloadPath, data.bloodDataFilePrefix, ".0.xlsx").as("file")
    //search file name and assert include compCat and not include !compCat
    // cy.get('@file').should('contain', data.bloodComponent.componentCat).and('not.contain', 'Platelets').and('not.contain',"Plasma")
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('addPatient(unXmatched/emergency)', function() {
    /* ==== Generated with Cypress Studio ==== */
    //navigation
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(9)').trigger('click');


    //modify patient
    // cy.get(':nth-child(2) > .action-buttons > .is-dark > button > .fa').click();
    // cy.get(':nth-child(9) > .button').click();
    // cy.get('.modal-card-foot > :nth-child(2)').click();
    // cy.get('.notification').should('be.visible')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('fractionatedProductStatus', function() {
    /* ==== Generated with Cypress Studio ==== */
    //navigate
    cy.get('[data-name="Configuration"]').click();
    cy.get('.minimize > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(13)').trigger('click');

    //search
    cy.get('.input').type(data.fpTrackingId, {force:true});
    cy.contains(data.fpTrackingId).should('be.visible')

    //download
    // cy.intercept('http://localhost:8080/api/audit/saveWebAudit').as('download')
    // cy.get('.create-button').click();
    // cy.wait('@download')
    // cy.download(data.downloadPath,data.fractionatedDataFilePrefix,'.xlsx').should('include', data.fpTrackingId)
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('locationConfig', function() {
    /* ==== Generated with Cypress Studio ==== */
    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get('.configuration__list > :nth-child(3)').click();
    cy.get('select').select(1);
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(1)').trigger('click');
    cy.url().should('include','/system-admin/locations/location-configuration')

    //edit location config
    cy.get(':nth-child(1) > .custom-checkbox > .checkmark').click();
    cy.get('.button').click();
    cy.get('.notification').should('be.visible')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('locationSettings', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigation
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('.configuration__list > :nth-child(3)').click();
    cy.get('select').select(1);
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(3)').trigger('click');
    cy.url().should('include','/system-admin/locations/location-settings')

    //create location setting
    // cy.wait(2000)
    // cy.get('.create-button').click().then(()=>{
    //   cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(1) > .control > .input').type(data.locationSetting);
    // })
    // cy.get(':nth-child(3) > .control > .select > #select_status').select('4');
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(1) > .b-checkbox > .control-label').click();
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(1) > .b-checkbox > input').check();
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(14) > .b-checkbox > .control-label').click();
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(14) > .b-checkbox > input').check();
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(12) > .b-checkbox > .check').click();
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(12) > .b-checkbox > input').check();
    // cy.wait(150)
    // cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-foot > .button').as('create').should('be.visible')
    // cy.get('@create').trigger('click');


    //search
    // cy.get(':nth-child(3) > .field > .control > .input').type(data.locationSetting, {force:true});
    // cy.contains(data.locationSetting).should('be.visible')

    //deactivate
    cy.get(':nth-child(1) > .action-buttons > [title="Activate/Deactivate Location"] > .fa').click();
    cy.get('.modal-card > .modal-card-foot > .button').click();
    cy.get('.status.deactive').colourCheck(243, 146, 55);

    //activate
    cy.get(':nth-child(1) > .action-buttons > [title="Activate/Deactivate Location"] > .fa').click();
    cy.get('.modal-card > .modal-card-foot > .button').click();
    cy.get('.status').should('have.class', 'active')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('clinicalAreaSettings', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.configuration__list > :nth-child(3)').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(11)').trigger('click');
    cy.url().should('include','system-admin/feature/clinical-area-setting')

    //create setting
    // cy.get('.create-button').click();
    // cy.get('.modal-card-body > :nth-child(1) > .control > .input').type(data.clinicalAreaSetting);
    // cy.get(':nth-child(2) > .is-1 > .b-checkbox > .check').click();
    // cy.get('form > .modal-card-foot > .button').click();
    // cy.get('.notification > :nth-child(4)').should('be.visible')

    //edit setting
    cy.get('.input[placeholder="Search"').should('be.visible').type(data.clinicalAreaSetting);
    cy.get('tbody > tr').should('have.length', 1)
    cy.get('[title="Edit Settings"] > .fa').click();
    cy.get(':nth-child(4) > .is-1 > .b-checkbox > .check').click();
    cy.get('form > .modal-card-foot > .button').click();
    cy.get('.notification').should('be.visible')

    //deactivate setting
    cy.get('[title="Activate/Deactivate Setting"] > .fa').click();
    cy.get('.modal-card > .modal-card-foot > .button[type="submit"]').click();
    cy.get('.status.deactive').colourCheck(243, 146, 55);

    //activate
    cy.get('[title="Activate/Deactivate Setting"] > .fa').click();
    cy.get('.modal-card > .modal-card-foot > .button[type="submit"]').click();
    cy.get('.status').should('have.class', 'active')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('slaConfig', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').trigger('click');
    cy.get('.configuration__list > :nth-child(3)').click();
    cy.get('select').select(1);
    cy.get('.configuration__list > :nth-child(9)').trigger('click');
    cy.url().should('include','/system-admin/sla-config/sla-configuration')

    //create sla config
    // cy.get('.is-desktop > :nth-child(1) > .create-button').click();
    // cy.get('.panel > :nth-child(2) > .field > .control > .input').type(data.slaConfig.name);
    // cy.get('#2 ').type(data.slaConfig.time);
    // cy.get('#3 ').type(data.slaConfig.time);
    // cy.get('select').select('2');
    // cy.get('.panel-block > .columns > .has-text-right > .create-button').trigger('click');
    // cy.get('#feature0').click();
    // cy.get('#33').scrollIntoView().type(data.slaConfig.time);
    // cy.get('#34').type(data.slaConfig.time);
    // cy.get('#35').type(data.slaConfig.time);
    // cy.get('#41').type(data.slaConfig.time);
    // cy.get('#42').type(data.slaConfig.time);
    // cy.get('#43').type(data.slaConfig.time);
    // cy.get(':nth-child(5) > .column > :nth-child(2)').trigger('click');
    // cy.get('.notification > :nth-child(4)').should('be.visible')

    //search
    // cy.get('.input[placeholder="Search"]').should('be.visible')
    // cy.get('.input[placeholder="Search"]').type(data.slaConfig.name, {force:true});
    // cy.contains(data.slaConfig.name).should('be.visible')

    //edit
    // cy.get(':nth-child(4) > tbody > .has-text-left > .action-buttons > button > .fa').click();
    // cy.url().should('include','isEdit=true&uId=3&uName=Blood%20SLA')
    // cy.get('select').select(4);
    // cy.get('.panel-block > .columns > .has-text-right > .create-button').trigger('click');
    // cy.get('#feature2').scrollIntoView().click();
    // cy.get('#33').type(data.slaConfig.time, {force:true});
    // cy.get('#34').type(data.slaConfig.time, {force:true});
    // cy.get('#35').type(data.slaConfig.time, {force:true});
    // cy.get('#41').type(data.slaConfig.time, {force:true});
    // cy.get('#42').type(data.slaConfig.time, {force:true});
    // cy.get('#43').type(data.slaConfig.time, {force:true});
    // cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    // cy.get('.notification > :nth-child(4)').should('be.visible')

    //search
    // cy.get('.input[placeholder="Search"]').type(data.slaConfig.name, {force:true});
    // cy.contains(data.slaConfig.name).should('be.visible')

    //edit
    // cy.get(':nth-child(4) > tbody > :nth-child(1) > .action-buttons > button > .fa').click();
    // cy.get('.my-accordion-container > :nth-child(1) > :nth-child(1) > .delete').click();
    // cy.get('.modal-card-foot > :nth-child(2)').click()
    // cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    // cy.get('.notification > :nth-child(4)').should('be.visible')
    
    //add override
    // cy.get(':nth-child(7) > :nth-child(1) > .create-button').click();
    // cy.get(':nth-child(1) > .control > .input').type(data.slaConfig.overrideCode);
    // cy.get('form > .modal-card-body').click();
    // cy.get('.modal-card-body > :nth-child(2) > .control > .input').type(data.slaConfig.overrideDesc);
    // cy.get('form > .modal-card-foot > .button').click();
    // cy.get('.notification.showToastClass').should('be.visible')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('masterFiles', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle').click();
    cy.get('.configuration__list > :nth-child(5)').trigger('click');
    cy.get('select').scrollIntoView().select(1);

    //upload blood component file
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(1)').trigger('click');
    cy.url().should('include','system-product/upload-blood-component-master-file')
    cy.get('.placeholder > .fa').click();
    cy.get('#userFile').selectFile(data.bcMasterFilePath, {force:true});
    cy.get('.create-button').click();
    cy.contains('Results').should('be.visible')
    cy.get('.back').click();

    //download blood component file
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(3)').trigger('click');
    cy.url().should('include','system-product/download-blood-component-master-file')
    cy.get('.create-button').click();
    // cy.download(data.downloadPath,data.bcMasterFilePrefix,'.xlsx').should('exist')
    cy.get('.back > p').click();

    //upload fractionated product file
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(5)').click();
    cy.url().should('include','system-product/upload-fractionated-product-master-file')
    cy.get('.placeholder').click();
    cy.get('#userFile').selectFile(data.fpMasterFilePath, {force:true});
    cy.get('.create-button').click();
    cy.contains('Results').should('be.visible')
    cy.get('.back > p').click();

    //download fractionated product file
    cy.get('.configuration__list > :nth-child(7)').click();
    cy.url().should('include','system-product/download-fractionated-product-master-file')
    cy.get('.create-button').click();
    // cy.download(data.downloadPath,data.fpMasterFilePrefix,'.xlsx').should('exist')
    /* ==== End Cypress Studio ==== */
  });

  
  /* ==== Test Created with Cypress Studio ==== */
  it('systemAdministration', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="System Administration"]').click();
    cy.get('.menu-toggle > .fa').click();
    cy.url().should('include', '/system-admin/user')

    //create new admin user
    // cy.get('.sysadmin-user > :nth-child(1) > :nth-child(1) > :nth-child(1)').click();
    // cy.get(':nth-child(1) > :nth-child(1) > .control > .input').type(data.userFName);
    // cy.get(':nth-child(1) > :nth-child(2) > .control > .input').type(data.userLNameAdmin);
    // cy.get(':nth-child(2) > :nth-child(1) > .control > .input').type(data.adminEmail);
    // cy.get('.modal-card-foot > :nth-child(2)').click();
    // cy.get('.notification > :nth-child(4)').contains('System Admin User Created Successfully.').should('be.visible')
    
    //search user
    cy.get('.input[placeholder="Search"]').type(data.userFNameAdmin + " " + data.userLNameAdmin,{force:true});
    cy.get('tbody > tr > :nth-child(1) > .custom-checkbox > .checkmark').click();
    cy.get('tbody').contains('HRFID').should('be.visible')
    
    //edit user
    // cy.get('[data-label="Edit User"] > .button > .fas').click();
    // cy.get('.modal-card-body > :nth-child(2)').click();
    // cy.get(':nth-child(2) > :nth-child(2) > .control > .input').clear();
    // cy.get(':nth-child(2) > :nth-child(2) > .control > .input').type('Test');
    // cy.get('.modal-card-foot > :nth-child(2)').click();
    // cy.get('tbody').contains('Hanis SysAdmin').should('not.exist')
    // cy.get('.notification > :nth-child(4)').contains('System Admin User Updated Successfully.').should('be.visible')
    
    //search and deactivate
    cy.get('.input[placeholder="Search"]').clear();
    cy.get('.input[placeholder="Search"]').type(data.userFNameAdmin + ' ' + data.userLNameAdmin);
    cy.get('tr').contains(data.userLNameAdmin).should('be.visible')
    cy.get('.activate-deactivate-admin > .control > .select > select').select(1);
    cy.get('.button > .fa').click();
    cy.get('.activate-deactivate-modal > .modal > .modal-card > .modal-card-foot > .button').click();
    cy.get('.status').should('have.class','deactive')

    //activate
    cy.get('.activate-deactivate-admin > .control > .select > select').select(0);
    cy.get('.button > .fa').click();
    cy.get('.activate-deactivate-modal > .modal > .modal-card > .modal-card-foot > .button').click();
    cy.get('.status').should('have.class','active')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('alerts', function() {
    /* ==== Generated with Cypress Studio ==== */
    
    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Alerts"]').click();
    cy.get('.menu-toggle > .fa').click();
    
    //fractionated product location tracking
    cy.get('.configuration__list > :nth-child(1)').click();
    // cy.get(':nth-child(3) > .control > .select > select').select('8');
    // cy.get('.product-container > :nth-child(1) > .column > :nth-child(2) > .is-fullwidth > .noMargin > :nth-child(2)').trigger('click');
    // cy.get('.status').colourCheck(3,156,16)
    // cy.get('.product-container > :nth-child(1) > .column > :nth-child(2) > .is-fullwidth > .noMargin > :nth-child(5)').trigger('click');
    // cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > p').click();
    
    //blood component location tracking
    cy.get('.configuration__list > :nth-child(3)').click();
    //TODO:
    // cy.get('.product-container > :nth-child(1) > .column > :nth-child(1) > .control > .select > select').select('8');
    // // cy.get('#InTransitAkshaylocation0 > :nth-child(1) > :nth-child(1) > :nth-child(2)').trigger('click');
    // // cy.get('.status').colourCheck(3,156,16)
    // cy.get('.product-container > :nth-child(1) > .column > :nth-child(1) > :nth-child(1) > :nth-child(1) > .pointer').trigger('click');
    // cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > .fa').click();
    
    //blood component category tracking
    cy.get('.configuration__list > :nth-child(5)').click();
    // cy.wait(1000)
    // cy.get(':nth-child(1) > .control.product-alert-select > .select > select').contains('Select a organisation').parent().scrollIntoView().select('8')
    // cy.get('.noRightMargin > :nth-child(2)').should('be.visible')
    // cy.get('#RedCells0 > .noRightMargin > :nth-child(2)').click();
    // cy.get('.status').colourCheck(3,156,16)
    // cy.get('#RedCells0 > .noRightMargin > :nth-child(5)').click();
    // cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > p').click();
    
    //blood component crossmatch status tracking
    cy.get('.configuration__list > :nth-child(7)').click();
    // cy.wait(1000)
    // cy.get(':nth-child(1) > .control > .select > select').should('be.visible')
    // cy.get(':nth-child(1) > .control > .select > select').contains('Select a organisation').parent().select('8')
    // cy.get('#false1 > .noRightMargin > :nth-child(2)').click();
    // cy.get('.status').colourCheck(3,156,16)
    // cy.get('#false1 > .noRightMargin > :nth-child(5)').click();
    // cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > p').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('bloodSignOutRegister', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.navigateToReportPage("Sign Out Register", "/report/sign-out-register")

    //download;
    cy.get('.archive-col > .collapse-trigger > .print-report-button').click();
    cy.get('.download-xlxs-button').click();
    cy.get('.download-csv-button').click();
    cy.get('.download-pdf-button').click();
    cy.get('.archive-col > .collapse-trigger > .print-report-button').click();

    cy.get(':nth-child(3) > :nth-child(2) > .control > .select > select').select('10',{});
    cy.get(':nth-child(3) > :nth-child(3) > .control > .select > select').select('2023',{});
    cy.get(':nth-child(4) > :nth-child(2) > .control > .select > select').select('10',{});
    cy.get(':nth-child(4) > :nth-child(3) > .control > .select > select').select('2023',{});
    cy.get('.archive-data-button').click();
    
    //filters
    // cy.get(':nth-child(1) > :nth-child(1) > .field > .control > .select > select').select('8', {});
    // cy.get('.min100Width > :nth-child(1) > .field > .control > .select > select').select('91', {});
    // cy.get('.min100Width > :nth-child(1) > .field > .control > .select > select').select('all', {});
    // cy.get(':nth-child(6) > .field > .control > .input').type(data.signOutRegisterName, {});
    
    // //need to test advanced filters
    // cy.get('.panel-heading').click()
    // cy.get('.my-level > :nth-child(3) > .control > .select > select').select('1', {})
    // cy.get('.create-button').click()
    // cy.get('tbody').contains('JOHN CENA').should('be.visible')
    // cy.get('tbody').contains('Red Cells').should('be.visible')
    // cy.get('tbody').contains('Platelets').should('not.exist')
    // cy.get('tbody').contains('Plasma').should('not.exist')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('bloodStockLevelReport', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.navigateToReportPage('Stock Level Report', '/report/stock-level-report')
    
    //download
    cy.downloadReports();
    
    //test search filters
    // cy.get('.is-grouped-multiline > :nth-child(1) > .control > .select > select').select('8',{});
    // cy.get('.is-grouped-multiline > :nth-child(2) > .control > .select > select').select('64',{});
    // cy.get('abbr').contains('QA_Test_Location').should('exist')
    // cy.get('.is-grouped-multiline > :nth-child(4) > .control > .input').type('wdp1001',{});
    // cy.get('abbr').contains('WDP1001').should('exist').and('have.length', 1)
    // cy.get('.panel-heading').click();
    // cy.get('.my-level > :nth-child(2) > .control > .select > select').select('1',{});
    // cy.get('.create-button').click();
    /* ==== End Cypress Studio ==== */
  });

  it('emergencyStockLevelReport', ()=>{

    //navigate
    cy.navigateToReportPage('Emergency Blood Stock Level Report', 'report/emergency-blood-stock-level-report')

    //download
    cy.downloadReports();

    //test search filters
    cy.get('.is-grouped-multiline > :nth-child(1) > .control > .select > select').select('8',{})
    cy.get('.is-grouped-multiline > :nth-child(2) > .control > .select > select').select('64', {})
    cy.get('.panel-heading').click()
    cy.get('.my-level > :nth-child(2) > .control > .select > select').select('1',{})
    cy.get('.my-level > :nth-child(3) > .control > .input').type('HSA1122',{force:true})
    cy.get('.create-button').click()

    // cy.get('abbr').contains("HSA1122").should('be.length',1)
    // cy.get('abbr').contains("QA_Test_Location").should('be.length',1)
    // cy.get('abbr').contains("Red Cells").should('be.length',1)
  });
  
  it.only('bloodTransactionsSummaryReport', ()=>{
    //navigate
    cy.navigateToReportPage('Blood Transactions Report (Summary)', 'report/blood-transactions-report').wait(3000)


    //download and validate (selector for Print Report button not the same)
    cy.get('.print-blood-unit-button').click();
    cy.wait(1000)
    cy.get('.download-xlxs-button').click()
    cy.wait(1000)
    cy.get('.download-csv-button').click()
    cy.wait(1000)
    cy.get('.download-pdf-button').click()
    cy.wait(1000)
    cy.get('.print-blood-unit-button').click();

    //archive
    cy.get('.print-report-button').click();
    cy.get(':nth-child(3) > :nth-child(2) > .control > .select > select').select('10',{});
    cy.get(':nth-child(3) > :nth-child(3) > .control > .select > select').select('2023',{});
    cy.get(':nth-child(4) > :nth-child(2) > .control > .select > select').select('10',{});
    cy.get(':nth-child(4) > :nth-child(3) > .control > .select > select').select('2023',{});
    cy.get('.archive-data-button').click();
    cy.get('.download-archive-data-button').click();
    cy.get('.print-report-button').click();

    //search
    // cy.get('.fix-width > :nth-child(1) > .field > .control > .select > select').select(8);
    // cy.get('.panel-heading').click();
    // cy.get('.my-level > :nth-child(3) > .control > .select > select').select(1);
    // cy.get('.create-button').click();
    // cy.get('.fix-width > :nth-child(2) > .field > .control > .select > select').select(8);
    // cy.get('abbr').contains('Red Cells').scrollIntoView().should('exist')
    // cy.get('abbr').contains("Test").should('exist')
  
    /* ==== End Cypress Studio ==== */
  })

  it('bloodTransactionHistoryDetailedReport', ()=>{
    cy.navigateToReportPage('Blood Transactions History Report (Detailed)', 'report/blood-transaction-history-report')

    //DOWNLOAD
    cy.get('tbody').should('be.visible')
    cy.downloadReports();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.is-grouped-multiline > .field > .control > .select > select').select(8);
    cy.get(':nth-child(2) > :nth-child(2) > .field > .control > .select > select').select(8);
    cy.get(':nth-child(6) > .field > .control > .select > select').select('Issue');
    cy.get(':nth-child(7) > .field > .control > .select > select').select(1);
    // cy.get('.panel-heading').click();
    // cy.get(':nth-child(3) > .control > .input').type('0909085',{force:true});
    // cy.get('.create-button').click();
    // cy.get('tbody').contains('0909085').scrollIntoView().should('be.visible')
    // cy.get('tbody').contains('Test').should('be.visible')
    // cy.get('tbody').contains('Red Cells').scrollIntoView().should('be.visible')

    /* ==== End Cypress Studio ==== */
  })

  it('bloodAnalyticReport', ()=>{
    cy.navigateToReportPage('Blood Analytic Report', '/report/blood-analytic-report')

    cy.get('button.print-report-button').click()

    /* ==== Generated with Cypress Studio ==== */
    // not sure how to validate change in charts...
    cy.get('div.select > .control > .select > select').select(8);
    // cy.get(':nth-child(6) > :nth-child(1) > .tile > .containerClass > .column > .field > .control > .select > select').select('97');
    // cy.get(':nth-child(6) > :nth-child(2) > .tile > .containerClass > :nth-child(1) > .field > .control > .select > select').select('94');
    // cy.get(':nth-child(6) > :nth-child(3) > .tile > .containerClass > :nth-child(1) > .field > .control > .select > select').select('93');
    // cy.get(':nth-child(7) > :nth-child(1) > .tile > .containerClass > :nth-child(1) > .field > .control > .select > select').select('93');
    // cy.get(':nth-child(7) > :nth-child(2) > .tile > .containerClass > :nth-child(1) > .field > .control > .select > select').select('92');
    // cy.get(':nth-child(7) > :nth-child(3) > .tile > .containerClass > :nth-child(1) > .field > .control > .select > select').select('88');
    /* ==== End Cypress Studio ==== */
  })

  it('fpSignOutRegister', ()=>{
    var noData = false;
    cy.navigateToReportPage('Fractionated Product Sign Out Register', '/report/fractionated-product-sign-out-register')
    cy.wait(1000)
    cy.get('.collapse-trigger > .print-report-button').contains('Print Report').click();

    // cy.intercept('http://localhost:8080/api/audit/saveWebAudit').as('download1')
    cy.get('.download-xlxs-button').click();
    // cy.get('.showToastClass').should('be.visible').then(($element)=>{
    //   cy.log($element.length)
    //   if ($element.length == 0) {
    //     cy.wait('@download1')
    //     cy.download(data.downloadPath, data.fpSignOutRegisterPrefix, ".0.xlsx").should('exist')
    //   }
    // })
  
    // cy.intercept('http://localhost:8080/api/audit/saveWebAudit').as('download2')
    cy.get('.download-csv-button').click();
    // cy.get('.showToastClass').should('be.visible').then(($element)=>{
    //   if ($element.length == 0) {
    //     cy.wait('@download2')
    //     cy.download(data.downloadPath, data.fpSignOutRegisterPrefix, ".0.csv").should('exist')
    //   }

    // })
  
    // cy.intercept('http://localhost:8080/api/audit/saveWebAudit').as('download3')
    cy.get('.download-pdf-button').click();
    cy.get('.collapse-trigger > .print-report-button').contains('Print Report').click();
    // cy.get('.showToastClass').should('exist').then(($element)=>{
    //   if ($element.length == 0) {
    //     cy.wait('@download3')
    //     cy.download(data.downloadPath, data.fpSignOutRegisterPrefix, ".pdf").should('exist')
    //   }
    //   else {
    //     noData = true;
    //   }
    // })
    // .then(()=>{
      //search filters
    //   if (!noData) {
    //     cy.get('.fix-width > :nth-child(1) > .field > .control > .select > select').select('8');
    //     cy.get('.fix-width > :nth-child(2) > .field > .control > .select > select').select('55');
    //     cy.get('tbody').contains('QA_Test_Location').as('location').scrollIntoView()
    //     cy.get('@location').should('not.exist')
    //     cy.get('.fix-width > :nth-child(2) > .field > .control > .select > select').select('64');
    //     cy.get('@location').should('be.visible')
    //   }
    // })
  
    /* ==== Generated with Cypress Studio ==== */

    //archive
    cy.get('.archive-col > .collapse-trigger > .print-report-button').contains('Backup').click();
    cy.get(':nth-child(3) > :nth-child(3) > .control > .select > select').select('2023');
    cy.get(':nth-child(3) > :nth-child(2) > .control > .select > select').select('10');
    cy.get(':nth-child(4) > :nth-child(2) > .control > .select > select').select('10');
    cy.get(':nth-child(4) > :nth-child(3) > .control > .select > select').select('2023');
    cy.get('.archive-data-button').click();
    cy.get('.download-archive-data-button').click();

    /* ==== End Cypress Studio ==== */
  })

  it('fpStockLevelReport', ()=>{
    cy.navigateToReportPage('Fractionated Product Stock Level Report', 'report/fractionated-product-stock-level-report')
    cy.downloadReports()
    /* ==== Generated with Cypress Studio ==== */

    //search
    cy.get(':nth-child(5) > :nth-child(1) > .control > .select > select').select('8');
    cy.get(':nth-child(5) > :nth-child(2) > .control > .select > select').select('97');
    cy.get('#gtinId_00642621008784 > :nth-child(1) > .header > :nth-child(3) > .counter').click();
    cy.get('#gtinId_09347408001453 > :nth-child(1) > .header > .pointer > :nth-child(1)').click();
    cy.get('#gtinId_19347408001009 > :nth-child(1) > .header > .pointer > .counter').click();
    cy.get('tr').contains('Akshay location').as('location').scrollIntoView()
    cy.get('@location').should('exist').and('have.length', 1)
    /* ==== End Cypress Studio ==== */
  })

  it('fpTransactionsSummaryReport', ()=>{
    cy.navigateToReportPage('Fractionated Product Transactions Report (Summary)','report/fractionated-product-transaction-report')
    cy.get('.collapse-trigger > .primary-button').contains('Print Report').click();

    cy.get('.download-xlxs-button').click();
    cy.get('.download-csv-button').click();
    cy.get('.download-pdf-button').click();
  
    cy.get('.collapse-trigger > .primary-button').contains('Print Report').click();    
    //archive
    cy.get('.primary-button').contains('Backup').click();
    cy.get(':nth-child(3) > :nth-child(2) > .control > .select > select').select('10');
    cy.get(':nth-child(3) > :nth-child(3) > .control > .select > select').select('2023');
    cy.get(':nth-child(4) > :nth-child(2) > .control > .select > select').select('10');
    cy.get(':nth-child(4) > :nth-child(3) > .control > .select > select').select('2023');
    cy.get('.archive-data-button').click();
    cy.get('.download-archive-data-button').click();

    /* ==== End Cypress Studio ==== */
  })

  it('fpTransactionHistoryDetailedReport', ()=>{
    var noData = false
    cy.navigateToReportPage('Fractionated Product Transactions History Report (Detailed)', 'report/fractionated-product-transaction-history-report')
    cy.downloadReports();
    /* ==== Generated with Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  })

  it.only('fpStockReconciliationReport', ()=>{
    cy.navigateToReportPage('Fractionated Product Transactions Report (Stock Reconciliation)','report/fractionated-product-transaction-report-stock-reconciliation').wait(3000);
    cy.downloadReports()
    /* ==== Generated with Cypress Studio ==== */

    //search
    cy.get('.fix-width > :nth-child(1) > .field > .control > .select > select').select('8');
    cy.get('.is-grouped-multiline > :nth-child(1) > .control > .select > select').select('64');
    cy.get('.panel-heading').click();
    cy.get(':nth-child(3) > .control > .select > select').select(1).as('searchValue');
    cy.get(':nth-child(4) > .control > .select > select').select(1);
    cy.get('.create-button').click();
    cy.get('@searchValue').should('be.visible')
    /* ==== End Cypress Studio ==== */
  })

  it('webAuditReport', ()=>{
    cy.navigateToReportPage('Web Audit Report', '/report/web-audit-report')
    
    //search
    cy.get(':nth-child(1) > .field > .control > .select > select').select('8');
    cy.get('tbody').contains(1).should('be.visible')
    cy.get('label').contains('Date Range').siblings().children().children().select('1')

    cy.get('.field > .control > .input').type('download', {force:true});
    cy.get('tbody').contains('Download').should('be.visible')


    //download
    cy.get('.collapse-trigger > .print-report-button').click();

    cy.get('.download-xlxs-button').click();
    cy.get('.download-csv-button').click();
    cy.get('.download-pdf-button').click();

    cy.get('.collapse-trigger > .print-report-button').click();
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
  })

  it('appAuditReport', ()=>{
    cy.navigateToReportPage('App Audit Report', '/report/app-audit-report')
    /* ==== Generated with Cypress Studio ==== */

    
    //download
    cy.downloadReports();
    /* ==== End Cypress Studio ==== */
  })
  
  it('stockAuditReport', ()=>{
    cy.navigateToReportPage('Stock Audit Report', '/report/stock-audit-report')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.flex > :nth-child(1) > :nth-child(3) > .field > .control > .select > select').select(8);
    cy.get(':nth-child(1) > :nth-child(1) > .field > .control > .select > select').select(8);
    cy.contains('No data available, please revise your selection.').should('be.visible').then(($element)=>{
      if ($element.length == 0) {
        cy.get('tbody').contains('Test').should('be.visible')
      }

    })
    /* ==== End Cypress Studio ==== */
  })

  it('slaAuditReport', ()=>{
    cy.navigateToReportPage('SLA Audit Report', '/report/sla-audit-report')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.is-grouped-multiline > .field > .control > .select > select').select(8);
    cy.get('label').contains('Date Range').siblings().children().children().select(1);
    /* ==== End Cypress Studio ==== */
  })

  it('timeTrackingStatusReport', ()=>{
    cy.navigateToReportPage('Time Tracking Status Report', 'report/time-tracking-status-report')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.fix-width > :nth-child(2) > .field > .control > .select > select').select(8);
    cy.get(':nth-child(4) > .field > .control > .select > select').select(8);
    if (!cy.contains('No data available, please revise your selection.')) {
      cy.get('tbody').contains('Test').should('be.visible')
    }
    /* ==== End Cypress Studio ==== */
  })
})