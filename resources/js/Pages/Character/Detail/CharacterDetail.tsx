import React, {useState} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import {ApplicationLayout} from 'Layouts'
import {getFontTheme} from 'Utils'
import {CharacterDetailBox, CharacterDetailTable} from 'Components'
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
