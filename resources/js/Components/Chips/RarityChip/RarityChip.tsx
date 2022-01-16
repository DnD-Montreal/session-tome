import Chip from '@mui/material/Chip'
import React from 'react'

type RarityChipPropType = {
    value: string
}

const RarityChip = ({value}: RarityChipPropType) => {
    let colorObj
    let chipText
    switch (value) {
        case 'common':
            colorObj = {color: '#bdbdbd', borderColor: '#bdbdbd'}
            chipText = 'Common'
            break

        case 'uncommon':
            colorObj = {color: '#27e85a', borderColor: '#27e85a'}
            chipText = 'Uncommon'
            break

        case 'rare':
            colorObj = {color: '#3592ff', borderColor: '#3592ff'}
            chipText = 'Rare'
            break

        case `very_rare`:
            colorObj = {color: '#9f7cfa', borderColor: '#9f7cfa'}
            chipText = 'Very Rare'
            break

        case 'legendary':
            colorObj = {color: '#e3291b', borderColor: '#e3291b'}
            chipText = 'Legendary'
            break

        case 'artifact':
            colorObj = {color: '#ffd900', borderColor: '#ffd900'}
            chipText = 'Artifact'
            break

        default:
            colorObj = {color: 'primary', borderColor: 'primary'}
    }
    return <Chip label={chipText} sx={colorObj} variant='outlined' />
}

RarityChip.displayName = 'RarityChip'
export default RarityChip
