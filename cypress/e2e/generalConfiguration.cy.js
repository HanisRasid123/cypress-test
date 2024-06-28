import data from "../fixtures/example.json";

describe("General Configuration", ()=>{
  const lastName = "TESTPATIENT";
  const userGroup = "VIFM Admin User";
  const newUserGroup = {
    name1: "testgroup",
    name2: "testgroup2",
    category: "General",
    subCategory: "User Management",
    feature1: "User Module",
    feature2: "User Upload"
  }

  beforeEach(()=>{
    cy.login(data.sysAdminEmail, data.sysAdminPassword);

    cy.get("a[data-name='Configuration']").click()
    cy.get("a[data-name='General']").click()
  });

  it("should access user list and test all functions", ()=>{
    //access user list
    cy.get("a[class='configuration__list-item']").contains("User Management").click()
    cy.get("a[class='configuration__list-dropdown-item']").contains("User List").click()

    //search for user
    cy.get("input[placeholder='Search']").as("search").type(lastName)
    cy.get("tr > td").contains(lastName)

    //edit last name --> change back
    cy.get("tbody > tr > .has-text-centered > .custom-checkbox > .checkmark").click();
    cy.get(':nth-child(1) > .tooltip-trigger > .button').click();
    cy.get("label").contains("Last Name").next().children().as("lastName").clear()
    cy.get("@lastName").type(lastName)
    cy.get("button").contains("Update").click()
    
    cy.wait(1000)

    cy.get(':nth-child(1) > .tooltip-trigger > .button').click();
    cy.get("label").contains("Last Name").next().children().as("lastName").clear()
    cy.get("@lastName").type(lastName)
    cy.get("button").contains("Update").click()

    //deactivate user
    cy.wait(1000)

    cy.get('.activate-deactivate-admin > .control > .select > select').select("Deactivate")
    cy.get("span > .fa-check-circle").click()
    cy.get("button").contains("Yes").click()

    //activate user
    cy.get('.activate-deactivate-admin > .control > .select > select').select("Activate")
    cy.get("span > .fa-check-circle").click()
    cy.get("button").contains("Yes").click()

    //remove user group
    cy.wait(1000)
    cy.get(':nth-child(5) > .tooltip-trigger > .button').click()
    cy.get('.modal-card-foot > :nth-child(2)').contains("Yes").click()
    
    //assign user group
    cy.wait(1000)
    cy.get(':nth-child(4) > .tooltip-trigger > .button').click()
    cy.get('.modal-card-body > .field > .control > .select > select').select(userGroup)
    cy.get("footer > button").contains("Save").click()

  })

  it.only("should access user role permissions and test all functions", ()=>{
    //access user role permissions
    cy.get("a[class='configuration__list-item']").contains("User Management").click()
    cy.get("a[class='configuration__list-dropdown-item']").contains("User Role Permissions").click()

    //create new user role
    cy.get("button").contains("Create User Role").click()
    cy.get("input[placeholder='e.g. UserRole1']").type(newUserGroup.name1)
    cy.get(':nth-child(1) > .panel > .panel-block > .field > .control > .select > select').select(newUserGroup.category)
    cy.get(':nth-child(2) > .panel > .panel-block > .field > .control > .select > select').select(newUserGroup.subCategory)
    cy.get(':nth-child(1) > .field > .control > .select > select').select(newUserGroup.feature1)
    cy.get('.is-1 > .create-button').click()
    cy.get(':nth-child(1) > .field > .control > .select > select').select(newUserGroup.feature2)
    cy.get('.is-1 > .create-button').click()
    cy.get('.column > :nth-child(2)').click()

    //edit user role permission
    cy.get(".input").clear()
    cy.get(".input").type(newUserGroup.name1)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click()
    cy.get(':nth-child(1) > .tooltip-trigger > .button').click()
    cy.get("input[placeholder='e.g. UserRole1']").type(newUserGroup.name2)
    cy.get('.column > :nth-child(2)').click()

    //activate user role permission
    cy.get(".input").clear()
    cy.get(".input").type(newUserGroup.name2)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click()
    cy.get('.activate-deactivate-admin > .control > .select > select').select("Activate")
    cy.get('.with-form > .buttons > .b-tooltip > .tooltip-trigger > .button').click()
    cy.get('.modal-card-foot > :nth-child(2)').click()

    //deactivate user role permission
    cy.wait(1000)

    cy.get(".input").clear()
    cy.get(".input").type(newUserGroup.name2)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click()
    cy.get('.activate-deactivate-admin > .control > .select > select').select("Deactivate")
    cy.get('.with-form > .buttons > .b-tooltip > .tooltip-trigger > .button').click()
    cy.get('.modal-card-foot > :nth-child(2)').click()

    //delete user role permisssion
    cy.get(".input").clear()
    cy.get(".input").type(newUserGroup.name2)
    cy.get('.checkbox-td > .custom-checkbox > .checkmark').click()
    cy.get(':nth-child(2) > .buttons > :nth-child(2) > .tooltip-trigger > .button').click()
    cy.get('.modal-card-foot > :nth-child(2)').click()

  })
  it("should access user group and test all functions", ()=>{
    
  })
  it("should upload users from excel file", ()=>{
    
  })
  it("should access dashboard settings and test all functions", ()=>{
    
  })
})