import data from "../fixtures/example.json";

describe("Reports", () => {
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Reports']").click()
  });

  it.only("should access E-Tag Location Report and test all functions", () => {
    const fName = "FTest-120"
    const lName = "LTest-120"
    const eTagLocation = "TestLocation"
    //access report page
    cy.get("a").contains("E-Tag Location Report").click()

    //set filters
    cy.get('.columns > :nth-child(1) > .field > .control > .select > select').select('5');

    cy.get(':nth-child(2) > .field > .multiselect > .multiselect__tags > .multiselect__input').click();
    cy.get("input[placeholder='Select First Name']").type(fName +'{enter}')

    cy.get(':nth-child(3) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select Last Name']").type(lName + '{enter}')

    cy.get(':nth-child(4) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select a Location']").type(eTagLocation + "{enter}")

    //assert row data
    cy.get('tbody > tr > :nth-child(3) > abbr').contains(fName)
    cy.get('tbody > tr > :nth-child(4) > abbr').contains(lName)
    cy.get('tbody > tr > :nth-child(6) > abbr').contains(eTagLocation)

    //download reports
    cy.get('.collapse-trigger > .print-report-button').click();
    cy.get('.download-xlxs-button').click();
    cy.verifyDownload('.xlsx', {contains: true})

    cy.get('.download-csv-button').click();
    cy.verifyDownload('.csv', {contains:true})

    cy.get('.download-pdf-button').click();
    cy.verifyDownload('.pdf', {contains:true})
    /* ==== End Cypress Studio ==== */
  })

  it("should access E-Tag Journey Log and test all functions", () => {
    //access report page
    cy.get("a").contains("E-Tag Journey Log").click()
  
  })

  it("should access E-Tag Exception Report and test all functions", () => {
    //access report page
    cy.get("a").contains("E-Tag Exception Report").click()

  })

  it("should access Body Journey Log and test all functions", () => {
    //access report page
    cy.get("a").contains("Body Journey Log").click()

  })

  it("should access Cool Room Occupancy Report and test all functions", () => {
    //access report page
    cy.get("a").contains("Cool Room Occupancy").click()

  })

  it("should access IMCS Error Report and test all functions", () => {
    //access report page
    cy.get("a").contains("IMCS Error Report").click()

  })

})