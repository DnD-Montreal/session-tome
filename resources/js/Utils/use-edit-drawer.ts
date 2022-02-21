import {useState} from 'react'

export const useEditDrawer = <T>() => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<T>()

    return {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    }
}
