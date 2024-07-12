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
  cy.visit(Cypress.env('host'));
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
  cy.get('.create-button').contains('Confirm').click();
  cy.wait(1000)

  //assertions
  cy.url().should('include', '/home/dashboard')
  cy.get('.dashboard').should('be.visible')

})
Cypress.Commands.add('generateAlert', (alertData) => {
  //capture token
  cy.getAllLocalStorage().then((res)=>{
    const hrfid = JSON.parse(res[Cypress.env('host')].hrfid)
    const token = hrfid.userAuth.token
    cy.wrap(token).as('token')
  })

  cy.get('@token').then(token => {
    let webURL = Cypress.env('host')
    let index = webURL.indexOf('vifm')
    let apiURL = webURL.substring(0, index + 4) + "-api" + webURL.substring(index + 4) + "/api/alerts/generateAlert"
    cy.request({
      method: 'POST',
      url: apiURL,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: alertData
    })
    .then((res)=>{
      cy.get('.clear-search-buttons > .button').click()
    })
  })


})
Cypress.Commands.add('download',(downloadPath, filePrefix, fileType) => {
  var fileTs = 0;
  var files = [];
  var filename = "";
  if (filePrefix.includes("Fractionated_Product_") || filePrefix.includes("Master_File_CODABAR")) {
    cy.wait(3000)
    cy.task('readFileMaybe', downloadPath)
    .then(returnArray =>{
      files = returnArray.filter((i)=>{
        return i.includes(filePrefix)
      })
      
      if (files.length == 1) {
        cy.log("1 FILE", files.length)
        filename = downloadPath + files[0]
      }
      else {
        cy.log("MORE THAN 1 FILE", files.length)
        filename = downloadPath + files[files.length - 1]
      }
      
    })
    .then(()=>{
      return cy.readFile(filename)
    })
  }
  else if (filePrefix.includes("ARCHIVE_BLOOD_TRANSACTIONS_REPORT")) {
    return cy.readFile(downloadPath + filePrefix + "All_All_202310_202310" + fileType)
  }
  else {
    const now = new Date();
    fileTs = moment(now).utc().format("DDMMYYYY_HHmm")
    cy.log(fileTs)
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


Cypress.Commands.add('downloadReports', ()=>{
  cy.get('.collapse-trigger > .print-report-button').click();

  cy.get('.download-xlxs-button').click();
  cy.get('.download-csv-button').click();
  cy.get('.download-pdf-button').click();

  cy.get('.collapse-trigger > .print-report-button').click();
})

Cypress.Commands.add('navigateToReportPage', (pageName, url)=>{
  cy.get('.menu-toggle > .fa').click();
  cy.get('[data-name="Reports"]').click();
  cy.get('.menu-toggle').click();
  cy.get('a').contains(pageName).click();
  cy.url().should('include', url)
})

Cypress.Commands.overwrite('click',(originalFn, subject, options)=>{
  return originalFn(subject, options,{force:true})
})

Cypress.Commands.overwrite('select',(originalFn,subject, options)=>{
  return originalFn(subject, options,{force:true})
})

// Cypress.Commands.overwrite('type',(originalFn,subject, options)=>{
//   return originalFn(subject, options,{force:true})
// })

Cypress.Commands.overwrite('check',(originalFn,subject, options)=>{
  return originalFn(subject, options,{force:true})
})
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })