import Chip from '@mui/material/Chip'
import {useTranslation} from 'react-i18next'

type RarityChipPropType = {
    value: string
}

const RarityChip = ({value}: RarityChipPropType) => {
    const {t} = useTranslation()
    let colorObj
    switch (value) {
        case 'common':
            colorObj = {color: '#bdbdbd', borderColor: '#bdbdbd'}
            break

        case 'uncommon':
            colorObj = {color: '#27e85a', borderColor: '#27e85a'}
            break

        case 'rare':
            colorObj = {color: '#3592ff', borderColor: '#3592ff'}
            break

        case `very_rare`:
            colorObj = {color: '#9f7cfa', borderColor: '#9f7cfa'}
            break

        case 'legendary':
            colorObj = {color: '#e3291b', borderColor: '#e3291b'}
            break

        case 'artifact':
            colorObj = {color: '#ffd900', borderColor: '#ffd900'}
            break

        default:
            colorObj = {color: 'primary', borderColor: 'primary'}
    }
    return <Chip label={t(`enums.${value}`)} sx={colorObj} variant='outlined' />
}

RarityChip.displayName = 'RarityChip'
export default RarityChip
