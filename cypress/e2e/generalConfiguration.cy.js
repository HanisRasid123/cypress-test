import data from "../fixtures/example.json";

describe("General Configuration", ()=>{
  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Configuration']").click()
    cy.get("a[data-name='General']").click()
  });

  it("should access user list and test all functions", ()=>{

  })
  it("should access user role permissions and test all functions", ()=>{
    
  })
  it("should access user group and test all functions", ()=>{
    
  })
  it("should upload users from excel file", ()=>{
    
  })
  it("should access dashboard settings and test all functions", ()=>{
    
  })
})