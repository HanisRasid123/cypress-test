import data from "../fixtures/example.json";

describe("Reports", () => {
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Reports']").click()
  });

  it("should access E-Tag Location Report and test all functions", () => {
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

    const eTagId = "E28069952000444";
    const fName = "Will";
    const lName = "Jacks";
    const eTagLocation = "HRFID OFFICE";

    //access report page
    cy.get("a").contains("E-Tag Journey Log").click()

    //set filters
    cy.get('.is-multiline > :nth-child(1) > [data-v-1db56686=""] > .columns > :nth-child(1) > .field > .control > .select > select').select('4');
    cy.get(':nth-child(2) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select an E-Tag ID']").type(eTagId + "{enter}")

    cy.get(':nth-child(3) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select First Name']").type(fName + "{enter}")

    cy.get(':nth-child(4) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select Last Name']").type(lName + "{enter}")

    cy.get(':nth-child(5) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select a Location']").type(eTagLocation + "{enter}")

    cy.get('#select_status').select("Assigned")

    //assert row data
    cy.get('tbody > tr > :nth-child(2) > abbr').contains(eTagId)
    cy.get('tbody > tr > :nth-child(4) > abbr').contains(fName)
    cy.get('tbody > tr > :nth-child(5) > abbr').contains(lName)
    cy.get('tbody > tr > :nth-child(6) > abbr').contains(eTagLocation)

    //download reports
    cy.get(':nth-child(1) > .print-report-button').click();
    cy.get('.download-xlxs-button').click();
    cy.verifyDownload('.xlsx', {contains: true})

    cy.get('.download-csv-button').click();
    cy.verifyDownload('.csv', {contains:true})

    cy.get('.download-pdf-button').click();
    cy.verifyDownload('.pdf', {contains:true})
  })

  it("should access E-Tag Exception Report and test all functions", () => {
    //access report page
    cy.get("a").contains("E-Tag Exception Report").click()

    //set filters
    cy.get('.columns > :nth-child(1) > .field > .control > .select > select').select('5');

    cy.get("#select_status").select('tag_never_detected');

    //assert data
    const rows = cy.get("tr")
    rows.children().children().contains("Assigned E-tag Never Detected")

    //download files
    cy.get(".print-report-button").click()
    cy.get('.download-xlxs-button').click();
    cy.verifyDownload('.xlsx', {contains: true})

    cy.get('.download-csv-button').click();
    cy.verifyDownload('.csv', {contains:true})

    cy.get('.download-pdf-button').click();
    cy.verifyDownload('.pdf', {contains:true})

  })

  it("should access Body Journey Log and test all functions", () => {

    const caseId = "20231225";
    const caseIdYear = "2024";
    const fName = "Will";
    const lName = "Jacks";
    const eTagId = "E28069952000444";
    const eTagLocation = "HRFID OFFICE";
    const status = "Assigned";

    //access report page
    cy.get("a").contains("Body Journey Log").click()

    //set filters
    cy.get('.is-multiline > :nth-child(1) > [data-v-1a51d6fd=""] > .columns > :nth-child(1) > .field > .control > .select > select').select('4');

    cy.get(':nth-child(2) > .field > .multiselect > .multiselect__tags').click();
    cy.get("input[placeholder='Select a Case ID']").type(caseId + '{enter}');

    // cy.get('.div > .field > .multiselect > .multiselect__tags').click()
    // cy.get("input[placeholder='Select Case ID Year']").type(caseIdYear + '{enter}');

    cy.get(':nth-child(4) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select First Name']").type(fName + '{enter}');

    cy.get(':nth-child(5) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select Last Name']").type(lName + '{enter}');

    cy.get(':nth-child(6) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select Last Name']").type(eTagId + '{enter}');

    cy.get(':nth-child(7) > .field > .multiselect > .multiselect__tags').click()
    cy.get("input[placeholder='Select a Location']").type(eTagLocation + '{enter}');

    cy.get('#select_status').select(status)

    //assert data
    const rows = cy.get("tr")
    rows.children().children().contains(caseId || fName || lName)

    //download files
    cy.get(':nth-child(1) > .print-report-button').click()
    cy.get('.download-xlxs-button').click();
    cy.verifyDownload('.xlsx', {contains: true})

    cy.get('.download-csv-button').click();
    cy.verifyDownload('.csv', {contains:true})

    cy.get('.download-pdf-button').click();
    cy.verifyDownload('.pdf', {contains:true})
  })

  it.only("should access Cool Room Occupancy Report and test all functions", () => {
    //access report page
    cy.get("a").contains("Cool Room Occupancy").click()

    //select date
    cy.get('.dropdown-trigger > .control > .input').click();
    cy.get('.datepicker-body > :nth-child(1) > :nth-child(5) > span').click();

    //download files
    cy.get(".print-report-button")
    cy.get('.download-xlxs-button').click();
    cy.verifyDownload('.xlsx', {contains: true})

    cy.get('.download-csv-button').click();
    cy.verifyDownload('.csv', {contains:true})

    cy.get('.download-pdf-button').click();
    cy.verifyDownload('.pdf', {contains:true})

  })

  it("should access IMCS Error Report and test all functions", () => {
    //access report page
    cy.get(':nth-child(4) > .configuration__content-info > .configuration__list > .configuration__list-item').click()

    //set filter
    cy.get('.columns > :nth-child(1) > .field > .control > .select > select').select("5")

    //download files
    cy.get(".print-report-button")
    cy.get('.download-xlxs-button').click();
    cy.verifyDownload('.xlsx', {contains: true})

    cy.get('.download-csv-button').click();
    cy.verifyDownload('.csv', {contains:true})

    cy.get('.download-pdf-button').click();
    cy.verifyDownload('.pdf', {contains:true})
  })

})