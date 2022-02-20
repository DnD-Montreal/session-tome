describe('Admin Event CRUD Test Suite', () => {
    let last_url = ''

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = `${Cypress.config('baseUrl')}/admin/dashboard/`
    })

    beforeEach(() => {
        cy.seederLogin()
        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
    })

    it('Game Masters Report', () => {
        cy.intercept('GET', '**/report/rating').as('rating_report')

        cy.contains('Users').click()
        cy.get('table[id="crudTable"]')
        cy.contains('a', 'Rating Report').click()
        cy.wait('@rating_report').its('response.statusCode').should('eq', 200)
    })

    it('League Rating Report', () => {
        cy.intercept('GET', '**/league/*/report').as('league_rating_report')

        cy.contains('Leagues').click()
        cy.get('table[id="crudTable"]')
        cy.contains('a', 'League Rating Report').click()
        cy.wait('@league_rating_report').its('response.statusCode').should('eq', 200)
    })
})
