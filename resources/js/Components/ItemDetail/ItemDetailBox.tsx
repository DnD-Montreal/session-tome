import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import CreateIcon from '@mui/icons-material/Create'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import React from 'react'
import styled from 'styled-components'

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
    setIsEditDrawerOpen: (payload: boolean) => void
}

const ItemDetailBox = ({item, setIsEditDrawerOpen}: ItemDetailBoxPropType) => (
    <Box sx={{p: 5, backgroundColor: 'primary'}}>
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <Img
                    alt='avatar'
                    src='https://static.wikia.nocookie.net/eladriells-dd/images/d/d8/Orc.jpg/revision/latest/scale-to-width-down/600?cb=20190330101155'
                />
            </Grid>
            <Grid item container columnSpacing={1} rowSpacing={5} xs={8}>
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
    </Box>
)

ItemDetailBox.displayName = 'ItemDetailBox'
export default ItemDetailBox
