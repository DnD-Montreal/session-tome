describe('User Rating Reports Test Suite', () => {
    let last_url = ''
    let download_folder = ''

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = `${Cypress.config('baseUrl')}/admin/dashboard/`
        download_folder = Cypress.config('downloadsFolder')
    })

    beforeEach(() => {
        cy.seederLogin()
        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
    })

    it('Game Masters Report', () => {
        cy.contains('Users').click()
        cy.get('table[id="crudTable"]')

        cy.window()
            .document()
            .then((doc) => {
                doc.addEventListener('click', () => {
                    setTimeout(() => {
                        doc.location.reload()
                    }, 1000)
                })
                cy.contains('a', 'Rating Report').click()
            })

        cy.task('list_downloaded_files', download_folder).then((downloaded_files) => {
            expect(downloaded_files.join('')).to.include('rating-report.csv')
        })
    })

    it('League Rating Report', () => {
        cy.contains('Leagues').click()
        cy.get('table[id="crudTable"]')

        cy.window()
            .document()
            .then((doc) => {
                doc.addEventListener('click', () => {
                    setTimeout(() => {
                        doc.location.reload()
                    }, 1000)
                })
                cy.contains('a', 'League Rating Report').click()
            })

        cy.task('list_downloaded_files', download_folder).then((downloaded_files) => {
            expect(downloaded_files.join('')).to.include('league-rating-report.csv')
        })
    })
})
