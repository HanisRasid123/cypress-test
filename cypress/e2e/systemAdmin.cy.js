import moment from 'moment/moment';
import data from '../fixtures/example.json'
import fs from 'fs'

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
    cy.get('select').select('1').then(()=>{
      cy.get(':nth-child(2) > .field > .control > .select > select').select('1');
    })
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
  it('deviceRegistrationRecord', function() {
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

  /* ==== Test Created with Cypress Studio ==== */
  it('patientData', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('select').select('HSA');
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(1)').click();
    cy.url().should('include',"/system-product/patient-data")

    
    //download file and verify
    cy.get('tbody').should('be.visible').then(()=>{
      cy.get(':nth-child(2) > .create-button-margin').click({force:true})
    })
    cy.download(data.downloadPath, data.patientDataFilePrefix, ".0.xlsx").should('exist')

    //add patient
    cy.get(':nth-child(1) > .create-button-margin').click({force:true});
    cy.get('.modal-card-body > :nth-child(1) > :nth-child(1) > :nth-child(1) > .input').type(data.patientfName);
    cy.get(':nth-child(3) > .input').type(data.patientlName);
    cy.get(':nth-child(4) > .field > .control > .select > select').select('0');
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get(':nth-child(1) > :nth-child(1) > .field > .control > .select > select').select('91');
    cy.get(':nth-child(2) > .field > .input').type(data.patientMRN);
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get(':nth-child(6) > .control > .input').type(data.patientfName + " " + data.patientlName);
    cy.contains(data.patientfName, {matchCase: false}).should('be.visible')
    cy.contains(data.patientlName, {matchCase: false}).should('be.visible')
    cy.contains(data.patientMRN, {matchCase: false}).should('be.visible')
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
    cy.get('select').select('HSA');
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(5)').click();

    //download and verify
    cy.get('.create-button-margin').click({force:true}).then(()=>{
      cy.download(data.downloadPath, data.bloodDataFilePrefix, ".0.xlsx").should('exist')
    })


    //test search function
    cy.get('.input').type(data.bloodComponent.donationId, {force:true});
    cy.contains(data.bloodComponent.donationId).should('be.visible')
    cy.get('.input').clear();
    cy.get('.input').type(data.bloodComponent.componentName, {force:true});
    cy.contains(data.bloodComponent.componentName).should('be.visible')
    cy.get('.input').clear();
    cy.get('.input').type(data.bloodComponent.componentCat, {force:true});
    cy.contains(data.bloodComponent.componentCat)
    cy.get('.input').clear();
    cy.get('#select_status').select("1",{force:true})
    cy.contains(data.bloodComponent.componentCat).should('be.visible')
    cy.get('.create-button-margin').click({force:true});
    //get current date ------------------PUT INTO CUSTOM METHOD
    cy.download(data.downloadPath, data.bloodDataFilePrefix, ".0.xlsx").as("file")
    //search file name and assert include compCat and not include !compCat
    cy.get('@file').should('contain', data.bloodComponent.componentCat).and('not.contain', 'Platelets').and('not.contain',"Plasma")
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
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(9)').click();

    //modify patient
    cy.get(':nth-child(2) > .action-buttons > .is-dark > button > .fa').click();
    cy.get(':nth-child(9) > .button').click();
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.notification').should('be.visible')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('fractionatedProductStatus', function() {
    /* ==== Generated with Cypress Studio ==== */
    //navigate
    cy.get('[data-name="Configuration"]').click();
    cy.get('.minimize > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.configuration__list > :nth-child(1)').click();
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(13)').click();

    //search
    cy.get('.input').type(data.fpTrackingId, {force:true});
    cy.contains(data.fpTrackingId).should('be.visible')

    //download
    cy.intercept('http://localhost:8080/api/audit/saveWebAudit').as('download')
    cy.get('.create-button').click({force:true});
    cy.wait('@download')
    cy.download(data.downloadPath,data.fractionatedDataFilePrefix,'.xlsx').should('include', data.fpTrackingId)
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
    cy.get('select').select('HSA');
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(1)').click();
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
    cy.get('select').select('HSA');
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(3)').click();
    cy.url().should('include','/system-admin/locations/location-settings')

    //create location setting
    cy.wait(2000)
    cy.get('.create-button').click({force:true}).then(()=>{
      cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(1) > .control > .input').type(data.locationSetting);
    })
    cy.get(':nth-child(3) > .control > .select > #select_status').select('4');
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(1) > .b-checkbox > .control-label').click();
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(1) > .b-checkbox > input').check({force:true});
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(14) > .b-checkbox > .control-label').click();
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(14) > .b-checkbox > input').check({force:true});
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(12) > .b-checkbox > .check').click();
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-body > :nth-child(4) > .my-level > .my-level-item > .columns > :nth-child(12) > .b-checkbox > input').check({force:true});
    cy.get('.create-location-settings-modal > .modal > .modal-card > form > .modal-card-foot > .button').click({force:true});


    //search
    cy.get(':nth-child(3) > .field > .control > .input').type(data.locationSetting);
    cy.contains(data.locationSetting).should('be.visible')

    //deactivate
    cy.get('[title="Activate/Deactivate Location"] > .fa').click();
    cy.get('.modal-card > .modal-card-foot > .button').click();
    cy.get('.status.deactive').colourCheck(243, 146, 55);
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
    cy.get('select').select('HSA');
    cy.get('.configuration__list > :nth-child(11)').click();
    cy.url().should('include','system-admin/feature/clinical-area-setting')

    //create setting
    cy.get('.create-button').click();
    cy.get('.modal-card-body > :nth-child(1) > .control > .input').type(data.clinicalAreaSetting);
    cy.get(':nth-child(2) > .is-1 > .b-checkbox > .check').click();
    cy.get('form > .modal-card-foot > .button').click();
    cy.get('.notification > :nth-child(4)').should('be.visible')

    //edit setting
    cy.get('.input[placeholder="Search"').should('be.visible').type(data.clinicalAreaSetting);
    cy.get('[title="Edit Settings"] > .fa').click();
    cy.get(':nth-child(4) > .is-1 > .b-checkbox > .check').click();
    cy.get('form > .modal-card-foot > .button').click();
    cy.get('.notification').should('be.visible')

    //deactivate setting
    cy.get('[title="Activate/Deactivate Setting"] > .fa').click();
    cy.get('.modal-card-foot > .button').click();
    cy.get('.status.deactive').colourCheck(243, 146, 55);
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('slaConfig', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Configuration"]').click();
    cy.get('[data-name="Configuration"] > .custom-dropdown > .custom-dropdown__items').click();
    cy.get('.configuration__list > :nth-child(3)').click();
    cy.get('select').select('HSA', {force:true});
    cy.get('.configuration__list > :nth-child(9)').click();
    cy.get('.menu-toggle').click();
    cy.url().should('include','/system-admin/sla-config/sla-configuration')

    //create sla config
    cy.get('.is-desktop > :nth-child(1) > .create-button').click({force:true});
    cy.get('.panel > :nth-child(2) > .field > .control > .input').type(data.slaConfig.name);
    cy.get('#2 ').type(data.slaConfig.time);
    cy.get('#3 ').type(data.slaConfig.time);
    cy.get('select').select('2');
    cy.get('.panel-block > .columns > .has-text-right > .create-button').click();
    cy.get('#feature0').click();
    cy.get('#33').type(data.slaConfig.time);
    cy.get('#34').type(data.slaConfig.time);
    cy.get('#35').type(data.slaConfig.time);
    cy.get('#41').type(data.slaConfig.time);
    cy.get('#42').type(data.slaConfig.time);
    cy.get('#43').type(data.slaConfig.time);
    cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    cy.get('.notification > :nth-child(4)').should('be.visible')

    //search
    cy.get('.input[placeholder="Search"]').type(data.slaConfig.name, {force:true});
    cy.contains(data.slaConfig.name).should('be.visible')

    //edit
    cy.get(':nth-child(4) > tbody > .has-text-left > .action-buttons > button > .fa').click({force:true});
    cy.get('select').select('8');
    cy.get('.panel-block > .columns > .has-text-right > .create-button').click();
    cy.get('#feature1').click();
    cy.get('#\\31 29').type(data.slaConfig.time);
    cy.get('#\\31 30').type(data.slaConfig.time);
    cy.get('#\\31 31').type(data.slaConfig.time);
    cy.get('#\\31 37').type(data.slaConfig.time);
    cy.get('#\\31 38').type(data.slaConfig.time);
    cy.get('#\\31 39').type(data.slaConfig.time);
    cy.get(':nth-child(5) > .column > :nth-child(2)').click();
    cy.get('.notification > :nth-child(4)').should('be.visible')
    
    //add override
    cy.get(':nth-child(7) > :nth-child(1) > .create-button').click();
    cy.get(':nth-child(1) > .control > .input').type(data.slaConfig.overrideCode);
    cy.get('form > .modal-card-body').click();
    cy.get('.modal-card-body > :nth-child(2) > .control > .input').type(data.slaConfig.overrideDesc);
    cy.get('form > .modal-card-foot > .button').click();
    cy.get('.notification.showToastClass').should('be.visible')
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
    cy.get('.configuration__list > :nth-child(5)').click();
    cy.get('select').select('HSA');

    //upload blood component file
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(1)').click();
    cy.url().should('include','system-product/upload-blood-component-master-file')
    cy.get('.placeholder > .fa').click();
    cy.get('#userFile').selectFile(data.bcMasterFilePath, {force:true});
    cy.get('.create-button').click();
    cy.contains('Results').should('be.visible')
    cy.get('.back').click({force:true});

    //download blood component file
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(3)').click();
    cy.url().should('include','system-product/download-blood-component-master-file')
    cy.get('.create-button').click();
    cy.download(data.downloadPath,data.bcMasterFilePrefix,'.xlsx').should('exist')
    cy.get('.back > p').click({force:true});

    //upload fractionated product file
    cy.get(':nth-child(3) > .configuration__content-info > .configuration__list > :nth-child(5)').click();
    cy.url().should('include','system-product/upload-fractionated-product-master-file')
    cy.get('.placeholder').click();
    cy.get('#userFile').selectFile(data.fpMasterFilePath, {force:true});
    cy.get('.create-button').click();
    cy.contains('Results').should('be.visible')
    cy.get('.back > p').click({force:true});

    //download fractionated product file
    cy.get('.configuration__list > :nth-child(7)').click();
    cy.url().should('include','system-product/download-fractionated-product-master-file')
    cy.get('.create-button').click();
    cy.download(data.downloadPath,data.fpMasterFilePrefix,'.xlsx').should('exist')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('bloodSignOutRegister', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.get('.menu-toggle > .fa').click();
    cy.get('[data-name="Reports"]').click();
    cy.get('.menu-toggle > .fa').click();
    cy.get(':nth-child(2) > .configuration__content-info > .configuration__list > :nth-child(1)').click();
    cy.url().should('include','report/sign-out-register')

    //download
    cy.downloadAndValidateReports();
    
    //archive TODO: can't test bc no data error and env var
    cy.get('.archive-col > .collapse-trigger > .print-report-button').click({force:true});
    cy.get(':nth-child(3) > :nth-child(2) > .control > .select > select').select('01',{force:true});
    cy.get(':nth-child(3) > :nth-child(3) > .control > .select > select').select('2022',{force:true});
    cy.get(':nth-child(4) > :nth-child(2) > .control > .select > select').select('03',{force:true});
    cy.get(':nth-child(4) > :nth-child(3) > .control > .select > select').select('2022',{force:true});
    cy.get('.archive-data-button').click({force:true});
    
    //filters
    cy.get(':nth-child(1) > :nth-child(1) > .field > .control > .select > select').select('8', {force:true});
    cy.get('.min100Width > :nth-child(1) > .field > .control > .select > select').select('91', {force:true});
    cy.get('.min100Width > :nth-child(1) > .field > .control > .select > select').select('all', {force:true});
    cy.get(':nth-child(6) > .field > .control > .input').type(data.signOutRegisterName, {force:true});
    
    //need to test advanced filters
    cy.get('.panel-heading').click()
    cy.get('.my-level > :nth-child(3) > .control > .select > select').select('1', {force:true})
    cy.get('.create-button').click({force:true})
    cy.get('tbody').contains('JOHN CENA').should('be.visible')
    cy.get('tbody').contains('Red Cells').should('be.visible')
    cy.get('tbody').contains('Platelets').should('not.exist')
    cy.get('tbody').contains('Plasma').should('not.exist')
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
    cy.get('.sysadmin-user > :nth-child(1) > :nth-child(1) > :nth-child(1)').click({force:true});
    cy.get(':nth-child(1) > :nth-child(1) > .control > .input').type(data.userFName);
    cy.get(':nth-child(1) > :nth-child(2) > .control > .input').type(data.userLName);
    cy.get(':nth-child(2) > :nth-child(1) > .control > .input').type(data.userEmail);
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('.notification > :nth-child(4)').contains('System Admin User Created Successfully.').should('be.visible')

    //search user
    cy.get('.input[placeholder="Search"]').type(data.userFName + " " + data.userLName,{force:true});
    cy.get('tbody > tr > :nth-child(1) > .custom-checkbox > .checkmark').click();
    cy.get('tbody').contains('rasid').should('be.visible')

    //edit user
    cy.get('[data-label="Edit User"] > .button > .fas').click();
    cy.get('.modal-card-body > :nth-child(2)').click();
    cy.get(':nth-child(2) > :nth-child(2) > .control > .input').clear();
    cy.get(':nth-child(2) > :nth-child(2) > .control > .input').type('Test');
    cy.get('.modal-card-foot > :nth-child(2)').click();
    cy.get('tbody').contains('hanis rasid').should('not.exist')
    cy.get('.notification > :nth-child(4)').contains('System Admin User Updated Successfully.').should('be.visible')

    //search and activate
    cy.get('.input[placeholder="Search"]').clear();
    cy.get('.input[placeholder="Search"]').type(data.userFName + ' Test');
    cy.get('tr').contains('Test').should('be.visible')
    cy.get('.button > .fa').click();
    cy.get('.activate-deactivate-modal > .modal > .modal-card > .modal-card-foot > .button').click();
    cy.get('.status').colourCheck(23,190,187)
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
    cy.get(':nth-child(3) > .control > .select > select').select('8');
    cy.get('#AtLocationQA_Test_Location0 > :nth-child(1) > :nth-child(1) > :nth-child(2)').click();
    cy.get('.status').colourCheck(3,156,16)
    cy.get('#AtLocationQA_Test_Location0 > :nth-child(1) > :nth-child(1) > :nth-child(5)').click();
    cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > p').click({force:true});

    //blood component location tracking
    cy.get('.configuration__list > :nth-child(3)').click();
    cy.get(':nth-child(1) > .control > .select > select').select('8');
    cy.get('#InTransitAkshaylocation0 > :nth-child(1) > :nth-child(1) > :nth-child(2) > .counter').click();
    cy.get('.status').colourCheck(3,156,16)
    cy.get('#InTransitAkshaylocation0 > :nth-child(1) > :nth-child(1) > :nth-child(5) > :nth-child(1)').click();
    cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > .fa').click({force:true});

    //blood component category tracking
    cy.get('.configuration__list > :nth-child(5)').click();
    cy.get(':nth-child(1) > .control > .select > select').should('be.visible').then(()=>{
      cy.get(':nth-child(1) > .control > .select > select').select('8')
    })
    cy.get('.noRightMargin > :nth-child(2)').click();
    cy.get('.status').colourCheck(3,156,16)
    cy.get('.noRightMargin > :nth-child(5) > :nth-child(1)').click();
    cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > p').click({force:true});

    //blood component crossmatch status tracking
    cy.get('.configuration__list > :nth-child(7)').click();
    cy.get(':nth-child(1) > .control > .select > select').should('be.visible').then(()=>{
      cy.get(':nth-child(1) > .control > .select > select').select('8')
    })
    cy.get('#false1 > .noRightMargin > :nth-child(2) > :nth-child(1)').click({force:true});
    cy.get('.status').colourCheck(3,156,16)
    cy.get('#false1 > .noRightMargin > :nth-child(5) > :nth-child(1)').click();
    cy.get('.status').colourCheck(218, 29, 58)
    cy.get('.back > p').click({force:true});
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('bloodStockLevelReport', function() {
    /* ==== Generated with Cypress Studio ==== */

    //navigate
    cy.navigateToReportPage('Stock Level Report', '/report/stock-level-report')

    //download
    cy.downloadAndValidateReports(data.stockLevelReportFilePrefix);

    //test search filters
    cy.get('.is-grouped-multiline > :nth-child(1) > .control > .select > select').select('8',{force:true});
    cy.get('.is-grouped-multiline > :nth-child(2) > .control > .select > select').select('64',{force:true});
    cy.get('abbr').contains('QA_Test_Location').should('exist')
    cy.get('.is-grouped-multiline > :nth-child(4) > .control > .input').type('wdp1001',{force:true});
    cy.get('abbr').contains('WDP1001').should('exist').and('have.length', 1)
    cy.get('.panel-heading').click({force:true});
    cy.get('.my-level > :nth-child(2) > .control > .select > select').select('1',{force:true});
    cy.get('.create-button').click({force:true});
    /* ==== End Cypress Studio ==== */
  });

  it.only('emergencyStockLevelReport', ()=>{

    //navigate
    cy.navigateToReportPage('Emergency Blood Stock Level Report', 'report/emergency-blood-stock-level-report')

    //download
    cy.downloadAndValidateReports(data.emergencyBloodStockReportFilePrefix);

    //test search filters
    cy.get('.is-grouped-multiline > :nth-child(1) > .control > .select > select').select('8',{force:true})
    cy.get('.is-grouped-multiline > :nth-child(2) > .control > .select > select').select('64', {force:true})
    cy.get('.panel-heading').click({force:true})
    cy.get('.my-level > :nth-child(2) > .control > .select > select').select('1',{force:true})
    cy.get('.my-level > :nth-child(3) > .control > .input').type('HSA1122',{force:true})
    cy.get('.create-button').click({force:true})

    cy.get('abbr').contains("HSA1122").should('be.length',1)
    cy.get('abbr').contains("QA_Test_Location").should('be.length',1)
    cy.get('abbr').contains("Red Cells").should('be.length',1)
  });

  // it.only('bloodTransactionsSummaryReport', ()=>{
  //   //navigate
  //   cy.navigateToReportPage('Blood Transactions Report (Summary)', 'report/blood-transactions-report')
  // })

  // it.only('bloodTransactionHistoryDetailedReport', ()=>{
  //   cy.navigateToReportPage('Blood Transactions History Report (Detailed)', 'report/blood-transaction-history-report')
  // })

  // it.only('bloodAnalyticReport', ()=>{
  //   cy.navigateToReportPage('Blood Analytic Report', '/report/blood-analytic-report')
  // })

  // it.only('fpSignOutRegister', ()=>{
  //   cy.navigateToReportPage('Fractionated Product Sign Out Register', '/report/fractionated-product-sign-out-register')
  // })

  // it.only('fpStockLevelReport', ()=>{
  //   cy.navigateToReportPage('Fractionated Product Stock Level Report', 'report/fractionated-product-stock-level-report')
  // })

  // it.only('fpTransactionsSummaryReport', ()=>{
  //   cy.navigateToReportPage('Fractionated Product Transactions Report (Summary)','report/fractionated-product-transaction-report')
  // })

  // it.only('fpTransactionHistoryDetailedReport', ()=>{
  //   cy.navigateToReportPage('Fractionated Product Transactions History Report (Detailed)', 'report/fractionated-product-transaction-history-report')
  // })

  // it.only('fpStockReconciliationReport', ()=>{
  //   cy.navigateToReportPage('Fractionated Product Transactions Report (Stock Reconciliation)','report/fractionated-product-transaction-report-stock-reconciliation')
  // })

  // it.only('webAuditReport', ()=>{
  //   cy.get(':nth-child(4) > .configuration__content-info > .configuration__list > :nth-child(1)')
  // })

  // it.only('appAuditReport', ()=>{
  //   cy.get(':nth-child(4) > .configuration__content-info > .configuration__list > :nth-child(3)')
  // })

  // it.only('stockAuditReport', ()=>{
  //   cy.get(':nth-child(4) > .configuration__content-info > .configuration__list > :nth-child(5)')
  // })

  // it.only('slaAuditReport', ()=>{
  //   cy.get(':nth-child(4) > .configuration__content-info > .configuration__list > :nth-child(7)')
  // })

  // it.only('timeTrackingStatusReport', ()=>{
  //   cy.get(':nth-child(4) > .configuration__content-info > .configuration__list > :nth-child(9)')
  // })
})