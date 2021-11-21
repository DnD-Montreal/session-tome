describe('Character Management Test Suite', () => {
    const characterOwner = 'testuser'
    const characterExplorer = 'testexplorer'
    const character_name = 'John'
    const character_race = 'Smith'
    const character_class = 'Upper'
    const character_faction = 'Five'
    const character_level = 5
    const character_downtime = 30
    const public_character_status = 'public'
    let character_exploration_link
    let character_exploration_id

    before(() => {
        cy.refreshDatabase()
    })

    it('Create Public Character', () => {
        cy.login({name: characterOwner})
        cy.csrfToken().then((token) =>
            cy.request('POST', Cypress.Laravel.route('character.store'), {
                name: character_name,
                race: character_race,
                class: character_class,
                level: character_level,
                faction: character_faction,
                downtime: character_downtime,
                status: public_character_status,
                _token: token,
            }),
        )
        cy.intercept('GET', Cypress.Laravel.route('character.index')).as('character')
        cy.visit(Cypress.Laravel.route('character.index'))
        cy.wait('@character')
        cy.get('a')
            .contains(character_name)
            .invoke('attr', 'href')
            .then((href) => {
                character_exploration_link = href
                const parts = character_exploration_link.split('/')
                character_exploration_id = parts[parts.length - 1]
            })
    })

    it('Explore Public Character', () => {
        cy.login({name: characterExplorer})
        cy.intercept(
            'GET',
            Cypress.Laravel.route('character.show').replace(
                '{character}',
                character_exploration_id,
            ),
        ).as('getPublicCharacter')
        cy.visit(character_exploration_link, {id: character_exploration_id})
        cy.wait('@getPublicCharacter')
    })

    it('Change Character Privacy', () => {
        cy.login({name: characterOwner})
        cy.intercept(
            'GET',
            Cypress.Laravel.route('character.show').replace(
                '{character}',
                character_exploration_id,
            ),
        ).as('getPublicCharacter')
        cy.visit(character_exploration_link, {id: character_exploration_id})
        cy.wait('@getPublicCharacter')
        cy.contains('button', 'UPDATE').click()
        cy.contains('button', 'Continue').click()
        cy.get('#status').uncheck()
        cy.contains('button', 'Save').click()
        cy.wait('@getPublicCharacter')
    })

    it('Explore Private Character', () => {
        cy.login({name: characterExplorer})
        cy.request({
            method: 'GET',
            url: Cypress.Laravel.route('character.show').replace(
                '{character}',
                character_exploration_id,
            ),
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(403)
        })
    })
})
