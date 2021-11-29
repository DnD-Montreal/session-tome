describe('Manage Characters Test Suite', () => {
    const testusername = 'testuser'
    const character_name = 'John'
    const character_race = 'Smith'
    const character_class = 'Upper'
    const character_faction = 'Five'
    const character_level = 5
    const character_downtime = 30

    before(() => {
        cy.refreshDatabase()
    })

    beforeEach(() => {
        cy.login({name: testusername})
        cy.intercept('GET', Cypress.Laravel.route('character.index')).as('character')
        cy.visit(Cypress.Laravel.route('character.index'))
        cy.wait('@character')
    })

    it('Character Create', () => {
        cy.contains('a', 'Create').click()
        cy.url().should('include', Cypress.Laravel.route('character.create'))
        cy.get('#name').type(character_name)
        cy.get('#race').type(character_race)
        cy.get('#class').type(character_class)
        cy.get('#faction').type(character_faction)
        cy.get('#level').type(character_level)
        cy.get('#downtime').type(character_downtime)
        cy.contains('button', 'Continue').click()
        cy.get('#status').check()
        cy.contains('button', 'Create').click()
        cy.url().should('include', Cypress.Laravel.route('character.index'))
        cy.contains('1-1 of 1')
    })

    it('Character Edit', () => {
        cy.get('button[aria-label="edit"]').click()
        cy.get('#downtime')
            .clear()
            .type(character_downtime + 9)
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.url().should('include', Cypress.Laravel.route('character.index'))
        cy.contains(character_downtime + 9)
    })

    it('Character Delete', () => {
        cy.get('button[aria-label="delete"]').click()
        cy.contains('button', 'Delete').click()
        cy.url().should('include', Cypress.Laravel.route('character.index'))
        cy.contains('0-0 of 0')
    })
})
