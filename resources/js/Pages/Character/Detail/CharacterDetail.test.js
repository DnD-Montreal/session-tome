import {render} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import {entriesData} from 'Mock/entries-data'
import React from 'react'

import CharacterDetail from './CharacterDetail'

const props = {
    character: characterData[0],
    entries: entriesData,
}

describe('<CharacterDetail />', () => {
    it('Component should render', () => {
        const component = render(<CharacterDetail {...props} />)
        expect(component).toBeDefined()
    })
})
