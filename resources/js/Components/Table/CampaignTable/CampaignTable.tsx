import {useForm} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoom'
import {Alert, Box, Button, IconButton, Snackbar} from '@mui/material'
import {objectArrayFormatter} from '@Utils/formatter'
import {CampaignJoinModal, DataTable, DeleteModal, Link} from 'Components'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
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
    const {t} = useTranslation()
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false)
    const [openInviteSnackbar, setOpenInviteSnackbar] = useState(false)
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
                {t('common.create')}
            </Button>
        </Link>,
        <Button
            variant='contained'
            startIcon={<MeetingRoomOutlinedIcon />}
            onClick={() => setIsJoinModalOpen(true)}>
            {t('common.join')}
        </Button>,
    ]

    const columns = [
        {
            property: 'title',
            title: t('tableColumn.title'),
            render: (value: string, row: CampaignData) => (
                <Link href={route('campaign.show', [row.id])}>{value}</Link>
            ),
        },
        {
            property: 'characters',
            title: t('tableColumn.characters'),
            render: (value: any) => objectArrayFormatter(value),
        },
        {
            property: 'code',
            title: t('tableColumn.code'),
            render: (value: string) => (
                <Button
                    style={{textTransform: 'none'}}
                    color='info'
                    onClick={() => {
                        navigator.clipboard.writeText(value)
                        setOpenInviteSnackbar(true)
                    }}>
                    {value}
                </Button>
            ),
        },
        {
            property: null,
            title: t('tableColumn.actions'),
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
                    <IconButton
                        aria-label='delete'
                        onClick={() => {
                            setData('campaign', row.id)
                            setIsDeleteModalOpen(true)
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ]

    return (
        <Box>
            <DeleteModal
                open={isDeleteModalOpen}
                warningMessage={t('campaign.delete-message')}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('campaign.destroy', [formData.campaign]))
                    if (selected) {
                        setSelected([])
                    }
                }}
            />
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openInviteSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenInviteSnackbar(false)}>
                <Alert severity='success'>{t('campaignDetail.invite-copied')}</Alert>
            </Snackbar>
            <CampaignJoinModal open={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
            <DataTable
                leftActions={leftActions}
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='campaigns'
                filterProperties={['title']}
            />
        </Box>
    )
}

CampaignTable.displayName = 'CampaignTable'
export default CampaignTable
