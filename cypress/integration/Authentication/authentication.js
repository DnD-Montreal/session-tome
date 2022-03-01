describe('Character Exploration Test Suite', () => {
    const testusername = 'testuser'
    const testuser_email = 'testuser@email.com'
    const testuser_password = 'testpass'
    const incomplete_password = testuser_password.substr(0, testuser_password.length - 1)

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
        cy.get('#confirmPassword').type(incomplete_password)
        cy.get('button[type="submit"]').click()
        cy.contains('The password confirmation does not match.')
        cy.get('#confirmPassword').clear().type(testuser_password)
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
        cy.contains('button', 'LOGIN').click()
        cy.get('#email').type(testuser_email)
        cy.get('#password').type(incomplete_password)
        cy.get('button[type="submit"]').click()
        cy.contains('These credentials do not match our records')
        cy.get('#password').clear().type(testuser_password)
        cy.get('button[type="submit"]').click()
        cy.wait('@login')
        cy.get('[data-cy="user"]').should('contain', testusername)
    })
})
