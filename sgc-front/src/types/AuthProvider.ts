import { IAdmin } from '../interfaces/IAdmin'

export type AuthValuesType = {
    loading: boolean
    error: boolean
    errorMessage: string
    setLoading: (value: boolean) => void
    logout: () => void
    isInitialized: boolean
    accessToken: string
    admin: IAdmin | null
    setAdmin: (value: IAdmin | null) => void
    setIsInitialized: (value: boolean) => void
    login: (admin: IAdmin, token: string) => void
}
