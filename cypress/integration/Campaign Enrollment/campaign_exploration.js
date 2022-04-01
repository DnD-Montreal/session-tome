describe('Campaign Enrollment Test Suite', () => {
    const campaignOwner = 'testuser'
    const campaign_title = 'Campaign test 1'
    const adventure_id = 6
    const character_id = 44
    let code
    let campaign_exploration_link
    let campaign_exploration_id
    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    it('Join Campaign', () => {
        cy.login({name: campaignOwner})
        cy.csrfToken().then((token) =>
            cy.request('POST', Cypress.Laravel.route('campaign.store'), {
                title: campaign_title,
                adventure_id,
                character_id,
                _token: token,
            }),
        )
        cy.intercept('GET', Cypress.Laravel.route('campaign.index')).as('campaign')
        cy.visit(Cypress.Laravel.route('campaign.index'))
        cy.wait('@campaign')
        cy.get('a')
            .contains(campaign_title)
            .invoke('attr', 'href')
            .then((href) => {
                campaign_exploration_link = href
                const parts = campaign_exploration_link.split('/')
                campaign_exploration_id = parts[parts.length - 1]
            })

        cy.get('tr td:nth-child(3)')
            .each(($el) => {
                code = $el.text()
                $el.click()
            })
            .then(() => {
                cy.login({id: 2})
                cy.intercept('GET', Cypress.Laravel.route('campaign.index')).as('campaign2')
                cy.visit(Cypress.Laravel.route('campaign.index'))
                cy.wait('@campaign2')

                cy.contains('button', 'Join').click()
                cy.get('#invite-code').type(code)
                cy.get('button:contains("Join")').eq(1).click()
                cy.contains('div', 'Assigned Character').click()
                cy.get('ul>li').eq(1).click()
                cy.contains('button', 'Join').click()
                cy.get('tr td:nth-child(1)').each(($el) => {
                    expect($el.text()).to.contains(campaign_title)
                })
            })
    })

    it('Kick user from Campaign', () => {
        cy.login({name: campaignOwner})

        cy.intercept(
            'GET',
            Cypress.Laravel.route('campaign.show').replace('{campaign}', campaign_exploration_id),
        ).as('getPublicCampaign')
        cy.visit(campaign_exploration_link, {id: campaign_exploration_id})
        cy.wait('@getPublicCampaign')

        cy.contains('button', 'Kick').click()
        cy.get('[type="checkbox"]').eq(0).check()
        cy.contains('button', 'Submit').click()
        cy.get('tr td:nth-child(3)').each(($el) => {
            expect($el.text()).to.not.equal(code)
        })
    })
})
