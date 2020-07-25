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

      cy.get('.errorNotification')
        .should('contain', 'Invalid username or password. Please try again.')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Welcome, Testi Käyttäjä!')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testiusername', password: 'testisalasana' })
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Rapping album')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('cypress.hill')
      cy.get('#submitNewBlogButton').click()

      cy.get('.infoNotification').should('be.visible')
      cy.get('li').should('contain', 'Rapping album by Cypress Hill')
    })

    describe('When logged in and one blog added', function() {
      beforeEach(function() {
        cy.addBlog({ title: 'Rapping album', author: 'Cypress Hill', url: 'cypress.hill' })
      })

      it('A blog can be liked', function() {
        cy.contains('Rapping album by Cypress Hill')
        cy.contains('show details')
        cy.get('.detailsButton').click()

        cy.contains('hide details')
        cy.contains('cypress.hill')
        cy.contains('0 likes')

        cy.get('.likeButton').contains('like').click()
        cy.contains('1 like')
        cy.get('.likeButton').contains('like').click()
        cy.contains('2 likes')
      })

      it('A blog can be deleted by the user', function() {
        cy.contains('Rapping album by Cypress Hill')
        cy.contains('show details')
        cy.get('.detailsButton').click()

        cy.contains('hide details')
        cy.contains('cypress.hill')
        cy.contains('0 likes')
        cy.contains('Added by you')

        cy.get('.removeButton').contains('remove').click()

        cy.get('.infoNotification')
          .should('contain', 'The blog was successfully deleted.')
          .and('have.css', 'background-color', 'rgb(0, 128, 0)')
      })

      describe('When logged in and two blogs added', function() {
        beforeEach(function() {
          cy.addBlog({ title: 'Best blog', author: 'Cypress Best', url: 'cypress.best', likes: 10 })
        })

        it('Blogs are ordered by likes', function() {

          // The first <li> element should be the 'Best blog' (10 likes)
          cy.get('ul>li.blogEntry').eq(0).should('contain', 'Best blog by Cypress Best')
          // The last <li> element should be the 'Rapping album' (0 likes)
          cy.get('ul>li.blogEntry').eq(-1).should('contain', 'Rapping album by Cypress Hill')

          cy.addBlog({ title: 'OK blog', author: 'Cypress OK', url: 'cypress.ok', likes: 5 })

          // The first <li> element should be the 'Best blog' (10 likes)
          cy.get('ul>li.blogEntry').eq(0).should('contain', 'Best blog by Cypress Best')
          // The second <li> element should be the 'OK blog' (5 likes)
          cy.get('ul>li.blogEntry').eq(1).should('contain', 'OK blog by Cypress OK')
          // The last <li> element should be the 'Rapping album' (0 likes)
          cy.get('ul>li.blogEntry').eq(-1).should('contain', 'Rapping album by Cypress Hill')
        })
      })
    })
  })
})