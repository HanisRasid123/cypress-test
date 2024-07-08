import data from "../fixtures/example.json";

describe("Configuration", ()=>{
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Configuration']").click()
  });

  it.only("should access Location Configuration and test", ()=>{
    const name = "TESTLOCATION"
    const abbr = "TLOC"

    cy.get('[data-name="Location Configuration"]').click();

    // //create location
    // cy.get('.create-button').click()
    // cy.get(':nth-child(1) > .column > .control > .input').type(name)
    // cy.get(':nth-child(2) > .column > .control > .input').type(abbr)
    // cy.get('form > .modal-card-foot > .button').click()

    //edit location
    cy.get('.input').type(name)
    cy.wait(1000)
    cy.get('.action-buttons > button').click()
    cy.get(':nth-child(2) > .column > .control > .input').clear()
    cy.get(':nth-child(2) > .column > .control > .input').type(abbr)
    cy.get('form > .modal-card-foot > .button').click()

    //enable rfid and bt tracking and set alerts
    cy.get(':nth-child(4) > .has-toggle').click()
    cy.get('[data-v-b298ad70=""][data-v-b10c5cb8=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    cy.get(':nth-child(5) > .has-toggle').click()
    cy.get('[data-v-16f6d03b=""][data-v-b10c5cb8=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    cy.get('.notification-button > .notification').click()
    cy.get('.field > .switch > .check') .click()
    cy.get('form > .modal-card-foot > .button').click()

  });
  it("should access RFID Reader Configuration and test", ()=>{
    cy.get('[data-name="RFID Reader Configuration"]').click()
  });
  it("should access RFID Bay Configuration and test", ()=>{
    cy.get('[data-name="RFID Bay Configuration"]').click()
  });
  it("should access BT Gateway Configuration and test", ()=>{
    cy.get('[data-name="BT Gateway Configuration"]').click()
  });
  it("should access Alerts Configuration and test", ()=>{
    cy.get('[data-name="Alerts Configuration"]').click()
  });
  it("should access E-Tag Configuration and test", ()=>{
    cy.get('[data-name="E-Tag Configuration"]').click()
  });
  it("should access Allocated E-Tags Configuration and test", ()=>{
    cy.get('[data-name="Allocated E-Tags"]').click()
  });
})