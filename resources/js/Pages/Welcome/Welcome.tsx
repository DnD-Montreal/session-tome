import {Grid, Link, Typography} from '@mui/material'
import i18n from 'i18next'
import dice from 'Icons/dice.svg'
import dndBanner from 'Images/dnd-banner.png'
import {useTranslation} from 'react-i18next'
import SVG from 'react-inlinesvg'
import styled from 'styled-components'
import {UserType} from 'Types/global'

const Container = styled.div`
    text-align: center;
    max-width: 70%;
    margin: 0px auto;

    @media only screen and (max-width: 1200px) {
        width: 100%;
    }
`

const StyledImg = styled.img`
    width: 100%;
`

const StyledSVG = styled(SVG)`
    margin-right: 0.5em;
`

const StyledText = styled.p`
    font-family: 'Cinzel Decorative', cursive;
    font-size: 16px;
    display: inline;
    text-align: center;
`

const StyledTypography = styled(Typography)<{align?: string}>`
    text-align: ${(props) => (props.align ? props.align : 'start')};
    margin-bottom: 12px;
`

const StyledLink = styled(Link)`
    display: inline;
    text-decoration: none;
`

const LanguageSelector = styled(Typography)`
    cursor: pointer;
`

type WelcomeProps = {
    auth: {
        user: UserType | null
    }
}

const Welcome = (props: WelcomeProps) => {
    const {t} = useTranslation()
    const {auth} = props
    const {user} = auth

    return (
        <Container>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <StyledTypography align='center'>
                        {t('welcome.welcome-text-1')}
                        <StyledText>{t('welcome.session-tome')}</StyledText>
                    </StyledTypography>
                    <StyledTypography align='center'>
                        {t('welcome.welcome-text-2')}
                    </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                    <StyledImg src={dndBanner} alt='dungeon-and-dragons-banner' />
                </Grid>
                <Grid item md={6} xs={12}>
                    <StyledTypography variant='h4'>
                        <StyledSVG src={dice} />
                        {t('welcome.what-is-dnd')}
                    </StyledTypography>
                    <StyledTypography>{t('welcome.dnd-definition')}</StyledTypography>
                    <StyledTypography>
                        {t('welcome.more-definition')}{' '}
                        <StyledLink href='https://dnd.wizards.com/what-is-dnd' target='_blank'>
                            official Wizards of the Coast website.
                        </StyledLink>
                    </StyledTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <StyledTypography variant='h4'>
                        <StyledSVG src={dice} />
                        {t('welcome.what-is-adventure-league')}
                    </StyledTypography>
                    <StyledTypography>{t('welcome.adventure-league-definition')}</StyledTypography>
                    <StyledTypography>
                        {t('welcome.more-definition')}{' '}
                        <StyledLink
                            href='http://dndadventurersleague.org/start-here/'
                            target='_blank'>
                            official website.
                        </StyledLink>
                    </StyledTypography>
                </Grid>
                {!user && (
                    <Grid item xs={12}>
                        <Container style={{width: '20%'}}>
                            <LanguageSelector onClick={() => i18n.changeLanguage('en')}>
                                English
                            </LanguageSelector>
                            <LanguageSelector onClick={() => i18n.changeLanguage('fr')}>
                                Français
                            </LanguageSelector>
                        </Container>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

Welcome.displayName = 'Welcome'

export default Welcome
