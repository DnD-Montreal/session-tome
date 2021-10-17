import React, {useState} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import {getFontTheme} from '../../Utils/theme'
import {ApplicationLayout} from '../../Layouts'
import CharacterDetailBox from './CharacterDetailBox'
import CharacterDetailTable from './CharacterDetailTable'
import {CharacterDetailData, RowData} from './CharacterDetailData'

const CharacterDetail = () => {
    const [rows] = useState<RowData[]>(CharacterDetailData)
    const theme = getFontTheme('Form', 14)

    return (
        <>
            <ThemeProvider theme={theme}>
                <CharacterDetailBox />
                <CharacterDetailTable rows={rows} />
            </ThemeProvider>
        </>
    )
}

CharacterDetail.displayName = 'CharacterDetail'
CharacterDetail.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)

export default CharacterDetail
