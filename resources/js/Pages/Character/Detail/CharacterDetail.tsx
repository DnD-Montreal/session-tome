import React, {useState} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import {getFontTheme} from '../../../Utils/theme'
import {ApplicationLayout} from '../../../Layouts'
import {
    CharacterDetailBox,
    CharacterDetailTable,
} from '../../../Components/CharacterDetail'
import {
    CharacterDetailData,
    RowData,
} from '../../../../mock/character-detail-data'

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
