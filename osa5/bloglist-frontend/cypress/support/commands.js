Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
  const token = JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    auth: { bearer: token },
    body: { title, author, url, likes: (likes ? likes : 0) }
  })
  cy.visit('http://localhost:3000')
})
