import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import CreateIcon from '@mui/icons-material/Create'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import {Link} from 'Components'
import placeholderImage from 'Images/PlaceholderImage.png'
import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100',
    maxHeight: '100',
})

const StyledTypography = styled(Typography)({
    color: '#a0a2a3',
    fontSize: 11,
})

const CharacterNameTypography = styled(Typography)({
    color: '#a0a2a3',
    fontSize: 16,
})

type ItemDetailBoxPropType = {
    item: ItemData
    character: CharacterData
    setIsEditDrawerOpen: (payload: boolean) => void
}

const ItemDetailBox = ({item, setIsEditDrawerOpen, character}: ItemDetailBoxPropType) => {
    const {t} = useTranslation()
    return (
        <Box sx={{p: 5, backgroundColor: 'primary'}}>
            <Grid container rowSpacing={2}>
                <Grid container item xs={5}>
                    <Grid item>
                        <Link href={route('character.show', [character.id])}>
                            <CharacterNameTypography>
                                {character.name}
                            </CharacterNameTypography>
                        </Link>
                        <Typography>
                            {'>'} {item.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={7} />
                <Grid item xs={12} />
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <Img width='425' alt='avatar' src={placeholderImage} />
                </Grid>
                <Grid item container columnSpacing={1} rowSpacing={5} xs={6}>
                    <Grid item xs={12}>
                        <StyledTypography>{t('itemDetail.name')}</StyledTypography>
                        <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <StyledTypography>{t('itemDetail.rarity')}</StyledTypography>
                        <Typography>{t(`enums.${item.rarity}`)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <StyledTypography>{t('itemDetail.tier')}</StyledTypography>
                        <Typography>{item.tier}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={3} direction='row'>
                            <Button
                                data-testid='update-button'
                                variant='contained'
                                startIcon={<CreateIcon fontSize='small' />}
                                onClick={() => {
                                    setIsEditDrawerOpen(true)
                                }}>
                                {t('common.update')}
                            </Button>
                            <Button
                                variant='contained'
                                startIcon={<CompareArrowsIcon fontSize='small' />}>
                                {t('itemDetail.trade')}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container rowSpacing={6}>
                <Grid item xs={12} />
                <Grid item xs={12}>
                    <StyledTypography>{t('itemDetail.description')}</StyledTypography>
                    <Typography>
                        {item.description === '""'
                            ? t('itemDetail.no-description')
                            : item.description}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

ItemDetailBox.displayName = 'ItemDetailBox'
export default ItemDetailBox
