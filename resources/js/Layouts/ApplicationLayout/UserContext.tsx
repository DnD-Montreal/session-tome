import {createContext} from 'react'

export const UserContext = createContext<{[key: string]: any; id: number} | null>(null)
