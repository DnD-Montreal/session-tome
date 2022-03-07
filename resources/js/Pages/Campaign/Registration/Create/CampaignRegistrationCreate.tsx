import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {CampaignRegistrationForm} from 'Components'
import React from 'react'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type CampaignRegistrationCreatePropType = {
    campaign: CampaignData
    characters: CharacterData[]
}

const CampaignRegistrationCreate = ({
    campaign,
    characters,
}: CampaignRegistrationCreatePropType) => {
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 16, language)}>
            <CampaignRegistrationForm campaign={campaign} characters={characters} />
        </ThemeProvider>
    )
}

CampaignRegistrationCreate.displayName = 'CampaignRegistrationCreate'
export default CampaignRegistrationCreate
