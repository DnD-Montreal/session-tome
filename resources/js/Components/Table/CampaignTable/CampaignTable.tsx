import {useForm} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoom'
import {Box, Button, IconButton} from '@mui/material'
import {objectArrayFormatter} from '@Utils/formatter'
import {CampaignJoinModal, DataTable, DeleteModal, Link} from 'Components'
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
    campaign: number
}

const CampaignTable = ({
    data,
    setIsEditDrawerOpen,
    setEditId,
    setEditData,
}: CampaignTablePropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false)
    const {
        data: formData,
        setData,
        delete: destroy,
    } = useForm<FormDataType>({
        campaign: 0,
    })

    const leftActions = [
        <Link href={route('campaign.create')}>
            <Button variant='contained' startIcon={<AddIcon />}>
                Create
            </Button>
        </Link>,
        <Button
            variant='contained'
            startIcon={<MeetingRoomOutlinedIcon />}
            onClick={() => setIsJoinModalOpen(true)}>
            JOIN
        </Button>,
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
            property: 'characters',
            title: 'Character',
            render: (value: any) => objectArrayFormatter(value),
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
                                setData('campaign', row.id)
                                setIsDeleteModalOpen(true)
                            }}
                        />
                    </IconButton>
                </>
            ),
        },
    ]

    return (
        <Box>
            <DeleteModal
                open={isDeleteModalOpen}
                warningMessage='Are you sure you want to delete this/these Campaign(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('campaign.destroy', [formData.campaign]))
                    if (selected) {
                        setSelected([])
                    }
                }}
            />
            <CampaignJoinModal
                open={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                message='Please enter the invite code of the campaign.'
            />
            <DataTable
                leftActions={leftActions}
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='Campaigns'
                filterProperties={['title']}
            />
        </Box>
    )
}

CampaignTable.displayName = 'CampaignTable'
export default CampaignTable
