describe('Manage Items Test Suite', () => {
    const testusername = 'Test account'
    const testuser_email = 'default@test.com'
    const testuser_password = 'password'
    const new_item_name = 'NewItemName'

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        cy.intercept('GET', '/').as('landingpage')
        cy.intercept('POST', '/login').as('login')
        cy.visit('/')
        cy.wait('@landingpage')
        cy.get('[data-testid="PersonIcon"]').click()
        cy.contains('button', 'Login').click()
        cy.get('#email').type(testuser_email)
        cy.get('#password').clear().type(testuser_password)
        cy.get('button[type="submit"]').click()
        cy.wait('@login')
        cy.get('[data-cy="user"]').should('contain', testusername)
        cy.intercept('GET', Cypress.Laravel.route('character.index')).as('character')
        cy.visit(Cypress.Laravel.route('character.index'))
        cy.wait('@character')
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
        cy.contains('button', 'ITEMS').click()
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
        cy.get('p[class^=MuiTablePagination-displayedRows]')
            .invoke('text')
            .then((text) => {
                number_of_remaining_items = parseInt(text.split(' ').pop()) - 1
            })
        cy.get('svg[data-testid=delete-action]').eq(0).click()
        cy.contains('button', 'Delete').click()
        cy.get(`of ${number_of_remaining_items}`)
    })

    it('Item Edit Drawer', () => {
        cy.get('svg[data-testid=EditIcon]').eq(0).click()
        cy.contains('Edit Item')
        cy.get('#name').clear().type(new_item_name)
        cy.get('#rarity').click()
        cy.contains('li', 'Very Rare').click()
        cy.get('#tier').clear().type('1')
        cy.contains('button', 'Save').click()
        cy.contains(new_item_name)
    })

    it('Item Detail', () => {
        cy.get('a', new_item_name).click()
        cy.get(
            `a[href^="${Cypress.config('baseUrl')}/${Cypress.Laravel.route(
                'character.index',
            )}/"]`,
        )
        cy.get('//p[text()[contains(.,">")]]')
    })

    it('Item Detail Edit Drawer', () => {
        cy.get('button', 'UPDATE').click()
        cy.get('#name').clear().type(new_item_name)
        cy.get('#rarity').click()
        cy.contains('li', 'Very Rare').click()
        cy.get('#tier').clear().type('1')
        cy.contains('button', 'Save').click()
    })
})
