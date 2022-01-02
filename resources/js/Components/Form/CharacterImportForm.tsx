import {useForm} from '@inertiajs/inertia-react'
import ClearIcon from '@mui/icons-material/Clear'
import {Box, Button, Grid, Link, TextField, Typography} from '@mui/material'
import {Link as InertiaLink} from 'Components'
import React from 'react'
import styled from 'styled-components'
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

const StyledIcon = styled(ClearIcon)`
    cursor: pointer;
`

type CharacterImportFormData = {
    logs: File | null
    beyond_link: string | null
}

const CharacterImportForm = () => {
    const {data, setData, post} = useForm<CharacterImportFormData>({
        beyond_link: null,
        logs: null,
    })
    return (
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
                <Label htmlFor='ALimport'>
                    <Input
                        onChange={(e) => {
                            if (!e.target.files) return
                            setData('logs', e.target.files[0])
                        }}
                        accept='csv'
                        id='ALimport'
                        multiple={false}
                        type='file'
                    />
                    <Button
                        disabled={Boolean(data.beyond_link)}
                        variant='contained'
                        component='span'>
                        Upload
                    </Button>
                </Label>
                {data?.logs && (
                    <Grid>
                        <Typography>
                            <StyledIcon onClick={() => setData('logs', null)} />
                            {data.logs.name}
                        </Typography>
                    </Grid>
                )}
            </ButtonContainer>
            <Typography>OR</Typography>
            <TextField
                disabled={Boolean(data.logs)}
                margin='normal'
                fullWidth
                id='ddBeyondLink'
                label='D&D Beyond Link'
                name='D&D Beyond Link'
                helperText="Enter your character's link on D&D Beyond."
                value={data.beyond_link}
                onChange={(e) => setData('beyond_link', e.target.value)}
            />
            <StyledFooter container>
                <Grid item md={2} xs={6}>
                    <InertiaLink href={route('character.index')}>
                        <Button fullWidth>Cancel</Button>
                    </InertiaLink>
                </Grid>
                <Grid item md={8} />
                <Grid item md={2} xs={6}>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => {
                            if (data.logs) {
                                post(route('adventures-league-import.store'))
                            }
                            if (data.beyond_link) {
                                post(route('beyond-import.store'))
                            }
                        }}>
                        Import
                    </Button>
                </Grid>
            </StyledFooter>
        </StyledBox>
    )
}

CharacterImportForm.displayName = 'CharacterImportForm'
export default CharacterImportForm
