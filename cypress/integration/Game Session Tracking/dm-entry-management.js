describe('Item Entry Management Test Suite', () => {
    const new_item_name = 'NewItemName'
    const newer_item_name = 'NewerItemName'

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        cy.seederLogin()
        cy.intercept('GET', Cypress.Laravel.route('character.index')).as('character')
        cy.visit(Cypress.Laravel.route('character.index'))
        cy.wait('@character')

        cy.intercept('GET', Cypress.Laravel.route('dm-entry.index')).as('dm_entry')
        cy.contains('button', 'DM Entry').click()
        cy.wait('@dm_entry')

        cy.get('[data-testid="PersonIcon"]').click()
        cy.contains('button', 'Logout').click()
    })

    beforeEach(() => {
        cy.seederLogin()
        cy.intercept('GET', Cypress.Laravel.route('dm-entry.index')).as('dm_entry')
        cy.visit(Cypress.Laravel.route('dm-entry.index'))
        cy.wait('@dm_entry')
    })

    it('List DM Entries', () => {
        cy.contains('DM Entries')
        cy.contains('Adventure Title')
        cy.contains('Session')
        cy.contains('Character')
        cy.contains('Reward')
        cy.contains('Magic Items')
        cy.get('input[type=checkbox]')
    })

    it('Create Empty DM Entry', () => {
        cy.intercept('GET', Cypress.Laravel.route('dm-entry.create')).as(
            'dm_entry_create',
        )
        cy.contains('button', 'Create').click()
        cy.wait('@dm_entry_create')
        cy.get('#adventures').click()
        cy.get('li[role=option]').eq(0).click()
        cy.get('#location').type('Test Location')
        cy.get('#notes').type('Some notes')
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Create').click()
        cy.contains('Unassigned')
    })

    it('Edit Empty DM Entry', () => {
        cy.get('svg[data-testid=EditIcon]').eq(0).click()
        cy.contains('Edit DM Entry')
        cy.get('#length').clear().type('3')
        cy.get('#levels').clear().type('3')
        cy.get('#gp').clear().type('3')
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit DM Entry').should('not.exist')
    })

    it('Create Advancement DM Entry', () => {
        cy.intercept('GET', Cypress.Laravel.route('dm-entry.create')).as(
            'dm_entry_create',
        )
        cy.contains('button', 'Create').click()
        cy.wait('@dm_entry_create')
        cy.get('#adventures').click()
        cy.get('li[role=option]').eq(0).click()
        cy.get('#choice').click()
        cy.contains('li', 'Advancement').click()
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Create').click()
        cy.contains('Unassigned')
    })

    it('Create Magic Item DM Entry', () => {
        cy.intercept('GET', Cypress.Laravel.route('dm-entry.create')).as(
            'dm_entry_create',
        )
        cy.contains('button', 'Create').click()
        cy.wait('@dm_entry_create')
        cy.get('#adventures').click()
        cy.get('li[role=option]').eq(0).click()
        cy.get('#choice').click()
        cy.contains('li', 'Magic Item').click()
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
        cy.contains('button', 'Create').click()
        cy.contains('Unassigned')
    })

    it('Attach Campaign Reward DM Entry', () => {
        cy.get('svg[data-testid=EditIcon]').eq(0).click()
        cy.contains('Edit DM Entry')
        cy.get('#choice').click()
        cy.contains('li', 'Campaign Reward').click()
        cy.get('#character_id').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit DM Entry').should('not.exist')
    })

    it('Attach Advancement DM Entry', () => {
        cy.get('svg[data-testid=EditIcon]').eq(1).click()
        cy.contains('Edit DM Entry')
        cy.get('#choice').click()
        cy.contains('li', 'Advancement').click()
        cy.get('#character_id').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit DM Entry').should('not.exist')
    })

    it('Attach Item DM Entry', () => {
        cy.get('svg[data-testid=EditIcon]').eq(2).click()
        cy.contains('Edit DM Entry')
        cy.get('#choice').click()
        cy.contains('li', 'Magic Item').click()
        cy.get('#character_id').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Continue').click()
        cy.contains('button', 'Save').click()
        cy.contains('Edit DM Entry').should('not.exist')
    })

    it('Delete DM Entry', () => {
        let number_of_remaining_dm_entries = 0
        cy.get('p[class^="MuiTablePagination-displayedRows"]')
            .invoke('text')
            .then((text) => {
                number_of_remaining_dm_entries = parseInt(text.split(' ').pop()) - 1
            })
            .then(() => {
                cy.get('svg[data-testid=DeleteIcon]').eq(0).click()
                cy.contains('button', 'Delete').click()
                cy.contains(`of ${number_of_remaining_dm_entries}`)
            })
    })
})
