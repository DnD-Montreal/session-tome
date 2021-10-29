import React from 'react'
import {Box, Button, Grid, Link, TextField, Typography} from '@mui/material'
import styled from 'styled-components'
import {Link as InertiaLink} from '@inertiajs/inertia-react'
import route from 'ziggy-js'

const Label = styled('label')({
    marginTop: '16px',
})

const Input = styled('input')({
    display: 'none',
})

const ButtonContainer = styled(Box)`
    padding: 16px 0px 16px 0px;
`

const StyledFooter = styled(Grid)`
    min-width: 40vw;
`

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
`

const CharacterImportForm = () => (
    <StyledBox>
        <Typography>
            Import character log by uploading your{' '}
            <Link href='https://www.adventurersleaguelog.com/'>
                AdventurersLeagueLog.com
            </Link>{' '}
            logs or by entering your character&apos;s{' '}
            <Link href='https://www.dndbeyond.com/'>D&D Beyond</Link> link.
        </Typography>
        <ButtonContainer>
            <Label htmlFor='contained-button-file'>
                <Input
                    accept='*'
                    id='contained-button-file'
                    multiple={false}
                    type='file'
                />
                <Button variant='contained' component='span'>
                    Upload
                </Button>
            </Label>
        </ButtonContainer>
        <Typography>OR</Typography>
        <TextField
            margin='normal'
            fullWidth
            id='ddBeyondLink'
            label='D&D Beyond Link'
            name='D&D Beyond Link'
            helperText="Enter your character's link on D&D Beyond."
        />
        <StyledFooter container>
            <Grid item md={2} xs={6}>
                <InertiaLink href={route('character.index')}>
                    <Button fullWidth>Cancel</Button>
                </InertiaLink>
            </Grid>
            <Grid item md={8} />
            <Grid item md={2} xs={6}>
                <Button variant='contained' fullWidth>
                    Import
                </Button>
            </Grid>
        </StyledFooter>
    </StyledBox>
)

CharacterImportForm.displayName = 'CharacterImportForm'
export default CharacterImportForm
