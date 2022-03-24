import {fireEvent, render, screen} from '@testing-library/react'

import DeleteModal from './DeleteModal'

const mockFn = jest.fn()

const props = {
    open: true,
    onClose: mockFn,
    onDelete: mockFn,
    warningMessage: '',
}

describe('DeleteModal', () => {
    it('Component should render', () => {
        const component = render(<DeleteModal {...props} />)
        expect(component).toBeDefined()
    })
    it('Test cancel', () => {
        render(<DeleteModal {...props} />)
        fireEvent.click(screen.getByText('Cancel'))
    })
    it('Test ok', () => {
        render(<DeleteModal {...props} />)
        fireEvent.click(screen.getByText('Delete'))
    })
})
