import data from "../fixtures/example.json";

describe("Configuration", ()=>{
  const locationName = "TESTLOCATION"
  const abbr = "TLOC" + Math.floor(Math.random()*100)
  const readerName = "TESTREADER"
  const bayName = abbr + "99A"
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Configuration']").click()
  });

  it("should access Location Configuration and test", ()=>{

    cy.get('[data-name="Location Configuration"]').click();

    //edit location
    cy.get('.input').type(locationName)
    cy.wait(1000)
    cy.get('.action-buttons > button').click()
    cy.get(':nth-child(2) > .column > .control > .input').clear()
    cy.get(':nth-child(2) > .column > .control > .input').type(abbr)
    cy.get('form > .modal-card-foot > .button').click()

    //enable rfid and bt tracking and set alerts (ensure toggles are ON)

    //toggle off
    cy.get(':nth-child(4) > .has-toggle').click()
    cy.get('[data-v-b298ad70=""][data-v-b10c5cb8=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    cy.get(':nth-child(5) > .has-toggle').click()
    cy.get('[data-v-16f6d03b=""][data-v-b10c5cb8=""] > .modal > .modal-card > .modal-card-foot > .button').click()

    //toggle on
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
  it("should access RFID Bay Configuration and test", ()=>{
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

    //create
    cy.get('.create-button').click()
    cy.get('.column > .control > .select > #select_locId').select("AD")
    cy.get(':nth-child(3) > .column > .field > .control > .label > .input').clear()
    cy.get(':nth-child(3) > .column > .field > .control > .label > .input').type("5")
    cy.get(':nth-child(4) > .column > .field > .control > .label > .input').type("12345678910987654321")
    cy.get('form > .modal-card-foot > .button').click()

    //edit
    cy.wait(1000)
    cy.get(".input").type("AD-5")
    cy.wait(1000)
    cy.get('[title="Activate/Deactivate Gateway"]').click()
    cy.get('[data-v-e1dcdef2=""][data-v-18581256=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    cy.wait(1000)
    cy.get('[title="Activate/Deactivate Gateway"]').click()
    cy.get('[data-v-e1dcdef2=""][data-v-18581256=""] > .modal > .modal-card > .modal-card-foot > .button').click()

    cy.get('[title="Edit Gateway"]').click()
    cy.get('.field > .label > .input').clear()
    cy.get('.field > .label > .input').type("10987654321")
    cy.get('form > .modal-card-foot > .button').click()

    cy.get('[title="Deallocate HID BluFi"]').click()
    cy.get('[data-v-2b2a4762=""][data-v-18581256=""] > .modal > .modal-card > .modal-card-foot > .button').click()
    cy.wait(1000)
    cy.get('[title="Pinpoint Gateway on the Map"]').click()
    cy.get('.outfit > img').click('center')
    cy.get("button").contains("Confirm Location").click()

    //delete
    cy.get('[title="Remove Gateway"]').click()
    cy.get('[data-v-466862ea=""][data-v-18581256=""] > .modal > .modal-card > .modal-card-foot > .button').click()

  });
  it("should access Alerts Configuration and test", ()=>{
    cy.get('[data-name="Alerts Configuration"]').click()
    //cant test
  });
  it("should access E-Tag Configuration and test", ()=>{
    cy.get('[data-name="E-Tag Configuration"]').click()
    //cant upload e-tags because of duplication
  });
  it("should access Allocated E-Tags Configuration and test", ()=>{
    cy.get('[data-name="Allocated E-Tags"]').click()
    //cant test
  });
})