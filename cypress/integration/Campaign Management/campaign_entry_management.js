describe('Campaign Entry Management Test Suite', () => {
    let last_url = ''
    const campaignOwner = 'testuser'

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
        last_url = Cypress.Laravel.route('campaign.show')
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

    it('Create Campaign', () => {
        cy.login({name: campaignOwner})
        cy.intercept('GET', Cypress.Laravel.route('campaign.create')).as('campaign_create')
        cy.contains('button', 'Create').click()
        cy.wait('@campaign_create')
        cy.get('#title').type('Test Title')
        cy.get('#character_id').click()
        cy.get('li[role=option]').eq(0).click()
        cy.get('#adventures').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Create').click()

        cy.intercept('GET', Cypress.Laravel.route('campaign.index')).as('campaign')
        cy.visit(Cypress.Laravel.route('campaign.index'))
    })
})
