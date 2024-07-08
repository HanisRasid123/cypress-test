describe("Configuration", ()=>{
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Configuration']").click()
  });
  it("should access Location Configuration and test", ()=>{

  });
  it("should access RFID Reader Configuration and test", ()=>{

  });
  it("should access RFID Bay Configuration and test", ()=>{

  });
  it("should access BT Gateway Configuration and test", ()=>{

  });
  it("should access Alerts Configuration and test", ()=>{

  });
  it("should access E-Tag Configuration and test", ()=>{

  });
  it("should access Allocated E-Tags Configuration and test", ()=>{

  });
})