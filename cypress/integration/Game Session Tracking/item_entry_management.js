describe('Item Entry Management Test Suite', () => {
    let last_url = ''
    let number_of_entries = 0
    const new_item_name = 'NewItemName'
    const newer_item_name = 'NewerItemName'

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

    it('Create Item Entry', () => {
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
                cy.get('#dungeon_master').click()
                cy.get('li[role=option]').eq(0).click()
                cy.contains('button', 'Continue').click()

                cy.contains('button', 'Continue').click()

                cy.contains('button', 'Add Item').click()
                cy.get('#name').type(new_item_name)
                cy.get('#rarity').click()
                cy.contains('li', 'Very Rare').click()
                cy.get('#tier').click()
                cy.contains('li', '1').click()
                cy.get('#description').type('Some Description')

                cy.contains('button', 'Add Item').click()
                cy.get('input[name="Item name"]').eq(1).type(newer_item_name)
                cy.get('div[aria-labelledby="rarity-label rarity"').eq(1).click()
                cy.contains('li', 'Rare').click()
                cy.get('div[aria-labelledby="tier-label tier"').eq(1).click()
                cy.contains('li', '2').click()
                cy.get('textarea[name=Description]').eq(1).type('Some other description')

                cy.contains('button', 'Add Item').click()
                cy.get('svg[data-testid="ClearIcon"]').eq(2).click()

                cy.contains('button', 'Create').click()
                cy.contains(`of ${number_of_entries}`)
            })
        cy.contains(`${new_item_name}, ${newer_item_name}`)
    })

    it('Edit Item Entry', () => {
        cy.get('svg[data-testid=EditIcon]').eq(0).click()
        cy.contains('Edit Entry')
        cy.contains('button', 'Continue').click()
        cy.get('svg[data-testid="ClearIcon"]').eq(0).click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit Entry').should('not.exist')
        cy.contains(newer_item_name)
        cy.contains(new_item_name).should('not.exist')
    })

    it('Delete Item Entry', () => {
        cy.intercept('GET', `${Cypress.Laravel.route('item.index')}*`).as('item')
        cy.contains('button', 'ITEMS').click()
        cy.wait('@item')
        cy.contains(newer_item_name)

        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
        cy.get('svg[data-testid=DeleteIcon]').eq(0).click()
        cy.contains('button', 'Delete').click()

        cy.contains('button', 'ITEMS').click()
        cy.wait('@item')
        cy.contains(newer_item_name).should('not.exist')
    })
})
