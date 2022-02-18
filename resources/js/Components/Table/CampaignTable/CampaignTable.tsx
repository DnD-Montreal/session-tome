import {useForm} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import {Box, Button, IconButton, Stack, Tooltip} from '@mui/material'
import {DataTable, DeleteModal, Link} from 'Components'
import React, {useState} from 'react'
import {CampaignData} from 'Types/campaign-data'
import route from 'ziggy-js'

type CampaignTablePropType = {
    data: CampaignData[]
    setIsEditDrawerOpen: (payload: boolean) => void
    setEditId: (payload: number) => void
    setEditData: (payload: CampaignData) => void
}

type FormDataType = {
    campaigns: number[]
}

const CampaignTable = ({
    data,
    setIsEditDrawerOpen,
    setEditId,
    setEditData,
}: CampaignTablePropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({campaigns: []})

    const leftActions = [
        <Link href={route('campaign.create')}>
            <Button variant='contained' startIcon={<AddIcon />}>
                Create
            </Button>
        </Link>,
        <Link href={route('campaign.index')}>
            <Button variant='contained' startIcon={<MeetingRoomIcon />}>
                Import
            </Button>
        </Link>,
    ]

    const columns = [
        {
            property: 'title',
            title: 'Title',
            render: (value: string, row: CampaignData) => (
                <Link href={route('campaign.show', [row.id])}>{value}</Link>
            ),
        },
        {
            property: 'code',
            title: 'Code',
        },
        {
            property: null,
            title: 'Actions',
            render: (row: CampaignData) => (
                <>
                    <IconButton
                        onClick={() => {
                            setEditData(row)
                            setEditId(row.id)
                            setIsEditDrawerOpen(true)
                        }}
                        aria-label='edit'>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='delete'>
                        <DeleteIcon
                            onClick={() => {
                                setData('campaigns', [row.id])
                                setIsDeleteModalOpen(true)
                            }}
                        />
                    </IconButton>
                </>
            ),
        },
    ]
    const bulkSelectActions = selected.length > 0 && (
        <Stack direction='row' justifyContent='flex-end'>
            <Tooltip title='Delete'>
                <IconButton>
                    <DeleteIcon
                        onClick={() => {
                            setData('campaigns', selected)
                            setIsDeleteModalOpen(true)
                        }}
                    />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (
        <Box>
            <DeleteModal
                open={isDeleteModalOpen}
                warningMessage='Are you sure you want to delete this/these Campaign(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('campaign.destroy'))
                    if (selected) {
                        setSelected([])
                    }
                }}
            />
            <DataTable
                leftActions={leftActions}
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='Campaigns'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['title']}
            />
        </Box>
    )
}

CampaignTable.displayName = 'CampaignTable'
export default CampaignTable
