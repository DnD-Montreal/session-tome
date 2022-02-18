import {useForm} from '@inertiajs/inertia-react'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {ErrorText} from 'Components'
import React from 'react'
import styled from 'styled-components'
import {CampaignData} from 'Types/campaign-data'
import route from 'ziggy-js'

type CampaignCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: CampaignData
    editId?: number
}

type CampaignFormDataType = {
    title: string | undefined
    code: string | undefined
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const CampaignCreateForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
}: CampaignCreateFormPropType) => {
    const CAMPAIGN_CREATE_FORM_INITIAL_VALUE: CampaignFormDataType = {
        title: '',
        code: '',
    }
    const CAMPAIGN_INITIAL_VALUE: CampaignFormDataType =
        type === 'Create'
            ? CAMPAIGN_CREATE_FORM_INITIAL_VALUE
            : {
                  title: editData?.title,
                  code: editData?.code,
              }

    const {data, setData, errors, put} =
        useForm<CampaignFormDataType>(CAMPAIGN_INITIAL_VALUE)

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        Fill out the following fields with your campaign details.
                    </Typography>
                </Grid>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        fullWidth
                        id='title'
                        label='Title'
                        name='Title'
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors?.title && <ErrorText message={errors?.title} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        fullWidth
                        id='code'
                        label='Code'
                        name='Code'
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                    />
                    {errors?.code && <ErrorText message={errors?.code} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button onClick={() => onCloseDrawer && onCloseDrawer()} fullWidth>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => {
                            put(route('campaign.update', [editId]))
                            if (onCloseDrawer) {
                                onCloseDrawer()
                            }
                        }}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

CampaignCreateForm.displayName = 'CampaignCreateForm'
export default CampaignCreateForm
