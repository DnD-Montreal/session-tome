describe('Manage Items Test Suite', () => {
    const testusername = 'Test account'
    const testuser_email = 'default@test.com'
    const testuser_password = 'password'

    before(() => {
        cy.refreshDatabase()
        cy.artisan('db:seed')
        cy.intercept('GET', '/').as('landingpage')
        cy.intercept('POST', '/login').as('login')
        cy.visit('/')
        cy.wait('@landingpage')
        cy.get('[data-testid="PersonIcon"]').click()
        cy.contains('button', 'Login').click()
        cy.get('#email').type(testuser_email)
        cy.get('#password').clear().type(testuser_password)
        cy.get('button[type="submit"]').click()
        cy.wait('@login')
        cy.get('[data-cy="user"]').should('contain', testusername)
    })
})
