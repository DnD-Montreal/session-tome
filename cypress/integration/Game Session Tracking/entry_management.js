describe('Manage Characters Test Suite', () => {
    let last_url = ''
    let number_of_entries = 0

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = Cypress.Laravel.route('character.index')
    })

    beforeEach(() => {
        cy.seederLogin()
        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
    })

    afterEach(() => {
        cy.url().then((urlString) => {
            last_url = urlString
        })
    })

    it('View Entries', () => {
        cy.get(
            `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
                'character.index',
            )}/"]`,
        )
            .eq(1)
            .click()
        cy.contains('Date')
        cy.contains('Adventure Title')
        cy.contains('Session')
        cy.contains('Reward')
        cy.contains('Magic Items')
        cy.contains('Rows per page:')
    })

    it('Create Character Entry', () => {
        cy.get('p[class^="MuiTablePagination-displayedRows"]')
            .invoke('text')
            .then((text) => {
                number_of_entries = parseInt(text.split(' ').pop()) + 1
            })
            .then(() => {
                cy.intercept('GET', `${Cypress.Laravel.route('entry.create')}*`).as(
                    'entry_create_form',
                )
                cy.contains('button', 'Entry').click()
                cy.wait('@entry_create_form')
                cy.get('#adventures').click()
                cy.get('li[role=option]').eq(0).click()
                cy.get('#location').clear().type('Test location')
                cy.get('#length').clear().type('2')
                cy.get('#levels').clear().type('1')
                cy.get('#gp').clear().type('12')
                cy.get('#dungeon_master').clear().type('Test DM')
                cy.get('#notes').clear().type('Test notes')
                cy.contains('button', 'Continue').click()

                cy.contains('button', 'Creative')
                cy.contains('button', 'Flexible')
                cy.contains('button', 'Friendly')
                cy.contains('button', 'Helpful')
                cy.contains('button', 'Prepared')
                cy.contains('button', 'Continue').click()
                cy.contains('button', 'Create').click()
                cy.contains(`of ${number_of_entries}`)
            })
    })

    it('Edit Character Entry', () => {
        cy.get('svg[data-testid=EditIcon]').eq(0).click()
        cy.contains('Edit Entry')
        cy.get('#adventures').click()
        cy.get('li[role=option]').eq(1).click()
        cy.get('#location').clear().type('Other test location')
        cy.get('#length').clear().type('1')
        cy.get('#levels').clear().type('2')
        cy.get('#gp').clear().type('21')
        cy.get('#dungeon_master').clear().type('Other Test DM')
        cy.get('#notes').type('. More notes.')

        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit Entry').should('not.exist')
    })

    it('Delete Character Entry', () => {
        let number_of_remaining_items = 0
        cy.get('p[class^="MuiTablePagination-displayedRows"]')
            .invoke('text')
            .then((text) => {
                number_of_remaining_items = parseInt(text.split(' ').pop()) - 1
            })
            .then(() => {
                cy.get('svg[data-testid=DeleteIcon]').eq(0).click()
                cy.contains('button', 'Delete').click()
                cy.contains(`of ${number_of_remaining_items}`)
            })
    })
})
