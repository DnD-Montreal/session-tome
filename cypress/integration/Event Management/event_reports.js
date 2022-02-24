describe('Event Reports Test Suite', () => {
    let last_url = ''
    let download_folder = ''

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = `${Cypress.config('baseUrl')}/admin/dashboard/`

        cy.seederLogin()
        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
        download_folder = Cypress.config('downloadsFolder')
    })

    it('Event Report', () => {
        cy.contains('Events').click()
        cy.get('table[id="crudTable"]')

        cy.window()
            .document()
            .then((doc) => {
                doc.addEventListener('click', () => {
                    setTimeout(() => {
                        doc.location.reload()
                    }, 1000)
                })
                cy.contains('a', 'Generate Report').eq(0).click()
            })

        cy.task('list_downloaded_files', download_folder).then((downloaded_files) => {
            expect(downloaded_files.join('')).to.include('event-report.csv')
        })
    })
})
