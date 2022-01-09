import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import CreateIcon from '@mui/icons-material/Create'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import {Link} from 'Components'
import React from 'react'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
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

type ItemDetailBoxPropType = {
    item: any
    character: CharacterData
    setIsEditDrawerOpen: (payload: boolean) => void
}

const ItemDetailBox = ({item, setIsEditDrawerOpen, character}: ItemDetailBoxPropType) => (
    <Box sx={{p: 5, backgroundColor: 'primary'}}>
        <Grid container rowSpacing={2}>
            <Grid container item xs={5}>
                <Grid item xs={4}>
                    <Link href={route('character.show', [character.id])}>
                        <Typography>{character.name}</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Typography>
                        {' '}
                        {'>'} {item.name}
                    </Typography>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            <Grid item xs={7} />
            <Grid item xs={12} />
        </Grid>
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <Img
                    alt='avatar'
                    src='https://static.wikia.nocookie.net/eladriells-dd/images/d/d8/Orc.jpg/revision/latest/scale-to-width-down/600?cb=20190330101155'
                />
            </Grid>
            <Grid item container columnSpacing={1} rowSpacing={5} xs={6}>
                <Grid item xs={12}>
                    <StyledTypography>NAME</StyledTypography>
                    <Typography>{item.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <StyledTypography>RARITY</StyledTypography>
                    <Typography>{item.rarity}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <StyledTypography>TIER</StyledTypography>
                    <Typography>{item.tier}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={3} direction='row'>
                        <Button
                            variant='contained'
                            startIcon={<CreateIcon fontSize='small' />}
                            onClick={() => {
                                setIsEditDrawerOpen(true)
                            }}>
                            UPDATE
                        </Button>
                        <Button
                            variant='contained'
                            startIcon={<CompareArrowsIcon fontSize='small' />}>
                            TRADE
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
        <Grid container rowSpacing={6}>
            <Grid item xs={12} />
            <Grid item xs={12}>
                <StyledTypography>DESCRPITION</StyledTypography>
                <Typography>{item.description}</Typography>
            </Grid>
        </Grid>
    </Box>
)

ItemDetailBox.displayName = 'ItemDetailBox'
export default ItemDetailBox
