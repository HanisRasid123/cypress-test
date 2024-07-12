import data from "../fixtures/example.json";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    //alias search filters
    cy.get("input[placeholder='Search Case ID']").as("caseID");
    cy.get("input[placeholder='Search First Name']").as("firstName");
    cy.get("input[placeholder='Search Last Name']").as("lastName");
    cy.get("input[placeholder='Search E-Tag ID']").as("eTagID");

    //TODO:make api call to check cases.
    //add case to envvar
  });

  it("should display facility tracking and filters should work", () => {

    //should display facility tracking
    cy.get(".facility-tracking-dashboard-container").should("be.visible");

    //red dot comes up when searching for case
    cy.get("@caseID").click();
    cy.get(".multiselect__content-wrapper")
      .should("be.visible")
      .as("caseDropdown");
    cy.get("@caseDropdown")
      .find("ul > li > span > span")
      .contains("2024 Case-Test94")
      .click();
    cy.get(".dot.tooltip.tooltip-scroll.is-searching").should("be.visible");

    //clear search
    cy.get("button").contains("Clear Search").click()
    cy.get(".dot.tooltip.tooltip-scroll.is-searching").should("not.exist");

    //red dot comes up when searching for first name
    cy.get("@firstName").click();
    cy.get(".multiselect__content-wrapper")
      .should("be.visible")
      .as("firstNameDropdown");
    cy.get("@firstNameDropdown")
      .find("ul > li > span > span")
      .contains("FTest-94")
      .click();
    cy.get(".dot.tooltip.tooltip-scroll.is-searching").should("be.visible");

    //clear search
    cy.get("button").contains("Clear Search").click()
    cy.get(".dot.tooltip.tooltip-scroll.is-searching").should("not.exist");

    //red dot comes up when searching for last name
    cy.get("@lastName").click();
    cy.get(".multiselect__content-wrapper")
      .should("be.visible")
      .as("lastNameDropdown");
    cy.get("@lastNameDropdown")
      .find("ul > li > span > span")
      .contains("LTest-94")
      .click();
    cy.get(".dot.tooltip.tooltip-scroll.is-searching").should("be.visible");
  });
  
  it("should toggle dashboard view and display location tracking", () => {

    //should display facility tracking and components
    cy.get(".facility-tracking-dashboard-container").should("be.visible");  

    //toggle view
    cy.get("button").contains("Toggle").click();
    cy.get(".location-tracking-dashboard-container").should("be.visible");

    //should display buttons (wide bay, oos, available, occupied)
    cy.get(".toggle-wide-bay-button").should("be.visible")
    cy.get(".toggle-out-of-service-bays").should("be.visible")
    cy.get(".toggle-available-bays").should("be.visible")
    cy.get(".toggle-occupied-bays").should("be.visible")

    //red dot comes up when searching for caseID
    cy.get("@caseID").click();
    cy.get(".multiselect__content-wrapper")
      .should("be.visible")
      .as("caseDropdown");
    cy.get("@caseDropdown")
      .find("ul > li > span > span")
      .contains("2024 Case-Test120")
      .click();
    cy.get(".red-dot").should("be.visible");

    //red dot comes up when searching for first name
    cy.get("@firstName").click();
    cy.get(".multiselect__content-wrapper")
      .should("be.visible")
      .as("firstNameDropdown");
    cy.get("@firstNameDropdown")
      .find("ul > li > span > span")
      .contains("FTest-120")
      .click();
    cy.get(".red-dot").should("be.visible");

    //red dot comes up when searching for last name
    cy.get("@lastName").click();
    cy.get(".multiselect__content-wrapper")
      .should("be.visible")
      .as("lastNameDropdown");
    cy.get("@lastNameDropdown")
      .find("ul > li > span > span")
      .contains("LTest-120")
      .click();
    cy.get(".red-dot").should("be.visible");
  });

  it.only("should display alerts", () => {
    //make api call to generate alert...
    cy.generateAlert({eTag_ID: "E28069952000444"})
    //use etag filter to filter for specific alert
    cy.get("@eTagID").click()
    cy.get(".multiselect__content-wrapper")
    .should("be.visible")
    .as("eTagDropdown");
    cy.get("@eTagDropdown")
    .find("ul > li > span > span")
    .contains("E28069952000444")
    .click();

    //update note
    cy.get(".collapse-trigger").click();
    cy.get("textarea[placeholder='Enter your note here']").type("Test note")
    cy.get(".saveAlertNoteButton").click();
    cy.get("p").contains("Test note");

    //acknowledge note
    cy.get(".acknowledgeButton").click();
    cy.get("span").contains("Alert Acknowledged Successfully!").should("be.visible");
  });
});
