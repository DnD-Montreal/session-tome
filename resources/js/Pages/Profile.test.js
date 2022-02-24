import {fireEvent, render} from '@testing-library/react'
import React from 'react'

import Profile from './Profile'

describe('Profile', () => {
    it('Component should render', () => {
        const component = render(<Profile />)
        expect(component).toBeDefined()
    })
    it('Test fields', () => {
        render(<Profile />)
        fireEvent.change(document.querySelector('#email'), {target: {value: '123'}})
        fireEvent.change(document.querySelector('#username'), {target: {value: '123'}})
        fireEvent.change(document.querySelector('#password'), {target: {value: '123'}})
        fireEvent.change(document.querySelector('#confirm-password'), {
            target: {value: '123'},
        })
        fireEvent.click(document.querySelector('#language'))
        fireEvent.click(document.querySelector('[data-cy="reset-button"]'))
        fireEvent.click(document.querySelector('[data-cy="save-button"]'))
        fireEvent.click(document.querySelector('[data-cy="delete-account-button"]'))
    })
})
