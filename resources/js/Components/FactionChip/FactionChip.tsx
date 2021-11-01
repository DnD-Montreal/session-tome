import React from 'react'
import Chip from '@mui/material/Chip'

type FactionChipPropType = {
    fname: string
}

const FactionChip = ({fname}: FactionChipPropType) => {
    if (fname == null) {
        return null
    }
    let colorObj
    switch (fname) {
        case 'The Harpers':
            colorObj = {color: '#86B8F4', borderColor: '#86B8F4'}
            break

        case 'The Order of the Gauntlet':
            colorObj = {color: '#D3D8DC', borderColor: '#D3D8DC'}
            break

        case 'The Emerald Enclave':
            colorObj = {color: '#8DA57C', borderColor: '#8DA57C'}
            break

        case `The Lords' Alliance`:
            colorObj = {color: '#CC5D56', borderColor: '#CC5D56'}
            break

        case 'The Zhentarim':
            colorObj = {color: '#CAA93C', borderColor: '#CAA93C'}
            break

        default:
            colorObj = {color: 'primary', borderColor: 'primary'}
    }
    return <Chip label={fname} sx={colorObj} variant='outlined' />
}

FactionChip.displayName = 'FactionChip'
export default FactionChip
