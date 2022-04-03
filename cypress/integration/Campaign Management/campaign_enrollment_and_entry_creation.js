describe('Campaign Enrollment and Entry Creation Test Suite', () => {
    let campaign_title
    let code
    let campaign_exploration_link
    let campaign_exploration_id
    const levelup = 2

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    it('Join Campaign', () => {
        cy.login({id: 1})
        cy.intercept('GET', Cypress.Laravel.route('campaign.index')).as('campaign')
        cy.visit(Cypress.Laravel.route('campaign.index'))
        cy.wait('@campaign')

        cy.get('[data-cy="campaign_title"]')
            .eq(0)
            .each(($el) => {
                campaign_title = $el.text()
            })
            .then(() => {
                cy.get('a')
                    .contains(campaign_title)
                    .invoke('attr', 'href')
                    .then((href) => {
                        campaign_exploration_link = href
                        const parts = campaign_exploration_link.split('/')
                        campaign_exploration_id = parts[parts.length - 1]
                    })
                    .then(() => {
                        cy.get('[data-cy="campaign_invite_code"]')
                            .eq(0)
                            .each(($el) => {
                                code = $el.text()
                            })
                            .then(() => {
                                cy.login({id: 2})
                                cy.visit(Cypress.Laravel.route('campaign.index'))
                                cy.wait('@campaign')

                                cy.contains('button', 'Join').click()
                                cy.get('#invite-code').type(code)
                                cy.get('button:contains("Join")').eq(1).click()
                                cy.contains('div', 'Assigned Character').click()
                                cy.get('ul>li').eq(1).click()
                                cy.contains('button', 'Join').click()
                                cy.contains(campaign_title)
                            })
                    })
            })
    })

    it('Create Campaign Entry', () => {
        cy.login({id: 2})

        cy.intercept('GET', campaign_exploration_link).as('campaign_detail')
        cy.visit(campaign_exploration_link)
        cy.wait('@campaign_detail')

        cy.contains('button', 'Entry')
            .click()
            .then(() => {
                cy.get('#levels').clear().type(levelup)
                cy.contains('button', 'Continue').click()
                cy.contains('button', 'Create').click()
                cy.url().should('include', campaign_exploration_id)
            })
            .then(() => {
                cy.login({id: 1})

                cy.visit(campaign_exploration_link)
                cy.wait('@campaign_detail')
                cy.contains('Entries')
                cy.get('[data-cy="levels"]').contains(levelup)
            })
    })

    it('Kick User from Campaign', () => {
        cy.login({id: 1})

        cy.intercept(
            'GET',
            Cypress.Laravel.route('campaign.show').replace('{campaign}', campaign_exploration_id),
        ).as('getPublicCampaign')
        cy.visit(campaign_exploration_link, {id: campaign_exploration_id})
        cy.wait('@getPublicCampaign')

        cy.contains('button', 'Kick').click()
        cy.get('[data-cy="campaign_member"]>input').first().check()

        cy.contains('button', 'Submit').click()
        cy.get('[data-cy="campaign_invite_code"]')
            .first()
            .each(($el) => {
                expect($el.text()).to.not.equal(code)
            })
    })
})
