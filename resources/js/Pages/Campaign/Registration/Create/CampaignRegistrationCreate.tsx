import {ThemeProvider} from '@mui/material/styles'
import {CampaignRegistrationForm} from 'Components'
import React from 'react'
// import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type CampaignRegistrationCreatePropType = {
    // campaign: CampaignData
    characters: CharacterData[]
}

const CampaignRegistrationCreate = ({
    // campaign,
    characters,
}: CampaignRegistrationCreatePropType) => (
    <ThemeProvider theme={theme}>
        <CampaignRegistrationForm
            // campaign={campaign}
            characters={characters}
        />
    </ThemeProvider>
)

CampaignRegistrationCreate.displayName = 'CampaignRegistrationCreate'
export default CampaignRegistrationCreate
