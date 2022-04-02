describe('Campaign Enrollment Test Suite', () => {
    let campaign_title
    let code
    let campaign_exploration_link
    let campaign_exploration_id
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

    it('Kick User from Campaign', () => {
        cy.login({id: 1})

        cy.intercept(
            'GET',
            Cypress.Laravel.route('campaign.show').replace('{campaign}', campaign_exploration_id),
        ).as('getPublicCampaign')
        cy.visit(campaign_exploration_link, {id: campaign_exploration_id})
        cy.wait('@getPublicCampaign')

        cy.contains('button', 'Kick').click()
        cy.get('[type="checkbox"]').first().check()

        cy.contains('button', 'Submit').click()
        cy.get('[data-cy="campaign_invite_code"]')
            .first()
            .each(($el) => {
                expect($el.text()).to.not.equal(code)
            })
    })
})
