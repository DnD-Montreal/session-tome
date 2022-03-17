import {useForm} from '@inertiajs/inertia-react'
import {Alert, Button, Grid, TextField, Typography} from '@mui/material'
import {Modal} from 'Components'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import route from 'ziggy-js'

type CampaignJoinModalPropType = {
    open: boolean
    onClose: () => void
}

const StyledAlert = styled(Alert)`
    background-color: inherit;
    color: #ffffff;
    white-space: pre-wrap;
`

const CampaignJoinModal = ({open, onClose}: CampaignJoinModalPropType) => {
    const {t} = useTranslation()
    const {data, setData, get} = useForm<{code: string | undefined}>({
        code: undefined,
    })
    return (
        <Modal open={open} onClose={onClose}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography color='secondary'>{t('campaign.enter-invite-code')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id='invite-code'
                        label={t('campaignJoin.invite-code')}
                        variant='outlined'
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledAlert severity='info'>{t('campaignJoin.code-alert-text')}</StyledAlert>
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={() => {
                            if (!data.code) return
                            get(route('campaign-registration.create', [data.code]))
                        }}>
                        {t('common.join')}
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

CampaignJoinModal.displayName = 'CampaignJoinModal'
export default CampaignJoinModal
