Cypress.Commands.add('seederLogin', () => {
    const testuser_email = 'default@test.com'
    const testuser_password = 'password'
    const testusername = 'Test account'
    cy.intercept('GET', '/').as('landingpage')
    cy.intercept('POST', '/login').as('login')
    cy.visit('/')
    cy.wait('@landingpage')
    cy.get('[data-testid="PersonIcon"]').click()
    cy.contains('button', 'LOGIN').click()
    cy.get('#email').type(testuser_email)
    cy.get('#password').clear().type(testuser_password)
    cy.get('button[type="submit"]').click()
    cy.wait('@login')
    cy.get('[data-cy="user"]').should('contain', testusername)
})

Cypress.Commands.add('seederLoginLeagueAdmin', () => {
    const testuser_email = 'league_default@test.com'
    const testuser_password = 'password'
    const testusername = 'Test account'
    cy.intercept('GET', '/').as('landingpage')
    cy.intercept('POST', '/login').as('login')
    cy.visit('/')
    cy.wait('@landingpage')
    cy.get('[data-testid="PersonIcon"]').click()
    cy.contains('button', 'LOGIN').click()
    cy.get('#email').type(testuser_email)
    cy.get('#password').clear().type(testuser_password)
    cy.get('button[type="submit"]').click()
    cy.wait('@login')
    cy.get('[data-cy="user"]').should('contain', testusername)
})
