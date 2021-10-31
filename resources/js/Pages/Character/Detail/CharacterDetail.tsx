import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import {ApplicationLayout} from 'Layouts'
import {getFontTheme} from 'Utils'
import {CharacterDetailBox, CharacterDetailTable} from 'Components'
import {CharacterDetailData} from '../../../../mock/character-detail-data'

const CharacterDetail = () => {
    const theme = getFontTheme('Form', 14)

    return (
        <>
            <ThemeProvider theme={theme}>
                <CharacterDetailBox />
                <CharacterDetailTable rows={CharacterDetailData} />
            </ThemeProvider>
        </>
    )
}

CharacterDetail.displayName = 'CharacterDetail'
CharacterDetail.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)

export default CharacterDetail
