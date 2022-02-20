import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import {Button} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CampaignJoinModal} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

const Campaign = () => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false)
    return (
        <ThemeProvider theme={theme}>
            <Button
                variant='contained'
                startIcon={<MeetingRoomOutlinedIcon />}
                onClick={() => setIsJoinModalOpen(true)}>
                JOIN
            </Button>
            <CampaignJoinModal
                open={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                message='Please enter the invite code of the campaign.'
            />
        </ThemeProvider>
    )
}

Campaign.displayName = 'Campaign'
Campaign.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Campaign
