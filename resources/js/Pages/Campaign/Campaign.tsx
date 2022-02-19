import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import {Button} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Link} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
// import {CampaignData} from 'Types/campaign-data'
// import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const theme = getFontTheme('Form', 16)

type CampaignPropType = {
    // campaign: CampaignData
    // characters: CharacterData[]
}

const Campaign = () => (
    <ThemeProvider theme={theme}>
        <Link href={route('campaign-registration.create')}>
            <Button variant='contained' startIcon={<MeetingRoomOutlinedIcon />}>
                JOIN
            </Button>
        </Link>
    </ThemeProvider>
)

Campaign.displayName = 'Campaign'
Campaign.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Campaign
