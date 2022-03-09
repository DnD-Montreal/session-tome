import BackpackIcon from '@mui/icons-material/Backpack'
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined'
import BrushIcon from '@mui/icons-material/Brush'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import CableIcon from '@mui/icons-material/Cable'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import {Box, Button, Grid, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {RatingCategoryType} from 'Types/rating-data'

type RatingFormPropType = {
    ratings?: RatingCategoryType | null
    setData: (key: string, value: any) => void
}

const StyledBox = styled(Box)`
    padding: 32px 0px 50px 0px;
`

const StyledTypography = styled(Typography)`
    margin-bottom: 32px;
`

const StyledButton = styled(Button)`
    width: 140px;
    height: 40px;
    color: white;
    border-color: white;
`

const RatingForm = ({ratings, setData}: RatingFormPropType) => {
    const {t} = useTranslation()
    return (
        <StyledBox>
            <StyledTypography>{t('rating.fill-out-fields')}</StyledTypography>
            <Grid container direction='row' spacing={2} justifyContent='center'>
                <Grid item xs={12} md>
                    <StyledButton
                        onClick={() => {
                            setData('rating_data', {
                                ...ratings,
                                creative: !ratings?.creative,
                            })
                        }}
                        variant={ratings?.creative ? 'contained' : 'outlined'}
                        startIcon={
                            ratings?.creative ? (
                                <BrushIcon fontSize='small' />
                            ) : (
                                <BrushOutlinedIcon fontSize='small' />
                            )
                        }
                        className={ratings?.creative ? 'filled' : ''}
                        aria-label='creative'>
                        {t('enums.creative')}
                    </StyledButton>
                </Grid>
                <Grid item xs={12} md>
                    <StyledButton
                        onClick={() => {
                            setData('rating_data', {
                                ...ratings,
                                flexible: !ratings?.flexible,
                            })
                        }}
                        variant={ratings?.flexible ? 'contained' : 'outlined'}
                        startIcon={<CableIcon fontSize='small' />}
                        className={ratings?.flexible ? 'filled' : ''}
                        aria-label='flexible'>
                        {t('enums.flexible')}
                    </StyledButton>
                </Grid>
                <Grid item xs={12} md>
                    <StyledButton
                        onClick={() => {
                            setData('rating_data', {
                                ...ratings,
                                friendly: !ratings?.friendly,
                            })
                        }}
                        variant={ratings?.friendly ? 'contained' : 'outlined'}
                        startIcon={
                            ratings?.friendly ? (
                                <EmojiEmotionsIcon fontSize='small' />
                            ) : (
                                <EmojiEmotionsOutlinedIcon fontSize='small' />
                            )
                        }
                        className={ratings?.friendly ? 'filled' : ''}
                        aria-label='friendly'>
                        {t('enums.friendly')}
                    </StyledButton>
                </Grid>
                <Grid item xs={12} md>
                    <StyledButton
                        onClick={() => {
                            setData('rating_data', {
                                ...ratings,
                                helpful: !ratings?.helpful,
                            })
                        }}
                        variant={ratings?.helpful ? 'contained' : 'outlined'}
                        startIcon={
                            ratings?.helpful ? (
                                <BackpackIcon fontSize='small' />
                            ) : (
                                <BackpackOutlinedIcon fontSize='small' />
                            )
                        }
                        className={ratings?.helpful ? 'filled' : ''}
                        aria-label='helpful'>
                        {t('enums.helpful')}
                    </StyledButton>
                </Grid>
                <Grid item xs={12} md>
                    <StyledButton
                        onClick={() => {
                            setData('rating_data', {
                                ...ratings,
                                prepared: !ratings?.prepared,
                            })
                        }}
                        variant={ratings?.prepared ? 'contained' : 'outlined'}
                        startIcon={
                            ratings?.prepared ? (
                                <FactCheckIcon fontSize='small' />
                            ) : (
                                <FactCheckOutlinedIcon fontSize='small' />
                            )
                        }
                        className={ratings?.prepared ? 'filled' : ''}
                        aria-label='prepared'>
                        {t('enums.prepared')}
                    </StyledButton>
                </Grid>
            </Grid>
        </StyledBox>
    )
}

RatingForm.displayName = 'RatingForm'
export default RatingForm
