import {useForm} from '@inertiajs/inertia-react'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography} from '@mui/material'
import {Modal} from 'Components'
import {useTranslation} from 'react-i18next'
import {CampaignData} from 'Types/campaign-data'
import route from 'ziggy-js'

type CampaignKickModalPropType = {
    open: boolean
    onClose: () => void
    campaign: CampaignData
}

type CampaignKickModalDataType = {
    user_id: number[]
}

const CampaignKickModal = ({open, onClose, campaign}: CampaignKickModalPropType) => {
    const {t} = useTranslation()
    const {
        data,
        setData,
        delete: destroy,
    } = useForm<CampaignKickModalDataType>({
        user_id: [],
    })

    return (
        <Modal open={open} onClose={onClose}>
            <Grid container rowSpacing={2} alignItems='center'>
                <Grid item xs={12}>
                    <Typography color='secondary'>{t('campaign.select-character-kick')}</Typography>
                </Grid>
                <FormGroup>
                    {campaign.characters.map((character: any) => (
                        <Typography color='secondary'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={character.id}
                                        checked={data.user_id.includes(character.user_id)}
                                        onChange={() => {
                                            if (data.user_id.includes(character.user_id)) {
                                                const newUserIds = data.user_id.filter(
                                                    (id) => id !== character.user_id,
                                                )
                                                setData('user_id', newUserIds)
                                            } else {
                                                const newUserIds = data.user_id
                                                newUserIds.push(character.user_id)
                                                setData('user_id', newUserIds)
                                            }
                                        }}
                                    />
                                }
                                label={character.name}
                            />
                        </Typography>
                    ))}
                </FormGroup>
                <Grid item xs={12}>
                    <Button
                        type='submit'
                        variant='outlined'
                        onClick={() => {
                            if (!data.user_id) return
                            destroy(route('campaign-registration.destroy', [campaign.id]))
                        }}>
                        {t('common.submit')}
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

CampaignKickModal.displayName = 'CampaignKickModal'
export default CampaignKickModal
