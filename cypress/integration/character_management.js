describe('Character Management Test Suite', () => {
    const testusername = 'testuser'
    const testemail = 'testuser@email.com'
    const testpassword = 'testpass'
    let character = null
    const character_name = 'John'
    const character_race = 'Smith'
    const character_class = 'Upper'
    const character_faction = 'Five'
    const character_level = 5
    const character_downtime = 30

    before(() => {
        // In the future, this will be preceded with a cy.refreshRoutes() call.
        // The routes will be defined as Cypress.Laravel.route('route_name')
        character = {
            index: '/character',
            create: '/character/create',
        }
        // In the future, this will be preceded with a cy.refreshDatabase() call.
        // cy.registerTestUser(testusername, testemail, testpassword)
    })

    beforeEach(() => {
        cy.registerAndLoginUser(testusername, testemail, testpassword)
        cy.intercept('GET', character.index).as('character')
        cy.visit(character.index)
        cy.wait('@character')
    })

    it('Character Create', () => {
        cy.contains('a', 'Create').click()
        cy.url().should('include', character.create)
        cy.get('#name').type(character_name)
        cy.get('#race').type(character_race)
        cy.get('#class').type(character_class)
        cy.get('#faction').type(character_faction)
        cy.get('#level').type(character_level)
        cy.get('#downtime').type(character_downtime)
        cy.contains('button', 'Continue').click()
        cy.get('#status').check()
        cy.contains('button', 'Create').click()
        cy.url().should('include', character.index)
        cy.contains('1-1 of 1')
    })

    it('Character Edit', () => {
        cy.get('button[aria-label="edit"]').click()
        cy.get('#downtime')
            .clear()
            .type(character_downtime + 9)
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.url().should('include', character.index)
        cy.contains(character_downtime + 9)
    })

    it('Character Delete', () => {
        cy.get('button[aria-label="delete"]').click()
        cy.contains('button', 'Delete').click()
        cy.url().should('include', character.index)
        cy.contains('0-0 of 0')
    })

    after(() => {
        Cypress.session.clearAllSavedSessions()
    })
})
