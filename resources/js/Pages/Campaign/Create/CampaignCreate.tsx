import {ThemeProvider} from '@mui/material/styles'
import {CampaignCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type CampaignCreateType = {
    characters: CharacterData[]
    adventures: adventureType[]
}

const CampaignCreate = ({characters, adventures}: CampaignCreateType) => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <CampaignCreateForm
                type='Create'
                characters={characters}
                adventures={adventures}
            />
        </ThemeProvider>
    )
}

CampaignCreate.displayName = 'CampaignCreate'
CampaignCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CampaignCreate
