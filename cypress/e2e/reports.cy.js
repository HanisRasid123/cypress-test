import data from "../fixtures/example.json";

describe("Reports", () => {
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Reports']").click()
  });

  it("should access E-Tag Location Report and test all functions", () => {
    //access report page
    cy.get("a").contains("E-Tag Location Report").click()
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