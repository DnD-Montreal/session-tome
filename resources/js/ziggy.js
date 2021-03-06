const Ziggy = {
    url: 'http://localhost',
    port: null,
    defaults: {},
    routes: {
        'backpack.auth.login': {uri: 'admin/login', methods: ['GET', 'HEAD']},
        'backpack.auth.logout': {uri: 'admin/logout', methods: ['GET', 'HEAD']},
        'backpack.auth.register': {uri: 'admin/register', methods: ['GET', 'HEAD']},
        'backpack.auth.password.reset': {uri: 'admin/password/reset', methods: ['GET', 'HEAD']},
        'backpack.auth.password.reset.token': {
            uri: 'admin/password/reset/{token}',
            methods: ['GET', 'HEAD'],
        },
        'backpack.auth.password.email': {uri: 'admin/password/email', methods: ['POST']},
        'backpack.dashboard': {uri: 'admin/dashboard', methods: ['GET', 'HEAD']},
        backpack: {uri: 'admin', methods: ['GET', 'HEAD']},
        'backpack.account.info': {uri: 'admin/edit-account-info', methods: ['GET', 'HEAD']},
        'backpack.account.info.store': {uri: 'admin/edit-account-info', methods: ['POST']},
        'backpack.account.password': {uri: 'admin/change-password', methods: ['POST']},
        'adventure.index': {uri: 'adventure', methods: ['GET', 'HEAD']},
        'adventure.search': {uri: 'admin/adventure/search', methods: ['POST']},
        'adventure.showDetailsRow': {uri: 'admin/adventure/{id}/details', methods: ['GET', 'HEAD']},
        'adventure.create': {uri: 'adventure/create', methods: ['GET', 'HEAD']},
        'adventure.store': {uri: 'adventure', methods: ['POST']},
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
        'adventure.show': {
            uri: 'adventure/{adventure}',
            methods: ['GET', 'HEAD'],
            bindings: {adventure: 'id'},
        },
        'campaign.index': {uri: 'campaign', methods: ['GET', 'HEAD']},
        'campaign.search': {uri: 'admin/campaign/search', methods: ['POST']},
        'campaign.showDetailsRow': {uri: 'admin/campaign/{id}/details', methods: ['GET', 'HEAD']},
        'campaign.create': {uri: 'campaign/create', methods: ['GET', 'HEAD']},
        'campaign.store': {uri: 'campaign', methods: ['POST']},
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
        'campaign.show': {
            uri: 'campaign/{campaign}',
            methods: ['GET', 'HEAD'],
            bindings: {campaign: 'id'},
        },
        'character.index': {uri: 'character', methods: ['GET', 'HEAD']},
        'character.search': {uri: 'admin/character/search', methods: ['POST']},
        'character.showDetailsRow': {uri: 'admin/character/{id}/details', methods: ['GET', 'HEAD']},
        'character.create': {uri: 'character/create', methods: ['GET', 'HEAD']},
        'character.store': {uri: 'character', methods: ['POST']},
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
            uri: 'character/{character?}',
            methods: ['DELETE'],
            bindings: {character: 'id'},
        },
        'character.show': {
            uri: 'character/{character}',
            methods: ['GET', 'HEAD'],
            bindings: {character: 'id'},
        },
        'entry.index': {uri: 'entry', methods: ['GET', 'HEAD']},
        'entry.search': {uri: 'admin/entry/search', methods: ['POST']},
        'entry.showDetailsRow': {uri: 'admin/entry/{id}/details', methods: ['GET', 'HEAD']},
        'entry.create': {uri: 'entry/create', methods: ['GET', 'HEAD']},
        'entry.store': {uri: 'entry', methods: ['POST']},
        'entry.edit': {
            uri: 'entry/{entry}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {entry: 'id'},
        },
        'entry.update': {uri: 'entry/{entry}', methods: ['PUT', 'PATCH'], bindings: {entry: 'id'}},
        'entry.destroy': {uri: 'entry/{entry?}', methods: ['DELETE'], bindings: {entry: 'id'}},
        'entry.show': {uri: 'entry/{entry}', methods: ['GET', 'HEAD'], bindings: {entry: 'id'}},
        'event.index': {uri: 'event', methods: ['GET', 'HEAD']},
        'event.search': {uri: 'admin/event/search', methods: ['POST']},
        'event.showDetailsRow': {uri: 'admin/event/{id}/details', methods: ['GET', 'HEAD']},
        'event.create': {uri: 'event/create', methods: ['GET', 'HEAD']},
        'event.store': {uri: 'event', methods: ['POST']},
        'event.edit': {
            uri: 'event/{event}/edit',
            methods: ['GET', 'HEAD'],
            bindings: {event: 'id'},
        },
        'event.update': {uri: 'event/{event}', methods: ['PUT', 'PATCH'], bindings: {event: 'id'}},
        'event.destroy': {uri: 'event/{event}', methods: ['DELETE'], bindings: {event: 'id'}},
        'event.show': {uri: 'event/{event}', methods: ['GET', 'HEAD'], bindings: {event: 'id'}},
        'item.index': {uri: 'item', methods: ['GET', 'HEAD']},
        'item.search': {uri: 'admin/item/search', methods: ['POST']},
        'item.showDetailsRow': {uri: 'admin/item/{id}/details', methods: ['GET', 'HEAD']},
        'item.create': {uri: 'item/create', methods: ['GET', 'HEAD']},
        'item.store': {uri: 'item', methods: ['POST']},
        'item.edit': {uri: 'item/{item}/edit', methods: ['GET', 'HEAD'], bindings: {item: 'id'}},
        'item.update': {uri: 'item/{item}', methods: ['PUT', 'PATCH'], bindings: {item: 'id'}},
        'item.destroy': {uri: 'item/{item}', methods: ['DELETE'], bindings: {item: 'id'}},
        'item.show': {uri: 'item/{item}', methods: ['GET', 'HEAD'], bindings: {item: 'id'}},
        'league.index': {uri: 'league', methods: ['GET', 'HEAD']},
        'league.search': {uri: 'admin/league/search', methods: ['POST']},
        'league.showDetailsRow': {uri: 'admin/league/{id}/details', methods: ['GET', 'HEAD']},
        'league.create': {uri: 'league/create', methods: ['GET', 'HEAD']},
        'league.store': {uri: 'league', methods: ['POST']},
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
        'league.destroy': {uri: 'league/{league}', methods: ['DELETE'], bindings: {league: 'id'}},
        'league.show': {uri: 'league/{league}', methods: ['GET', 'HEAD'], bindings: {league: 'id'}},
        'rating.index': {uri: 'rating', methods: ['GET', 'HEAD']},
        'rating.search': {uri: 'admin/rating/search', methods: ['POST']},
        'rating.showDetailsRow': {uri: 'admin/rating/{id}/details', methods: ['GET', 'HEAD']},
        'rating.create': {uri: 'rating/create', methods: ['GET', 'HEAD']},
        'rating.store': {uri: 'rating', methods: ['POST']},
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
        'rating.destroy': {uri: 'rating/{rating}', methods: ['DELETE'], bindings: {rating: 'id'}},
        'rating.show': {uri: 'rating/{rating}', methods: ['GET', 'HEAD'], bindings: {rating: 'id'}},
        'role.index': {uri: 'role', methods: ['GET', 'HEAD']},
        'role.search': {uri: 'admin/role/search', methods: ['POST']},
        'role.showDetailsRow': {uri: 'admin/role/{id}/details', methods: ['GET', 'HEAD']},
        'role.create': {uri: 'role/create', methods: ['GET', 'HEAD']},
        'role.store': {uri: 'role', methods: ['POST']},
        'role.edit': {uri: 'role/{role}/edit', methods: ['GET', 'HEAD'], bindings: {role: 'id'}},
        'role.update': {uri: 'role/{role}', methods: ['PUT', 'PATCH'], bindings: {role: 'id'}},
        'role.destroy': {uri: 'role/{role}', methods: ['DELETE'], bindings: {role: 'id'}},
        'role.show': {uri: 'role/{role}', methods: ['GET', 'HEAD'], bindings: {role: 'id'}},
        'session.index': {uri: 'session', methods: ['GET', 'HEAD']},
        'session.search': {uri: 'admin/session/search', methods: ['POST']},
        'session.showDetailsRow': {uri: 'admin/session/{id}/details', methods: ['GET', 'HEAD']},
        'session.create': {uri: 'session/create', methods: ['GET', 'HEAD']},
        'session.store': {uri: 'session', methods: ['POST']},
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
        'session.show': {
            uri: 'session/{session}',
            methods: ['GET', 'HEAD'],
            bindings: {session: 'id'},
        },
        'trade.index': {uri: 'trade', methods: ['GET', 'HEAD']},
        'trade.search': {uri: 'admin/trade/search', methods: ['POST']},
        'trade.showDetailsRow': {uri: 'admin/trade/{id}/details', methods: ['GET', 'HEAD']},
        'trade.create': {uri: 'trade/create', methods: ['GET', 'HEAD']},
        'trade.store': {uri: 'trade', methods: ['POST']},
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
        'trade.show': {
            uri: 'trade/{trade}',
            methods: ['GET', 'HEAD'],
            bindings: {trade: 'id'},
        },
        'user.index': {uri: 'admin/user', methods: ['GET', 'HEAD']},
        'user.search': {uri: 'admin/user/search', methods: ['POST']},
        'user.showDetailsRow': {uri: 'admin/user/{id}/details', methods: ['GET', 'HEAD']},
        'user.create': {uri: 'admin/user/create', methods: ['GET', 'HEAD']},
        'user.store': {uri: 'admin/user', methods: ['POST']},
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
        'user.destroy': {uri: 'user/{user}', methods: ['DELETE'], bindings: {user: 'id'}},
        'user.show': {uri: 'admin/user/{id}/show', methods: ['GET', 'HEAD']},
        'cypress.factory': {uri: '__cypress__/factory', methods: ['POST']},
        'cypress.login': {uri: '__cypress__/login', methods: ['POST']},
        'cypress.logout': {uri: '__cypress__/logout', methods: ['POST']},
        'cypress.artisan': {uri: '__cypress__/artisan', methods: ['POST']},
        'cypress.run-php': {uri: '__cypress__/run-php', methods: ['POST']},
        'cypress.csrf-token': {uri: '__cypress__/csrf_token', methods: ['GET', 'HEAD']},
        'cypress.routes': {uri: '__cypress__/routes', methods: ['POST']},
        register: {uri: 'register', methods: ['GET', 'HEAD']},
        login: {uri: 'login', methods: ['POST']},
        'password.request': {uri: 'forgot-password', methods: ['GET', 'HEAD']},
        'password.email': {uri: 'forgot-password', methods: ['POST']},
        'password.reset': {uri: 'reset-password/{token}', methods: ['GET', 'HEAD']},
        'password.update': {uri: 'reset-password', methods: ['POST']},
        'verification.notice': {uri: 'verify-email', methods: ['GET', 'HEAD']},
        'verification.verify': {uri: 'verify-email/{id}/{hash}', methods: ['GET', 'HEAD']},
        'verification.send': {uri: 'email/verification-notification', methods: ['POST']},
        'password.confirm': {uri: 'confirm-password', methods: ['GET', 'HEAD']},
        logout: {uri: 'logout', methods: ['POST']},
        homepage: {uri: '/', methods: ['GET', 'HEAD']},
        'entry-bulk.create': {uri: 'entry-bulk/create', methods: ['GET', 'HEAD']},
        'entry-bulk.store': {uri: 'entry-bulk', methods: ['POST']},
        'offer.destroy': {
            uri: 'offer/destroy/{offer}/{trade}',
            methods: ['DELETE'],
            bindings: {offer: 'id', trade: 'id'},
        },
        'offer.store': {uri: 'offer/store', methods: ['POST']},
        'offer.create': {
            uri: 'offer/create/{trade}',
            methods: ['GET', 'HEAD'],
            bindings: {trade: 'id'},
        },
        'beyond-import.store': {uri: 'beyond-import', methods: ['POST']},
        'adventures-league-import.index': {
            uri: 'adventures-league-import',
            methods: ['GET', 'HEAD'],
        },
        'adventures-league-import.store': {uri: 'adventures-league-import', methods: ['POST']},
        'dm-entry.index': {uri: 'dm-entry', methods: ['GET', 'HEAD']},
        'dm-entry.create': {uri: 'dm-entry/create', methods: ['GET', 'HEAD']},
        'attach-entry-to-character.update': {
            uri: 'attach-entry-to-character/{character}',
            methods: ['PUT', 'PATCH'],
            bindings: {character: 'id'},
        },
        'event-registration.destroy': {
            uri: 'registration/{session}',
            methods: ['DELETE'],
            bindings: {session: 'id'},
        },
        'registration.store': {uri: 'registration', methods: ['POST']},
        'report.rating': {uri: 'report/rating', methods: ['GET', 'HEAD']},
        'campaign-registration.create': {
            uri: 'campaign-registration/create',
            methods: ['GET', 'HEAD'],
        },
        'campaign-registration.store': {uri: 'campaign-registration', methods: ['POST']},
        'campaign-registration.destroy': {
            uri: 'campaign-registration/{campaign_registration}',
            methods: ['DELETE'],
            bindings: {campaignRegistration: 'id'},
        },
        'trade-fulfillment.store': {
            uri: 'trade-fulfilment/{trade}',
            methods: ['POST'],
            bindings: {trade: 'id'},
        },
    },
}

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes)
}

export {Ziggy}
