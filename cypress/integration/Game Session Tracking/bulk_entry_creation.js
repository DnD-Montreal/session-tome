describe('Bulk Entry Creation Management Test Suite', () => {
    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    it('Create Bulk Entries', () => {
        cy.seederLogin()
        cy.intercept('GET', Cypress.Laravel.route('character.index')).as('character')
        cy.visit(Cypress.Laravel.route('character.index'))
        cy.wait('@character')
        cy.get(
            `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
                'character.index',
            )}/"]`,
        )
            .eq(1)
            .invoke('attr', 'href')
            .then((href) => {
                cy.intercept('GET', href).as('character_detail')
                cy.visit(href)
                cy.wait('@character_detail')
            })

        cy.intercept('GET', '**/entry-bulk/*').as('bulk_entry_form')
        cy.intercept('POST', '**/entry-bulk').as('bulk_entry_create')

        cy.contains('button', 'Bulk Entry').click()
        cy.wait('@bulk_entry_form')

        cy.get('#adventures').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Create')
            .click()
            .then(() => {
                cy.contains('The end date must be a date after start date.')
            })
        cy.get('#start_date').click()
        cy.get('svg[data-testid="PenIcon"]').click()
        cy.get('input[placeholder="yyyy-mm-dd hh:mm"]').clear().type('2022-02-01 17:00')
        cy.contains('button', 'OK').click()
        cy.get('#end_date').click()
        cy.get('svg[data-testid="PenIcon"]').click()
        cy.get('input[placeholder="yyyy-mm-dd hh:mm"]').clear().type('2022-03-01 17:00')
        cy.contains('button', 'OK').click()
        cy.contains('button', 'Create').click()
        cy.wait('@bulk_entry_create').its('response.statusCode').should('eq', 302)
    })
})
