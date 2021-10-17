import React, {useState} from 'react'
// eslint-disable-next-line import/extensions
import ApplicationLayout from '@/Layouts/ApplicationLayout'
import CharacterDetailBox from './CharacterDetailBox'
import CharacterDetailTable from './CharacterDetailTable'
import {CharacterDetailData, RowData} from './CharacterDetailData'

const CharacterDetail = () => {
    // eslint-disable-next-line no-unused-vars
    const [rows, setRows] = useState<RowData[]>(CharacterDetailData)

    return (
        <>
            <CharacterDetailBox />
            <CharacterDetailTable rows={rows} />
        </>
    )
}

CharacterDetail.displayName = 'CharacterDetail'
CharacterDetail.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)

export default CharacterDetail
