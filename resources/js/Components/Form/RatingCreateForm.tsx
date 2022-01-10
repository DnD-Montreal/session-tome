/* eslint-disable no-unused-vars */
import {useForm} from '@inertiajs/inertia-react'
import BrushIcon from '@mui/icons-material/Brush'
import CableIcon from '@mui/icons-material/Cable'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import TimerIcon from '@mui/icons-material/Timer'
import {Box, Button, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {RatingData} from 'Types/rating-data'

type RatingCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: RatingData
    editId?: number
}
type RatingDataType = {
    entry_id: number
    user_id: number
    author_id: number
    rating_data: RatingCategoryType
}

type RatingCategoryType = {
    creative: boolean
    flexible: boolean
    friendly: boolean
    helpful: boolean
    prepared: boolean
}

const StyledBox = styled(Box)`
    padding: 32px 0px 0px 0px;
`

const StyledTypography = styled(Typography)`
    margin-bottom: 32px;
`

const RatingCreateForm = ({
    type,
    onCloseDrawer = () => {},
    editData,
    editId = 0,
}: RatingCreateFormPropType) => {
    const RATING_CREATE_FORM_INITIAL_VALUE: RatingDataType = {
        entry_id: 0,
        user_id: 0,
        author_id: 0,
        rating_data: {
            creative: false,
            flexible: false,
            friendly: false,
            helpful: false,
            prepared: false,
        },
    }
    const RATING_FORM_INITIAL_VALUE: RatingDataType =
        type === 'Create'
            ? RATING_CREATE_FORM_INITIAL_VALUE
            : {
                  entry_id: editData?.entry_id || 0,
                  user_id: editData?.user_id || 0,
                  author_id: editData?.author_id || 0,
                  rating_data: {
                      creative: true,
                      flexible: true,
                      friendly: true,
                      helpful: true,
                      prepared: true,
                  },
              }

    const {data, setData, errors, clearErrors, put} = useForm(RATING_FORM_INITIAL_VALUE)

    // const handleCategories = (event: React.MouseEvent<HTMLElement>, newCategories: string[]) => {
    //     setCategories(newCategories)
    // }

    console.log()

    return (
        <>
            <StyledBox>
                <StyledTypography>
                    Select what you like about your Game Master.
                </StyledTypography>
                <Button
                // onClick={() => setData('rating_data', {
                //     creative: !data.rating_data.creative,
                //     ...data.rating_data,
                //   })}
                >
                    <BrushIcon fontSize='small' />
                    Creative
                </Button>
                <ToggleButtonGroup
                    fullWidth
                    color='secondary'
                    // onChange={handleCategories}
                    aria-label='game master rating'
                    style={{marginBottom: 32}}>
                    <ToggleButton value='creative' aria-label='creative'>
                        <BrushIcon fontSize='small' />
                        Creative
                    </ToggleButton>
                    <ToggleButton value='flexible' aria-label='flexible'>
                        <CableIcon fontSize='small' />
                        Flexible
                    </ToggleButton>
                    <ToggleButton value='friendly' aria-label='friendly'>
                        <SentimentSatisfiedAltIcon fontSize='small' />
                        Friendly
                    </ToggleButton>
                    <ToggleButton value='helpful' aria-label='helpful'>
                        <EventAvailableIcon fontSize='small' />
                        Helpful
                    </ToggleButton>
                    <ToggleButton value='prepared' aria-label='prepared'>
                        <TimerIcon fontSize='small' />
                        Prepared
                    </ToggleButton>
                </ToggleButtonGroup>
            </StyledBox>
        </>
    )
}

RatingCreateForm.displayName = 'RatingCreateForm'
export default RatingCreateForm
