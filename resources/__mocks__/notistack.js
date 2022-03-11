import {SnackbarProvider} from 'notistack'

export const useSnackbar = () => ({
    enqueueSnackbar: jest.fn(),
})

export {SnackbarProvider}
