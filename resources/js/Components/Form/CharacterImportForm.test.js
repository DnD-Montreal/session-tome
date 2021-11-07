import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import CharacterImportForm from './CharacterImportForm'

describe('<CharacterImportForm />', () => {
    it('import form should render', () => {
        const component = render(<CharacterImportForm />)
        expect(component).toBeDefined()
    })
    it('Import from dndBeyond', () => {
        const component = render(<CharacterImportForm />)
        expect(component).toBeDefined()
        const beyondLink = document.querySelector('#ddBeyondLink')
        fireEvent.change(beyondLink, {target: {value: 'asd'}})
        fireEvent.click(screen.getByText('Import'))
    })
    it('Import from AL', () => {
        const component = render(<CharacterImportForm />)
        expect(component).toBeDefined()
        const beyondLink = document.querySelector('#ALimport')
        fireEvent.change(beyondLink, {target: {files: [{name: 'hihi'}]}})
        fireEvent.click(screen.getByText('Import'))
    })
})
