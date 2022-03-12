import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {CampaignCreateForm} from 'Components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type CampaignCreateType = {
    characters: CharacterData[]
    adventures: adventureType[]
}

const CampaignCreate = ({characters, adventures}: CampaignCreateType) => {
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <CampaignCreateForm type='Create' characters={characters} adventures={adventures} />
        </ThemeProvider>
    )
}

CampaignCreate.displayName = 'CampaignCreate'
export default CampaignCreate
