import BrushIcon from '@mui/icons-material/Brush'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import CableIcon from '@mui/icons-material/Cable'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import TimerIcon from '@mui/icons-material/Timer'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import {Box, Button, Stack, Typography} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {RatingCategoryType} from 'Types/rating-data'

type RatingFormPropType = {
    data: RatingCategoryType
    setData: (key: string, value: any) => void
}

const StyledBox = styled(Box)`
    padding: 32px 0px 0px 0px;
`

const StyledTypography = styled(Typography)`
    margin-bottom: 32px;
`

const StyledButton = styled(Button)`
    color: 'white',
    borderColor: 'white',
    backgroundColor: ${(props) => (props.className === 'filled' ? 'white' : 'blue')};
    '&:hover': {
        backgroundColor: '#84bbf3',
        borderColor: 'white',
    },
`

const RatingForm = ({data, setData}: RatingFormPropType) => (
    <>
        <StyledBox>
            <StyledTypography>
                Select what you like about your Game Master.
            </StyledTypography>
            <Stack spacing={2} direction='row'>
                <StyledButton
                    onClick={() => {
                        setData('rating_data', {...data, creative: !data.creative})
                    }}
                    variant={data.creative ? 'contained' : 'outlined'}
                    startIcon={
                        data.creative ? (
                            <BrushIcon fontSize='small' />
                        ) : (
                            <BrushOutlinedIcon fontSize='small' />
                        )
                    }
                    className={data.creative ? 'filled' : ''}
                    aria-label='creative'>
                    Creative
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        setData('rating_data', {...data, flexible: !data.flexible})
                    }}
                    variant={data.flexible ? 'contained' : 'outlined'}
                    startIcon={
                        data.flexible ? (
                            <CableIcon fontSize='small' />
                        ) : (
                            <CableIcon fontSize='small' />
                        )
                    }
                    className={data.flexible ? 'filled' : ''}
                    aria-label='flexible'>
                    Flexible
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        setData('rating_data', {...data, friendly: !data.friendly})
                    }}
                    variant={data.friendly ? 'contained' : 'outlined'}
                    startIcon={
                        data.friendly ? (
                            <EmojiEmotionsIcon fontSize='small' />
                        ) : (
                            <EmojiEmotionsOutlinedIcon fontSize='small' />
                        )
                    }
                    className={data.friendly ? 'filled' : ''}
                    aria-label='Friendly'>
                    Friendly
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        setData('rating_data', {...data, helpful: !data.helpful})
                    }}
                    variant={data.helpful ? 'contained' : 'outlined'}
                    startIcon={
                        data.helpful ? (
                            <EventAvailableIcon fontSize='small' />
                        ) : (
                            <EventAvailableOutlinedIcon fontSize='small' />
                        )
                    }
                    className={data.helpful ? 'filled' : ''}
                    aria-label='helpful'>
                    Helpful
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        setData('rating_data', {...data, prepared: !data.prepared})
                    }}
                    variant={data.prepared ? 'contained' : 'outlined'}
                    startIcon={
                        data.prepared ? (
                            <TimerIcon fontSize='small' />
                        ) : (
                            <TimerOutlinedIcon fontSize='small' />
                        )
                    }
                    className={data.prepared ? 'filled' : ''}
                    aria-label='prepared'>
                    Prepared
                </StyledButton>
            </Stack>
        </StyledBox>
    </>
)

RatingForm.displayName = 'RatingForm'
export default RatingForm
