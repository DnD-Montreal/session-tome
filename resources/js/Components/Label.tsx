/* eslint-disable */
// These files will be deleted once login is implemented
import React from 'react'

interface Props {
    forInput: string
    value: string
    className?: string
}

const Label: React.FC<Props> = ({forInput, value, className, children}) => (
    <label
        htmlFor={forInput}
        className={`block font-medium text-sm text-gray-700 ${className}`}
    >
        {value || {children}}
    </label>
)

export default Label
