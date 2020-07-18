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

  describe('Logging in', function() {
    it('existing user can login', function() {
      cy.get('#username').type('testiusername')
      cy.get('#password').type('testisalasana')
      cy.get('#login-button').click()

      cy.contains('Welcome, Testi Käyttäjä!')
      cy.contains('Login successful!')
    })

    it('non-existing user cannot login', function() {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password. Please try again.')
        .parent()
        .should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })
  
})

