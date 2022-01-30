describe('Admin Event CRUD Test Suite', () => {
    const admin_base = `${Cypress.config('baseUrl')}/admin`
    const event_suffix = 'events'
    let last_url = ''

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = `${admin_base}/dashboard/`
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

    it('Event Index', () => {
        cy.contains('Events').click()
        cy.get('table[id="crudTable"]')
    })

    it('Event Creation', () => {
        cy.get(`a[href="${admin_base}/${event_suffix}/create/"]`)
    })

    // it('Event Delete', () => {
    //     let number_of_remaining_items = 0
    //     cy.get('p[class^="MuiTablePagination-displayedRows"]')
    //         .invoke('text')
    //         .then((text) => {
    //             number_of_remaining_items = parseInt(text.split(' ').pop()) - 1
    //         })
    //         .then(() => {
    //             cy.get('svg[data-testid=delete-action]').eq(0).click()
    //             cy.contains('button', 'Delete').click()
    //             cy.contains(`of ${number_of_remaining_items}`)
    //         })
    // })

    // it('Event Edit', () => {
    //     cy.get('svg[data-testid=EditIcon]').eq(0).click()
    //     cy.contains('Edit Item')
    //     cy.get('#name').clear().type(new_item_name)
    //     cy.get('#rarity').click()
    //     cy.contains('li', 'Very Rare').click()
    //     cy.get('#tier').click()
    //     cy.contains('li', '1').click()
    //     cy.contains('button', 'Save').click()
    //     cy.contains('Edit Item').should('not.exist')
    //     cy.contains(new_item_name)
    // })

    // it('Event Detail', () => {
    //     cy.contains('a', new_item_name).click()
    //     cy.get(
    //         `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
    //             'character.index',
    //         )}/"]`,
    //     )
    //     cy.contains('p', '>')
    // })
})
