describe('Player Event Registration Test Suite', () => {
    let last_url = ''
    let event_id = 0
    let registered_event_count = 0

    before(() => {
        cy.refreshDatabase()
        cy.seed('FastSeeder')
    })

    beforeEach(() => {
        cy.seederLogin()
        cy.intercept('GET', last_url).as('last_url')
        cy.visit(last_url)
        cy.wait('@last_url')
    })

    it('Event Tab Button', () => {
        cy.intercept('GET', Cypress.Laravel.route('event.index')).as('event_index')
        cy.contains('a', 'Events').click()
        cy.wait('@event_index')
        last_url = Cypress.Laravel.route('event.index')
    })

    it('Event Index', () => {
        cy.contains('div', 'Events')
        cy.contains('Event Title')
        cy.contains('Description')
        cy.contains('Actions')
        cy.contains('Rows per page:')
    })

    it('Event Filter', () => {
        cy.intercept('GET', '**event*').as('event_filter')
        cy.contains('Registered Events').click()
        cy.wait('@event_filter')
        cy.url().should('include', '?registered_only=1')

        cy.contains('Registered Events').click()
        cy.wait('@event_filter')
        cy.url().should('include', '?registered_only=0')
    })

    it('Event Detail', () => {
        cy.get('svg[data-testid="LogoutIcon"]')
            .eq(0)
            .parent()
            .parent()
            .invoke('attr', 'href')
            .then((href) => {
                event_id = parseInt(href.split('/').pop())
            })
            .then(() => {
                cy.intercept(
                    'GET',
                    Cypress.Laravel.route('event.show').replace('{event}', event_id),
                ).as('event_detail')
                cy.get('svg[data-testid="LogoutIcon"]').eq(0).click()
                cy.wait('@event_detail')

                cy.contains('Event Title')
                cy.contains('Start Date')
                cy.contains('End Date')
                cy.contains('Location')
                cy.contains('Total Spots')

                cy.contains('div', 'Sessions')
                cy.contains('Adventure Title')
                cy.contains('Game Master')
                cy.contains('Seats Taken')
                cy.contains('Seats Left')
                cy.contains('Actions')
                cy.contains('Rows per page:')
            })
    })

    it('Session Register', () => {
        cy.intercept('GET', Cypress.Laravel.route('event.show').replace('{event}', event_id)).as(
            'event_detail',
        )
        cy.visit(Cypress.Laravel.route('event.show').replace('{event}', event_id))
        cy.wait('@event_detail')

        cy.intercept('POST', Cypress.Laravel.route('registration.store')).as('register')

        registered_event_count = cy.get('body').find('button>span').length ?? 0 + 1
        cy.contains('button', 'Register').eq(0).click()
        cy.get('#character_id').click()
        cy.get('li[role=option]').eq(0).click()
        cy.contains('button', 'Join').click()
        cy.wait('@register').its('response.statusCode').should('eq', 302)
        cy.contains('button', 'Leave').its('length').should('eq', registered_event_count)
    })

    it('Session Filter', () => {
        cy.intercept('GET', Cypress.Laravel.route('event.show').replace('{event}', event_id)).as(
            'event_detail',
        )
        cy.visit(Cypress.Laravel.route('event.show').replace('{event}', event_id))
        cy.wait('@event_detail')

        cy.intercept('GET', `event/${event_id}*`).as('session_filter')
        cy.contains('Registered Sessions').click()
        cy.wait('@session_filter')
        cy.url().should('include', '?registered_sessions=1')

        cy.contains('Registered Sessions').click()
        cy.wait('@session_filter')
        cy.url().should('include', '?registered_sessions=0')
    })

    it('Session Leave', () => {
        cy.intercept('GET', Cypress.Laravel.route('event.show').replace('{event}', event_id)).as(
            'event_detail',
        )
        cy.visit(Cypress.Laravel.route('event.show').replace('{event}', event_id))
        cy.wait('@event_detail')

        cy.intercept('DELETE', '**registration*').as('register')

        registered_event_count -= 1
        cy.contains('button', 'Leave').eq(0).click()
        cy.get('[data-cy=default-registration-modal-option]').click()
        cy.wait('@register').its('response.statusCode').should('eq', 200)
        cy.wait('@event_detail')
        cy.contains('button', 'Leave').its('length').should('eq', registered_event_count)
    })
})
