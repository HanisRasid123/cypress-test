import data from "../fixtures/example.json";

describe("Configuration", ()=>{
  const locationName = "TESTLOCATION"
  const abbr = "TLOC"
  const readerName = "TESTREADER"
  const bayName = "TLOC99A"
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Configuration']").click()
  });

  it("should access Location Configuration and test", ()=>{

    cy.get('[data-name="Location Configuration"]').click();

    // //create location
    // cy.get('.create-button').click()
    // cy.get(':nth-child(1) > .column > .control > .input').type(name)
    // cy.get(':nth-child(2) > .column > .control > .input').type(abbr)
    // cy.get('form > .modal-card-foot > .button').click()

    //edit location
    cy.get('.input').type(locationName)
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
    //create reader
    cy.get('.create-button').click()
    cy.get('.column > .control > .select > #select_locId').select(abbr)

    cy.get('.field > :nth-child(1) > .control > .input').type(readerName)
    cy.get('form > .modal-card-foot > .button').click()
    //delete reader
    cy.wait(1000)
    cy.get(".input").type(readerName)
    cy.wait(1000)
    cy.get('.action-buttons > button').should("be.visible").click()
    cy.get('.activate-prompt-modal > .modal > .modal-card > .modal-card-foot > .button').click()
  });
  it.only("should access RFID Bay Configuration and test", ()=>{
    cy.get('[data-name="RFID Bay Configuration"]').click()
    //create
    cy.get('.create-button').click()
    cy.get(':nth-child(2) > .column > .control > .select > #select_locId').select(abbr)

    cy.get('.field > :nth-child(1) > .control > .input').type("99")

    cy.get('.modal-card-body > :nth-child(1) > :nth-child(3) > :nth-child(2) > .field > .control > .select > #select_status').select("A")
    cy.get(':nth-child(3) > .check').click()
    cy.get('form > .modal-card-foot > .button').click()
    //activate/deactivate
    cy.wait(1000)
    cy.get(".input").type(bayName)
    cy.wait(1000)
    cy.get('[title="Activate/Deactivate Bay"]').click()
    cy.get('[data-v-5ad3de42=""][data-v-49aa9bd1=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    cy.get('[title="Activate/Deactivate Bay"]').click()
    cy.get('[data-v-5ad3de42=""][data-v-49aa9bd1=""] > .modal > .modal-card > .modal-card-foot > .button').click()

    //delete
    cy.get('[title="Remove Bay"]').click()
    cy.get('[data-v-26ace4e2=""][data-v-49aa9bd1=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    
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