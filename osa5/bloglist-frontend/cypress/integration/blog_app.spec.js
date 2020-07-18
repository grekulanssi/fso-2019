describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Testi Käyttäjä',
      username: 'testiusername',
      password: 'testisalasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 

    cy.visit('http://localhost:3000')
  })

  it('login form is shown when new user arrives', function () {
    cy.contains('Blog app')
    cy.contains('Please log in')
    cy.get('#login-button').should('be.visible')
  })
/*
  describe('Logging in', function() {
    it('existing user can login'), function() {

    }
  })*/
  
})

