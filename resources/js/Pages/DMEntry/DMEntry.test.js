import {render} from '@testing-library/react'
import {DMEntryData} from 'Mock/dmentry-data'
import React from 'react'

import DMEntry from './DMEntry'

const props = {
    entries: DMEntryData,
}

describe('DMEntry', () => {
    it('Component should render', () => {
        const component = render(<DMEntry {...props} />)
        expect(component).toBeDefined()
    })
})
