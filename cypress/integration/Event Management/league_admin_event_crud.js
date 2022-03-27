describe('League Admin Event CRUD Test Suite', () => {
    const event_title = 'Test Event'
    const event_edited_title = 'Test Edited Event'
    const event_location = 'Cypress Town'
    const event_edited_location = 'Cypress Town Edited'
    let last_url = ''

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = `${Cypress.config('baseUrl')}/admin/dashboard/`
    })

    beforeEach(() => {
        cy.seederLoginLeagueAdmin()
        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
    })

    it('Event Index', () => {
        cy.contains('Events').click()
        cy.get('table[id="crudTable"]')
        last_url = `${Cypress.config('baseUrl')}/admin/event/`
    })

    it('Event Creation', () => {
        cy.get(`a[href="${Cypress.config('baseUrl')}/admin/event/create"]`).click()
        cy.get('input[name="title"]').type(event_title)
        cy.get('textarea[name="description"]').type(event_title)
        cy.get('input[name="location"]').type(event_location)
        cy.get('button[type="submit"]').click()
        cy.contains(event_title)
    })

    it('Event Delete', () => {
        cy.get('a[data-button-type="delete"]').eq(0).click()
        cy.contains('Item Deleted')
    })

    it('Event Edit', () => {
        cy.get('i[class="la la-edit"]').eq(0).parent().click()
        cy.get('input[name="title"]').clear().type(event_edited_title)
        cy.get('textarea[name="description"]').clear().type(event_edited_title)
        cy.get('input[name="location"]').clear().type(event_edited_location)
        cy.get('button[type="submit"]').click()
        cy.contains(event_edited_title)
    })

    it('Event Detail', () => {
        cy.get('i[class="la la-eye"]').eq(0).parent().click()
        cy.contains('Description:')
        cy.contains('Location:')
        cy.contains('Title:')
    })
})
