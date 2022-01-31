describe('Rating Lookup Test Suite', () => {
    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    it('Rating Lookup', () => {
        cy.seederLogin()

        cy.intercept('GET', Cypress.Laravel.route('rating.index')).as('rating')
        cy.visit(Cypress.Laravel.route('rating.index'))
        cy.wait('@rating')

        cy.contains('Name')
        cy.contains('Creative')
        cy.contains('Flexible')
        cy.contains('Friendly')
        cy.contains('Helpful')
        cy.contains('Prepared')

        cy.intercept('GET', '**rating*').as('rating_filter')
        cy.contains('League Event Ratings Only').click()
        cy.wait('@rating_filter')
        cy.url().should('include', 'from_event')

        cy.get('td>p')
        cy.get('#search-filter').type('_')
        cy.get('td>p').should('not.exist')
    })
})
