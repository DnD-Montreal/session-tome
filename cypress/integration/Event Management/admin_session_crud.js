describe('Admin Session CRUD Test Suite', () => {
    let last_url = ''

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = `${Cypress.config('baseUrl')}/admin/dashboard/`
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

    it('Session Index', () => {
        cy.contains('Sessions').click()
        cy.get('table[id="crudTable"]')
    })

    it('Session Creation', () => {
        cy.get(`a[href="${Cypress.config('baseUrl')}/admin/session/create"]`).click()
        cy.get('span[aria-labelledby^="select2-dungeonMaster"]').click()
        cy.get('li[role=option]').eq(1).click()
        cy.get('input[name=table]').type('1')
        cy.get('input[name=start_time]').type('2021-01-01T12:00')
        cy.get('button[type="submit"]').click()
    })
})
