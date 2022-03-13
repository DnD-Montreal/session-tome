describe('Campaign Enrollment Test Suite', () => {
    const campaignOwner = 'testuser'
    const campaignJoiner = 'testjoiner'
    const campaign_code = ''

    before(() => {
        cy.refreshDatabase()
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
        cy.get('simple table')
            .closest('tr')
            .find('td')
            .eq(4)
            .then((text) => {
                this.campaign_code = text
            })
    })

    it('Join Campaign', () => {
        cy.login({name: campaignJoiner})
        cy.intercept('GET', Cypress.Laravel.route('campaign.index')).as('campaign')
        cy.visit(Cypress.Laravel.route('campaign.index'))
        cy.wait('@campaign')
        cy.contains('button', 'Join').click()
        cy.get('#invite-code').clear().type(campaign_code)
        cy.contains('button', 'Join').click()
        cy.get('#character_id').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Join').click()
        cy.url().should('include', Cypress.Laravel.route('campaign.index'))
        cy.contains('1-1 of 1')
    })
})
