describe('Game Master Ratings Test Suite', () => {
    let creative_rating = 0
    let flexible_rating = 0
    let friendly_rating = 0
    let helpful_rating = 0
    let prepared_rating = 0

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    it('Create Rating Entry', () => {
        cy.seederLogin()

        cy.intercept('GET', Cypress.Laravel.route('rating.index')).as('rating')
        cy.visit(Cypress.Laravel.route('rating.index'))
        cy.wait('@rating')
        cy.get('td>p').eq(0).invoke('text')
        cy.get('td>p')
            .eq(1)
            .invoke('text')
            .then((text) => {
                creative_rating = parseInt(text) + 1
            })
        cy.get('td>p')
            .eq(2)
            .invoke('text')
            .then((text) => {
                flexible_rating = parseInt(text) + 1
            })
        cy.get('td>p')
            .eq(3)
            .invoke('text')
            .then((text) => {
                friendly_rating = parseInt(text) + 1
            })
        cy.get('td>p')
            .eq(4)
            .invoke('text')
            .then((text) => {
                helpful_rating = parseInt(text) + 1
            })
        cy.get('td>p')
            .eq(5)
            .invoke('text')
            .then((text) => {
                prepared_rating = parseInt(text) + 1
            })
            .then(() => {
                cy.intercept('GET', Cypress.Laravel.route('character.index')).as(
                    'character',
                )
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

                cy.intercept('GET', `${Cypress.Laravel.route('entry.create')}*`).as(
                    'entry_create_form',
                )
                cy.intercept('POST', `${Cypress.Laravel.route('entry.store')}`).as(
                    'entry_create',
                )
                cy.contains('button', 'Entry').click()
                cy.wait('@entry_create_form')
                cy.get('#adventures').click()
                cy.get('li[role=option]').eq(0).click()
                cy.get('#dungeon_master').click()
                cy.get('li[role=option]').eq(0).click()
                cy.contains('button', 'Continue').click()

                cy.contains('button', 'Creative').click()
                cy.contains('button', 'Flexible').click()
                cy.contains('button', 'Friendly').click()
                cy.contains('button', 'Helpful').click()
                cy.contains('button', 'Prepared').click()
                cy.contains('button', 'Continue').click()
                cy.contains('button', 'Create').click()
                cy.wait('@entry_create').its('response.statusCode').should('eq', 302)

                cy.intercept('GET', Cypress.Laravel.route('rating.index')).as('rating')
                cy.visit(Cypress.Laravel.route('rating.index'))
                cy.wait('@rating')
                cy.get('td>p').eq(1).contains(creative_rating.toString())
                cy.get('td>p').eq(2).contains(flexible_rating.toString())
                cy.get('td>p').eq(3).contains(friendly_rating.toString())
                cy.get('td>p').eq(4).contains(helpful_rating.toString())
                cy.get('td>p').eq(5).contains(prepared_rating.toString())
            })
    })
})
