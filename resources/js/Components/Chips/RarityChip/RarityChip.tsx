import Chip from '@mui/material/Chip'
import React from 'react'

type RarityChipPropType = {
    value: string
}

const RarityChip = ({value}: RarityChipPropType) => {
    let colorObj
    switch (value) {
        case 'Common':
            colorObj = {color: '#bdbdbd', borderColor: '#bdbdbd'}
            break

        case 'Uncommon':
            colorObj = {color: '#27e85a', borderColor: '#27e85a'}
            break

        case 'Rare':
            colorObj = {color: '#3592ff', borderColor: '#3592ff'}
            break

        case `Very Rare`:
            colorObj = {color: '#9f7cfa', borderColor: '#9f7cfa'}
            break

        case 'Legendary':
            colorObj = {color: '#e3291b', borderColor: '#e3291b'}
            break

        case 'Artifact':
            colorObj = {color: '#ffd900', borderColor: '#ffd900'}
            break

        default:
            colorObj = {color: 'primary', borderColor: 'primary'}
    }
    return <Chip label={value} sx={colorObj} variant='outlined' />
}

RarityChip.displayName = 'RarityChip'
export default RarityChip
