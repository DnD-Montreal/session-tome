describe('Character Log Migrator Test Suite', () => {
    const testusername = 'testuser'
    const ALCharacterName = 'Grod'
    const csvPath = '../../database/mocks/grod.csv'

    before(() => {
        cy.refreshDatabase()
    })

    beforeEach(() => {
        cy.login({name: testusername})
        cy.intercept('GET', Cypress.Laravel.route('character.index')).as('character')
        cy.visit(Cypress.Laravel.route('character.index'))
        cy.wait('@character')
        cy.contains('button', 'Import').click()
    })

    it('AdventurersLeagueLog Import', () => {
        cy.get('#ALimport').attachFile({filePath: csvPath, allowEmpty: false})
        cy.contains('button', 'Import').click()
        cy.contains(ALCharacterName)
    })
})
