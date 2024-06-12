import data from '../fixtures/example.json'

describe('Login Process', () => {
  it('fill in login details and login', () => {
    cy.login(data.sysAdminEmail, data.sysAdminPassword)
  })
})