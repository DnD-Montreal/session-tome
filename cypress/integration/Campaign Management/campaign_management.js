describe('Campaign Management Test Suite', () => {
    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    beforeEach(() => {
        cy.intercept(/\/campaign\/\d+/).as('campaignDetail')
        cy.seederLogin()
        cy.visit('/campaign')
    })

    it('Create camapgin', () => {
        cy.get('button').contains('Create').click()
        cy.get('#title').type('Campaign test')
        cy.get('#adventures').click().type('{downArrow}{enter}')
        cy.get('button').contains('Create').click()
    })

    it('Edit campaign', () => {
        cy.get('a').contains('Campaign test').click()
        cy.wait('@campaignDetail')
        cy.get('[data-cy="update-button"]').click()
        cy.get('#title').clear().type('Campaign test edit')
        cy.get('button').contains('Save').click()
        cy.wait('@campaignDetail')
        cy.get('p').contains('Campaign test edit').should('be.visible')
    })

    it('Delete campaign', () => {
        cy.get('button[aria-label="delete"]').first().click()
        cy.get('button').contains('Delete').click()
    })
})
