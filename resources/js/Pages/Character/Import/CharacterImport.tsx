import React from 'react'
import {ApplicationLayout} from 'Layouts'
import {Box, Button, Grid, Link, TextField, Typography} from '@mui/material'
import styled from 'styled-components'
import {getFontTheme} from 'Utils'
import {ThemeProvider} from '@mui/material/styles'
import {Link as InertiaLink} from '@inertiajs/inertia-react'

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

const CharacterImport = () => (
    <ThemeProvider theme={getFontTheme('Form')}>
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
                    <InertiaLink href='/dev/Character'>
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
    </ThemeProvider>
)

CharacterImport.displayName = 'CharacterImport'
CharacterImport.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)
export default CharacterImport
