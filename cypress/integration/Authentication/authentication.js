describe('Character Exploration Test Suite', () => {
    const testusername = 'testuser'
    const testuser_email = 'testuser@email.com'
    const testuser_password = 'testpass'

    before(() => {
        cy.refreshDatabase()
    })

    it('User Registration', () => {
        cy.intercept('GET', '/').as('landingpage')
        cy.intercept('POST', '/register').as('register')
        cy.visit('/')
        cy.wait('@landingpage')
        cy.get('[data-testid="PersonIcon"]').click()
        cy.contains('button', 'Register').click()
        cy.get('#username').type(testusername)
        cy.get('#email').type(testuser_email)
        cy.get('#password').type(testuser_password)
        cy.get('#confirmPassword').type(testuser_password)
        cy.get('button[type="submit"]').click()
        cy.wait('@register')
        cy.get('[data-cy="user"]').should('contain', testusername)
    })

    it('User Login', () => {
        cy.intercept('GET', '/').as('landingpage')
        cy.intercept('POST', '/login').as('login')
        cy.visit('/')
        cy.wait('@landingpage')
        cy.get('[data-testid="PersonIcon"]').click()
        cy.contains('button', 'Login').click()
        cy.get('#email').type(testuser_email)
        cy.get('#password').type(testuser_password)
        cy.get('button[type="submit"]').click()
        cy.wait('@login')
        cy.get('[data-cy="user"]').should('contain', testusername)
    })
})
