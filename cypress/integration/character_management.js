describe('Character Management Test Suite', () => {
    const testusername = 'testuser'
    const character_name = 'John'
    const character_race = 'Smith'
    const character_class = 'Upper'
    const character_faction = 'Five'
    const character_level = 5
    const character_downtime = 30

    before(() => {
        // Login
        cy.viewport(1920, 1080)
        cy.visit('/')
        cy.get('[data-testid="PersonIcon"]').click()
        cy.contains('button', 'Register').click()
        cy.get('input[id="username"]').type(testusername)
        cy.get('input[id="email"]').type('test@email.com')
        cy.get('input[id="password"]').type('testpass')
        cy.get('input[id="confirmPassword"]').type('testpass')
        cy.get('button[type="submit"]').click()
    })

    it('Character Management', () => {
        // Create
        cy.get('#user').contains(testusername, {timeout: 10000})
        cy.contains('a', 'Characters').click({force: true})
        cy.url().should('include', '/character')
        cy.contains('a', 'Create').click()
        cy.url().should('include', '/character/create')
        cy.get('input[id="name"]').type(character_name)
        cy.get('input[id="race"]').type(character_race)
        cy.get('input[id="class"]').type(character_class)
        cy.get('input[id="faction"]').type(character_faction)
        cy.get('input[id="level"]').type(character_level)
        cy.get('input[id="downtime"]').type(character_downtime)
        cy.contains('button', 'Continue').click()
        cy.get('input[id="status"]').check()
        cy.contains('button', 'Create').click()
        cy.url().should('include', '/character')
        cy.contains('1-1 of 1')

        // Edit
        cy.url().should('include', '/character')
        cy.get('button[aria-label="edit"]').click()
        cy.get('input[id="downtime"]').type(character_downtime + 9)
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.url().should('include', '/character')
        cy.contains(character_downtime + 9)

        // Delete
        cy.url().should('include', '/character')
        cy.get('button[aria-label="delete"]').click()
        cy.contains('button', 'Delete').click()
        cy.url().should('include', '/character')
        cy.contains('0-0 of 0')
    })
})
