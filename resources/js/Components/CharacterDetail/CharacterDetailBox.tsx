import CreateIcon from '@mui/icons-material/Create'
import DownloadIcon from '@mui/icons-material/Download'
import IosShareIcon from '@mui/icons-material/IosShare'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import {Link} from 'Components'
import React, {useContext} from 'react'
import styled from 'styled-components'
import route from 'ziggy-js'

import {UserContext} from '../../Layouts/ApplicationLayout/UserContext'

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

const StyledStatus = styled(Typography)({
    color: '#a0a2a3',
    textTransform: 'capitalize',
})

type CharDetailBoxPropType = {
    character: any
    setIsEditDrawerOpen: (payload: boolean) => void
}

function getUser() {
    const user = useContext(UserContext)
    return user
}

const CharacterDetailBox = ({character, setIsEditDrawerOpen}: CharDetailBoxPropType) => (
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
                    <StyledStatus>{character.status}</StyledStatus>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={3} direction='row'>
                        {getUser()?.id === character.user_id && (
                            <Button
                                variant='contained'
                                startIcon={<CreateIcon fontSize='small' />}
                                onClick={() => {
                                    setIsEditDrawerOpen(true)
                                }}>
                                UPDATE
                            </Button>
                        )}
                        {getUser()?.id === character.user_id && (
                            <Button
                                variant='contained'
                                startIcon={<DownloadIcon fontSize='small' />}>
                                EXPORT
                            </Button>
                        )}
                        <Link href={route('item.index', {character_id: character.id})}>
                            <Button
                                variant='contained'
                                startIcon={<IosShareIcon fontSize='small' />}>
                                ITEMS
                            </Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    </Box>
)

CharacterDetailBox.displayName = 'CharacterDetailBox'
export default CharacterDetailBox
