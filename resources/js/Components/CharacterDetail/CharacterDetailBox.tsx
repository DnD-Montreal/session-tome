import CreateIcon from '@mui/icons-material/Create'
import DownloadIcon from '@mui/icons-material/Download'
import IosShareIcon from '@mui/icons-material/IosShare'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
// eslint-disable-next-line no-unused-vars
import {CharacterRowData} from 'Types/character-row-data'

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

type CharDetailBoxPropType = {
    character: any
    setIsEditDrawerOpen: (payload: boolean) => void
    setEditId: (payload: number) => void
    setEditData: (payload: CharacterRowData) => void
}

const CharacterDetailBox = ({
    character,
    setIsEditDrawerOpen,
    setEditId,
    setEditData,
}: CharDetailBoxPropType) => (
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
                    <Typography>{character.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <StyledTypography>RACE</StyledTypography>
                    <Typography>{character.race}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <StyledTypography>CLASS</StyledTypography>
                    <Typography>{character.class}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <StyledTypography>FACTION</StyledTypography>
                    <Typography>{character.faction}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <StyledTypography>LEVEL</StyledTypography>
                    <Typography>{character.level}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <StyledTypography>DOWNTIME</StyledTypography>
                    <Typography>{character.downtime}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <StyledTypography>STATUS</StyledTypography>
                    <Typography style={{color: '#a0a2a3'}}>d</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={3} direction='row'>
                        <Button
                            variant='contained'
                            startIcon={<CreateIcon fontSize='small' />}
                            onClick={() => {
                                setEditData(character)
                                setEditId(character.id)
                                setIsEditDrawerOpen(true)
                            }}>
                            UPDATE
                        </Button>
                        <Button
                            variant='contained'
                            startIcon={<DownloadIcon fontSize='small' />}>
                            EXPORT
                        </Button>
                        <Button
                            variant='contained'
                            startIcon={<IosShareIcon fontSize='small' />}>
                            ITEMS
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    </Box>
)

CharacterDetailBox.displayName = 'CharacterDetailBox'
export default CharacterDetailBox
