import {Link, useForm, usePage} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
    Box,
    Button,
    Grid,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import {ErrorText} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {EntriesData} from 'Types/entries-data'
import {UsePageType} from 'Types/global'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

type DmEntryCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
}
type ItemDataType = {
    name: string
    description: string | null
    rarity: string
    tier: number
}

type DmEntryFormDataType = {
    adventure_id: number
    length: number
    location: string
    date_played: string | null
    notes: string
    items: ItemData[]
    type: string
    user_id: number | null | undefined
}

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
`

const FormBox = styled(Box)`
    flexgrow: 1;
    margin-top: 16px;
`

const StyledGrid = styled(Grid)`
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`
const StyledDateGrid = styled(Grid)`
    margin-top: 32px;
    margin-bottom: 23px;
`

const StyledFooter = styled(Grid)`
    min-width: 25vw;
`
const StyledItemsFooter = styled(Grid)`
    margin-top: 16px;
    min-width: 25vw;
`

const DmEntryCreateForm = ({
    type,
    onCloseDrawer = () => {},
    editData,
    editId = 0,
}: DmEntryCreateFormPropType) => {
    const {auth, adventures} = usePage<UsePageType>().props
    const {user} = auth
    const RARITY = ['common', 'uncommon', 'rare', 'very_rare', 'legendary']
    const ITEM_CREATE_FORM_INITIAL_VALUE: ItemDataType = {
        name: '',
        description: '',
        rarity: '',
        tier: 1,
    }
    const DM_ENTRY_CREATE_FORM_INITIAL_VALUE: DmEntryFormDataType = {
        adventure_id: 0,
        user_id: user?.id,
        length: 0,
        location: '',
        date_played: new Date().toDateString(),
        notes: '',
        items: [],
        type: 'dm',
    }
    const DM_ENTRY_FORM_INITIAL_VALUE: DmEntryFormDataType =
        type === 'Create'
            ? DM_ENTRY_CREATE_FORM_INITIAL_VALUE
            : {
                  adventure_id: editData?.adventure || 0,
                  length: editData?.length || 0,
                  location: editData?.location || '',
                  date_played: editData?.date_played || new Date().toDateString(),
                  notes: editData?.notes || '',
                  items: editData?.items || [],
                  type: 'dm',
                  user_id: user?.id,
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(
        DM_ENTRY_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)
    const [item_data, setItemData] = useState<ItemData>({
        name: '',
        description: '',
        rarity: '',
        tier: 1,
    })
    const [items, setItems] = useState<ItemData[]>([])
    const [isItemsVisible, setIsItemsVisible] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleDelete = (chipToDelete: ItemData) => () => {
        setItems((chips) => chips.filter((chip) => chip.name !== chipToDelete.name))
    }
    return (
        <FormBox>
            <Stepper activeStep={activeStep}>
                <Step completed={activeStep > 0}>
                    <StepLabel>Details</StepLabel>
                </Step>
                <Step completed={activeStep > 1}>
                    <StepLabel>Magic Items</StepLabel>
                </Step>
            </Stepper>
            <StyledBox>
                {activeStep === 0 && (
                    <>
                        <Typography>
                            Fill out the following fields with your DM Entry details.
                        </Typography>
                        <Grid container>
                            <StyledDateGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label='Date'
                                        value={data.date_played}
                                        inputFormat='yyyy-MM-dd'
                                        onChange={(e) => {
                                            setData('date_played', e)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                                {errors?.date_played && (
                                    <ErrorText message={errors?.date_played} />
                                )}
                            </StyledDateGrid>
                            {type === 'Create' && <StyledGrid item md={4} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='adventure_id'
                                    select
                                    required
                                    label='Adventure'
                                    name='Adventure Title'
                                    SelectProps={{
                                        MenuProps: {PaperProps: {sx: {maxHeight: 300}}},
                                    }}
                                    value={data.adventure_id}
                                    onChange={(e) =>
                                        setData('adventure_id', parseInt(e.target.value))
                                    }>
                                    {adventures.map(
                                        (option: {id: number; title: string}) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.title}
                                            </MenuItem>
                                        ),
                                    )}
                                </TextField>
                                {errors?.adventure_id && (
                                    <ErrorText message={errors?.adventure_id} />
                                )}
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='length'
                                    label='Length'
                                    name='Length'
                                    type='number'
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    value={data.length.toString()}
                                    onChange={(e) =>
                                        setData('length', parseInt(e.target.value))
                                    }
                                />
                                {errors?.length && <ErrorText message={errors?.length} />}
                            </StyledGrid>
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='location'
                                    label='Location'
                                    name='Location'
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                {errors?.location && (
                                    <ErrorText message={errors?.location} />
                                )}
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='notes'
                                    label='Notes'
                                    name='Notes'
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                />
                                {errors?.notes && <ErrorText message={errors?.notes} />}
                            </StyledGrid>
                        </Grid>
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <Typography>
                            Fill out the following fields with your DM Entry details.
                        </Typography>
                        <Grid container>
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='name'
                                    label='Name'
                                    name='Name'
                                    value={item_data.name}
                                    onChange={(e) =>
                                        setItemData({
                                            name: e.target.value,
                                            description: item_data.description,
                                            rarity: item_data.rarity,
                                            tier: item_data.tier,
                                        })
                                    }
                                />
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={5} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='tier'
                                    label='Tier'
                                    name='Tier'
                                    type='number'
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 4,
                                        },
                                    }}
                                    value={item_data.tier.toString()}
                                    onChange={(e) =>
                                        setItemData({
                                            name: item_data.name,
                                            description: item_data.description,
                                            rarity: item_data.rarity,
                                            tier: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </StyledGrid>

                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <FormControl fullWidth>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='rarity'
                                        select
                                        label='Rarity'
                                        name='Rarity'
                                        value={item_data.rarity}
                                        onChange={(e) =>
                                            setItemData({
                                                name: item_data.name,
                                                description: item_data.description,
                                                rarity: e.target.value,
                                                tier: item_data.tier,
                                            })
                                        }>
                                        {RARITY.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option.replace('_', ' ')}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </StyledGrid>

                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 12}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='description'
                                    label='Description'
                                    name='Description'
                                    value={item_data.description}
                                    onChange={(e) =>
                                        setItemData({
                                            name: item_data.name,
                                            description: e.target.value,
                                            rarity: item_data.rarity,
                                            tier: item_data.tier,
                                        })
                                    }
                                />
                            </StyledGrid>
                        </Grid>
                    </>
                )}
            </StyledBox>
            <StyledFooter container>
                {activeStep === 0 && (
                    <>
                        <Grid container spacing={2} />
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            {type === 'Create' ? (
                                <Link href={route('character.index')}>
                                    <Button fullWidth>Cancel</Button>
                                </Link>
                            ) : (
                                <Button onClick={() => onCloseDrawer()} fullWidth>
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                        <Grid item md={type === 'Edit' ? 4 : 8} />
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            <Button
                                variant='contained'
                                onClick={() => setActiveStep(1)}
                                fullWidth>
                                Continue
                            </Button>
                        </Grid>
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                                <Button
                                    onClick={() => {
                                        setActiveStep(0)
                                        setIsItemsVisible(false)
                                    }}
                                    fullWidth>
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item md={type === 'Edit' ? 4 : 6} />
                            <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                                {type === 'Create' ? (
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        onClick={() => {
                                            if (
                                                !(
                                                    items.filter(
                                                        (e) => e.name === item_data.name,
                                                    ).length > 0
                                                )
                                            ) {
                                                setError(false)
                                                setItems([...items, item_data])
                                                setData('items', [...items, item_data])
                                                setIsItemsVisible(true)
                                                setItemData(
                                                    ITEM_CREATE_FORM_INITIAL_VALUE,
                                                )
                                            } else {
                                                setError(true)
                                            }
                                        }}>
                                        Add Item
                                    </Button>
                                ) : null}
                            </Grid>
                            <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={() => {
                                        if (type === 'Create') {
                                            post(route('entry.store'))
                                            if (errors) {
                                                setIsItemsVisible(false)
                                                setActiveStep(0)
                                            } else {
                                                clearErrors()
                                            }
                                        }
                                        if (type === 'Edit') {
                                            put(route('entry.update', [editId]))
                                            if (Object.keys(errors).length) {
                                                setIsItemsVisible(false)
                                                setActiveStep(0)
                                            } else {
                                                clearErrors()
                                                onCloseDrawer()
                                            }
                                        }
                                    }}>
                                    {type === 'Create' ? 'Create' : 'Save'}
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </StyledFooter>
            {isItemsVisible ? (
                <StyledItemsFooter container spacing={1}>
                    <StyledGrid item xs={12}>
                        <Typography variant='body2'>New Magic Items</Typography>
                    </StyledGrid>
                    {error ? (
                        <StyledGrid item xs={12}>
                            <Alert variant='outlined' severity='error'>
                                Magic item already exists!
                            </Alert>
                        </StyledGrid>
                    ) : null}
                    {items.map((item) => (
                        <StyledGrid item xs='auto' key={item.name}>
                            <Chip
                                variant='outlined'
                                label={item.name}
                                sx={{color: '#86B8F4', borderColor: '#86B8F4'}}
                                onDelete={handleDelete(item)}
                            />
                        </StyledGrid>
                    ))}
                </StyledItemsFooter>
            ) : null}
        </FormBox>
    )
}

DmEntryCreateForm.displayName = 'DmEntryCreateForm'
export default DmEntryCreateForm
