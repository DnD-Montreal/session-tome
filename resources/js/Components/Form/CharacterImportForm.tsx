import {useForm} from '@inertiajs/inertia-react'
import ClearIcon from '@mui/icons-material/Clear'
import {
    Alert,
    Box,
    Button as MuiButton,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material'
import {Button, Link as InertiaLink} from 'Components'
import {useTranslation} from 'react-i18next'
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
    margin-top: 6px;
    min-width: 40vw;
`

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
`

const StyledIcon = styled(ClearIcon)`
    cursor: pointer;
`

const StyledAlert = styled(Alert)`
    background-color: inherit;
    color: #ffffff;
`

type CharacterImportFormData = {
    logs: File | null
    beyond_link: string | null
}

const CharacterImportForm = () => {
    const {t} = useTranslation()
    const {data, setData, post, processing} = useForm<CharacterImportFormData>({
        beyond_link: null,
        logs: null,
    })
    return (
        <StyledBox>
            <Typography>
                {t('characterDetail.import-help-text')}
                <Link href='https://www.adventurersleaguelog.com/'>
                    {t('characterDetail.adventure-league-dot-com')}
                </Link>
                {t('characterDetail.import-help-text-2')}
                <Link href='https://www.dndbeyond.com/'>
                    {t('characterDetail.DND-beyond')}
                </Link>
                .
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
                    <MuiButton
                        disabled={Boolean(data.beyond_link)}
                        variant='contained'
                        component='span'>
                        {t('common.upload')}
                    </MuiButton>
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
            <Typography>{t('common.or')}</Typography>
            <TextField
                disabled={Boolean(data.logs)}
                margin='normal'
                fullWidth
                id='ddBeyondLink'
                label={t('characterDetail.DND-beyond')}
                name='D&D Beyond Link'
                helperText={t('characterDetail.import-help-text-3')}
                value={data.beyond_link}
                onChange={(e) => setData('beyond_link', e.target.value)}
            />
            <StyledAlert severity='warning'>
                {t('characterDetail.import-note')}
            </StyledAlert>
            <StyledFooter container>
                <Grid item md={2} xs={6}>
                    <InertiaLink href={route('character.index')}>
                        <Button fullWidth>{t('common.cancel')}</Button>
                    </InertiaLink>
                </Grid>
                <Grid item md={8} />
                <Grid item md={2} xs={6}>
                    <Button
                        loading={processing}
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
                        {t('common.import')}
                    </Button>
                </Grid>
            </StyledFooter>
        </StyledBox>
    )
}

CharacterImportForm.displayName = 'CharacterImportForm'
export default CharacterImportForm
