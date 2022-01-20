import CreateIcon from '@mui/icons-material/Create'
import DownloadIcon from '@mui/icons-material/Download'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import IosShareIcon from '@mui/icons-material/IosShare'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import {Link} from 'Components'
import React from 'react'
import styled from 'styled-components'
import {useUser} from 'Utils'
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

const StyledStatus = styled(Typography)({
    color: '#a0a2a3',
    textTransform: 'capitalize',
})

type CharDetailBoxPropType = {
    character: any
    setIsEditDrawerOpen: (payload: boolean) => void
}

const CharacterDetailBox = ({character, setIsEditDrawerOpen}: CharDetailBoxPropType) => {
    const {getUserId} = useUser()

    return (
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
                            {getUserId() === character.user_id && (
                                <Button
                                    data-testid='update-button'
                                    variant='contained'
                                    startIcon={<CreateIcon fontSize='small' />}
                                    onClick={() => {
                                        setIsEditDrawerOpen(true)
                                    }}>
                                    UPDATE
                                </Button>
                            )}
                            {getUserId() === character.user_id && (
                                <Button
                                    variant='contained'
                                    startIcon={<DownloadIcon fontSize='small' />}>
                                    EXPORT
                                </Button>
                            )}
                            <Link
                                href={route('item.index', {character_id: character.id})}>
                                <Button
                                    variant='contained'
                                    startIcon={<IosShareIcon fontSize='small' />}>
                                    ITEMS
                                </Button>
                            </Link>
                            <Link
                                href={route('entry.create').concat(
                                    `?character_id=${character.id}`,
                                )}>
                                <Button
                                    data-testid='entry-button'
                                    variant='contained'
                                    startIcon={<HistoryEduIcon fontSize='small' />}>
                                    Entry
                                </Button>
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

CharacterDetailBox.displayName = 'CharacterDetailBox'
export default CharacterDetailBox
