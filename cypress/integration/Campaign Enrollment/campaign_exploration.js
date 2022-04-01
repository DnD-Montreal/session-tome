describe('Campaign Enrollment Test Suite', () => {
    const campaignOwner = 'testuser'
    const campaign_title = 'Campaign test 1'
    const adventure_id = 6
    const character_id = 44
    let code
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
})
