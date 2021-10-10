const Ziggy = {
    url: 'http://localhost',
    port: null,
    defaults: {},
    routes: {
        'cypress.factory': {uri: '__cypress__/factory', methods: ['POST']},
        'cypress.login': {uri: '__cypress__/login', methods: ['POST']},
        'cypress.logout': {uri: '__cypress__/logout', methods: ['POST']},
        'cypress.artisan': {uri: '__cypress__/artisan', methods: ['POST']},
        'cypress.run-php': {uri: '__cypress__/run-php', methods: ['POST']},
        'cypress.csrf-token': {
            uri: '__cypress__/csrf_token',
            methods: ['GET', 'HEAD'],
        },
        'cypress.routes': {uri: '__cypress__/routes', methods: ['POST']},
        register: {uri: 'register', methods: ['GET', 'HEAD']},
        login: {uri: 'login', methods: ['GET', 'HEAD']},
        'password.request': {uri: 'forgot-password', methods: ['GET', 'HEAD']},
        'password.email': {uri: 'forgot-password', methods: ['POST']},
        'password.reset': {
            uri: 'reset-password/{token}',
            methods: ['GET', 'HEAD'],
        },
        'password.update': {uri: 'reset-password', methods: ['POST']},
        'verification.notice': {uri: 'verify-email', methods: ['GET', 'HEAD']},
        'verification.verify': {
            uri: 'verify-email/{id}/{hash}',
            methods: ['GET', 'HEAD'],
        },
        'verification.send': {
            uri: 'email/verification-notification',
            methods: ['POST'],
        },
        'password.confirm': {uri: 'confirm-password', methods: ['GET', 'HEAD']},
        logout: {uri: 'logout', methods: ['POST']},
        dashboard: {uri: 'dashboard', methods: ['GET', 'HEAD']},
        'user.index': {uri: 'user', methods: ['GET', 'HEAD']},
        'user.create': {uri: 'user/create', methods: ['GET', 'HEAD']},
        'user.store': {uri: 'user', methods: ['POST']},
        'user.show': {
            uri: 'user/{user}',
            methods: ['GET', 'HEAD'],
            bindings: {user: 'id'},
        },
        'user.edit': {
            uri: 'user/{user}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {user: 'id'},
        },
        'user.update': {
            uri: 'user/{user}',
            methods: ['PUT', 'PATCH'],
            bindings: {user: 'id'},
        },
        'user.destroy': {
            uri: 'user/{user}',
            methods: ['DELETE'],
            bindings: {user: 'id'},
        },
        'rating.index': {uri: 'rating', methods: ['GET', 'HEAD']},
        'rating.create': {uri: 'rating/create', methods: ['GET', 'HEAD']},
        'rating.store': {uri: 'rating', methods: ['POST']},
        'rating.show': {
            uri: 'rating/{rating}',
            methods: ['GET', 'HEAD'],
            bindings: {rating: 'id'},
        },
        'rating.edit': {
            uri: 'rating/{rating}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {rating: 'id'},
        },
        'rating.update': {
            uri: 'rating/{rating}',
            methods: ['PUT', 'PATCH'],
            bindings: {rating: 'id'},
        },
        'rating.destroy': {
            uri: 'rating/{rating}',
            methods: ['DELETE'],
            bindings: {rating: 'id'},
        },
        'adventure.index': {uri: 'adventure', methods: ['GET', 'HEAD']},
        'adventure.create': {uri: 'adventure/create', methods: ['GET', 'HEAD']},
        'adventure.store': {uri: 'adventure', methods: ['POST']},
        'adventure.show': {
            uri: 'adventure/{adventure}',
            methods: ['GET', 'HEAD'],
            bindings: {adventure: 'id'},
        },
        'adventure.edit': {
            uri: 'adventure/{adventure}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {adventure: 'id'},
        },
        'adventure.update': {
            uri: 'adventure/{adventure}',
            methods: ['PUT', 'PATCH'],
            bindings: {adventure: 'id'},
        },
        'adventure.destroy': {
            uri: 'adventure/{adventure}',
            methods: ['DELETE'],
            bindings: {adventure: 'id'},
        },
        'entry.index': {uri: 'entry', methods: ['GET', 'HEAD']},
        'entry.create': {uri: 'entry/create', methods: ['GET', 'HEAD']},
        'entry.store': {uri: 'entry', methods: ['POST']},
        'entry.show': {
            uri: 'entry/{entry}',
            methods: ['GET', 'HEAD'],
            bindings: {entry: 'id'},
        },
        'entry.edit': {
            uri: 'entry/{entry}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {entry: 'id'},
        },
        'entry.update': {
            uri: 'entry/{entry}',
            methods: ['PUT', 'PATCH'],
            bindings: {entry: 'id'},
        },
        'entry.destroy': {
            uri: 'entry/{entry}',
            methods: ['DELETE'],
            bindings: {entry: 'id'},
        },
        'character.index': {uri: 'character', methods: ['GET', 'HEAD']},
        'character.create': {uri: 'character/create', methods: ['GET', 'HEAD']},
        'character.store': {uri: 'character', methods: ['POST']},
        'character.show': {
            uri: 'character/{character}',
            methods: ['GET', 'HEAD'],
            bindings: {character: 'id'},
        },
        'character.edit': {
            uri: 'character/{character}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {character: 'id'},
        },
        'character.update': {
            uri: 'character/{character}',
            methods: ['PUT', 'PATCH'],
            bindings: {character: 'id'},
        },
        'character.destroy': {
            uri: 'character/{character}',
            methods: ['DELETE'],
            bindings: {character: 'id'},
        },
        'item.index': {uri: 'item', methods: ['GET', 'HEAD']},
        'item.create': {uri: 'item/create', methods: ['GET', 'HEAD']},
        'item.store': {uri: 'item', methods: ['POST']},
        'item.show': {
            uri: 'item/{item}',
            methods: ['GET', 'HEAD'],
            bindings: {item: 'id'},
        },
        'item.edit': {
            uri: 'item/{item}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {item: 'id'},
        },
        'item.update': {
            uri: 'item/{item}',
            methods: ['PUT', 'PATCH'],
            bindings: {item: 'id'},
        },
        'item.destroy': {
            uri: 'item/{item}',
            methods: ['DELETE'],
            bindings: {item: 'id'},
        },
        'trade.index': {uri: 'trade', methods: ['GET', 'HEAD']},
        'trade.create': {uri: 'trade/create', methods: ['GET', 'HEAD']},
        'trade.store': {uri: 'trade', methods: ['POST']},
        'trade.show': {
            uri: 'trade/{trade}',
            methods: ['GET', 'HEAD'],
            bindings: {trade: 'id'},
        },
        'trade.edit': {
            uri: 'trade/{trade}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {trade: 'id'},
        },
        'trade.update': {
            uri: 'trade/{trade}',
            methods: ['PUT', 'PATCH'],
            bindings: {trade: 'id'},
        },
        'trade.destroy': {
            uri: 'trade/{trade}',
            methods: ['DELETE'],
            bindings: {trade: 'id'},
        },
        'event.index': {uri: 'event', methods: ['GET', 'HEAD']},
        'event.create': {uri: 'event/create', methods: ['GET', 'HEAD']},
        'event.store': {uri: 'event', methods: ['POST']},
        'event.show': {
            uri: 'event/{event}',
            methods: ['GET', 'HEAD'],
            bindings: {event: 'id'},
        },
        'event.edit': {
            uri: 'event/{event}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {event: 'id'},
        },
        'event.update': {
            uri: 'event/{event}',
            methods: ['PUT', 'PATCH'],
            bindings: {event: 'id'},
        },
        'event.destroy': {
            uri: 'event/{event}',
            methods: ['DELETE'],
            bindings: {event: 'id'},
        },
        'session.index': {uri: 'session', methods: ['GET', 'HEAD']},
        'session.create': {uri: 'session/create', methods: ['GET', 'HEAD']},
        'session.store': {uri: 'session', methods: ['POST']},
        'session.show': {
            uri: 'session/{session}',
            methods: ['GET', 'HEAD'],
            bindings: {session: 'id'},
        },
        'session.edit': {
            uri: 'session/{session}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {session: 'id'},
        },
        'session.update': {
            uri: 'session/{session}',
            methods: ['PUT', 'PATCH'],
            bindings: {session: 'id'},
        },
        'session.destroy': {
            uri: 'session/{session}',
            methods: ['DELETE'],
            bindings: {session: 'id'},
        },
        'league.index': {uri: 'league', methods: ['GET', 'HEAD']},
        'league.create': {uri: 'league/create', methods: ['GET', 'HEAD']},
        'league.store': {uri: 'league', methods: ['POST']},
        'league.show': {
            uri: 'league/{league}',
            methods: ['GET', 'HEAD'],
            bindings: {league: 'id'},
        },
        'league.edit': {
            uri: 'league/{league}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {league: 'id'},
        },
        'league.update': {
            uri: 'league/{league}',
            methods: ['PUT', 'PATCH'],
            bindings: {league: 'id'},
        },
        'league.destroy': {
            uri: 'league/{league}',
            methods: ['DELETE'],
            bindings: {league: 'id'},
        },
        'role.index': {uri: 'role', methods: ['GET', 'HEAD']},
        'role.create': {uri: 'role/create', methods: ['GET', 'HEAD']},
        'role.store': {uri: 'role', methods: ['POST']},
        'role.show': {
            uri: 'role/{role}',
            methods: ['GET', 'HEAD'],
            bindings: {role: 'id'},
        },
        'role.edit': {
            uri: 'role/{role}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {role: 'id'},
        },
        'role.update': {
            uri: 'role/{role}',
            methods: ['PUT', 'PATCH'],
            bindings: {role: 'id'},
        },
        'role.destroy': {
            uri: 'role/{role}',
            methods: ['DELETE'],
            bindings: {role: 'id'},
        },
        'campaign.index': {uri: 'campaign', methods: ['GET', 'HEAD']},
        'campaign.create': {uri: 'campaign/create', methods: ['GET', 'HEAD']},
        'campaign.store': {uri: 'campaign', methods: ['POST']},
        'campaign.show': {
            uri: 'campaign/{campaign}',
            methods: ['GET', 'HEAD'],
            bindings: {campaign: 'id'},
        },
        'campaign.edit': {
            uri: 'campaign/{campaign}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {campaign: 'id'},
        },
        'campaign.update': {
            uri: 'campaign/{campaign}',
            methods: ['PUT', 'PATCH'],
            bindings: {campaign: 'id'},
        },
        'campaign.destroy': {
            uri: 'campaign/{campaign}',
            methods: ['DELETE'],
            bindings: {campaign: 'id'},
        },
    },
}

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes)
}

export {Ziggy}
