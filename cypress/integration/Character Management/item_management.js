describe('Manage Items Test Suite', () => {
    const new_item_name = 'NewItemName'
    const newer_item_name = 'NewerItemName'
    let last_url = ''

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

    it('Item Index', () => {
        cy.intercept('GET', `${Cypress.Laravel.route('item.index')}*`).as('item')
        cy.get(
            `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
                'character.index',
            )}/"]`,
        )
            .eq(1)
            .click()
        cy.contains('button', 'Items').click()
        cy.wait('@item')
        cy.contains('Search Items')
        cy.contains('Rarity')
        cy.contains('Tier')
        cy.contains('Rows per page:')
        cy.get(
            `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
                'item.index',
            )}/"]`,
        )
    })

    it('Item Delete', () => {
        let number_of_remaining_items = 0
        cy.get('p[class^="MuiTablePagination-displayedRows"]')
            .invoke('text')
            .then((text) => {
                number_of_remaining_items = parseInt(text.split(' ').pop()) - 1
            })
            .then(() => {
                cy.get('svg[data-testid=delete-action]').eq(0).click()
                cy.contains('button', 'Delete').click()
                cy.contains(`of ${number_of_remaining_items}`)
            })
    })

    it('Item Edit Drawer', () => {
        cy.get('svg[data-testid=EditIcon]').eq(0).click()
        cy.contains('Edit Item')
        cy.get('#name').clear().type(new_item_name)
        cy.get('#rarity').click()
        cy.contains('li', 'Very Rare').click()
        cy.get('#tier').click()
        cy.contains('li', '1').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit Item').should('not.exist')
        cy.contains(new_item_name)
    })

    it('Item Detail', () => {
        cy.contains('a', new_item_name).click()
        cy.get(
            `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
                'character.index',
            )}/"]`,
        )
        cy.contains('p', '>')
    })

    it('Item Detail Edit Drawer', () => {
        cy.contains('button', 'UPDATE').click()
        cy.contains('Edit Item')
        cy.get('#name').clear().type(newer_item_name)
        cy.get('#rarity').click()
        cy.contains('li', 'Very Rare').click()
        cy.get('#tier').click()
        cy.contains('li', '1').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit Item').should('not.exist')
        cy.contains(newer_item_name)
    })
})
