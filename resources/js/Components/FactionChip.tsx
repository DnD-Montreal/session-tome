import React from 'react'
import Chip from '@mui/material/Chip'

type FactionChipPropType = {
    fname: string
}

const FactionChip = ({fname}: FactionChipPropType) => {
    switch (fname) {
        case 'The Harpers':
            return (
                <Chip
                    label={fname}
                    sx={{color: '#86B8F4', borderColor: '#86B8F4'}}
                    variant='outlined'
                />
            )
        case 'The Order of the Gauntlet':
            return (
                <Chip
                    label={fname}
                    sx={{color: '#D3D8DC', borderColor: '#D3D8DC'}}
                    variant='outlined'
                />
            )
        case 'The Emerald Enclave':
            return (
                <Chip
                    label={fname}
                    sx={{color: '#8DA57C', borderColor: '#8DA57C'}}
                    variant='outlined'
                />
            )
        case `The Lords' Alliance`:
            return (
                <Chip
                    label={fname}
                    sx={{color: '#CC5D56', borderColor: '#CC5D56'}}
                    variant='outlined'
                />
            )
        case 'The Zhentarim':
            return (
                <Chip
                    label={fname}
                    sx={{color: '#CAA93C', borderColor: '#CAA93C'}}
                    variant='outlined'
                />
            )
        default:
            return <Chip label={fname} color='success' variant='outlined' />
    }
}

FactionChip.displayName = 'FactionChip'
export default FactionChip
