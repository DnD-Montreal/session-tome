describe('Admin Event CRUD Test Suite', () => {
    const admin_base = `${Cypress.config('baseUrl')}/admin`
    const event_suffix = 'event'
    const event_title = 'Test Event'
    const event_edited_title = 'Test Edited Event'
    const event_location = 'Cypress Town'
    const event_edited_location = 'Cypress Town Edited'
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
        cy.get(`a[href="${admin_base}/${event_suffix}/create"]`).click()
        cy.get('input[name="title"]').type(event_title)
        cy.get('textarea[name="description"]').type(event_title)
        cy.get('input[name="location"]').type(event_location)
        cy.get('button[type="submit"]').click()
        cy.contains(event_title)
    })

    it('Event Delete', () => {
        let number_of_remaining_items = 0
        cy.get('div[id="crudTable_info"]')
            .invoke('text')
            .then((text) => {
                const splitText = text.split(' ')
                number_of_remaining_items = parseInt(splitText[5]) - 1
            })
            .then(() => {
                cy.get('a[data-button-type="delete"]').eq(0).click()
            })
            .then(() => {
                cy.get(
                    'button[class="swal-button swal-button--confirm swal-button--danger"]',
                ).click()
            })
            .then(() => {
                cy.contains(`of ${number_of_remaining_items}`)
            })
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
