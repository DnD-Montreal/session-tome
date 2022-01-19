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
    ratings: RatingCategoryType
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

const RatingForm = ({ratings, setData}: RatingFormPropType) => (
    <StyledBox>
        <StyledTypography>Select what you like about your Game Master.</StyledTypography>
        <Stack spacing={2} direction='row'>
            <StyledButton
                onClick={() => {
                    setData('rating_data', {...ratings, creative: !ratings.creative})
                }}
                variant={ratings.creative ? 'contained' : 'outlined'}
                startIcon={
                    ratings.creative ? (
                        <BrushIcon fontSize='small' />
                    ) : (
                        <BrushOutlinedIcon fontSize='small' />
                    )
                }
                className={ratings.creative ? 'filled' : ''}
                aria-label='creative'>
                Creative
            </StyledButton>
            <StyledButton
                onClick={() => {
                    setData('rating_data', {...ratings, flexible: !ratings.flexible})
                }}
                variant={ratings.flexible ? 'contained' : 'outlined'}
                startIcon={<CableIcon fontSize='small' />}
                className={ratings.flexible ? 'filled' : ''}
                aria-label='flexible'>
                Flexible
            </StyledButton>
            <StyledButton
                onClick={() => {
                    setData('rating_data', {...ratings, friendly: !ratings.friendly})
                }}
                variant={ratings.friendly ? 'contained' : 'outlined'}
                startIcon={
                    ratings.friendly ? (
                        <EmojiEmotionsIcon fontSize='small' />
                    ) : (
                        <EmojiEmotionsOutlinedIcon fontSize='small' />
                    )
                }
                className={ratings.friendly ? 'filled' : ''}
                aria-label='friendly'>
                Friendly
            </StyledButton>
            <StyledButton
                onClick={() => {
                    setData('rating_data', {...ratings, helpful: !ratings.helpful})
                }}
                variant={ratings.helpful ? 'contained' : 'outlined'}
                startIcon={
                    ratings.helpful ? (
                        <EventAvailableIcon fontSize='small' />
                    ) : (
                        <EventAvailableOutlinedIcon fontSize='small' />
                    )
                }
                className={ratings.helpful ? 'filled' : ''}
                aria-label='helpful'>
                Helpful
            </StyledButton>
            <StyledButton
                onClick={() => {
                    setData('rating_data', {...ratings, prepared: !ratings.prepared})
                }}
                variant={ratings.prepared ? 'contained' : 'outlined'}
                startIcon={
                    ratings.prepared ? (
                        <TimerIcon fontSize='small' />
                    ) : (
                        <TimerOutlinedIcon fontSize='small' />
                    )
                }
                className={ratings.prepared ? 'filled' : ''}
                aria-label='prepared'>
                Prepared
            </StyledButton>
        </Stack>
    </StyledBox>
)

RatingForm.displayName = 'RatingForm'
export default RatingForm
