import { useRouter } from 'next/router'
import { createContext, useEffect, useState, ReactNode } from 'react'
import { IAdmin } from '../../interfaces/IAdmin'
import { AuthValuesType } from '../../types/AuthProvider'

const defaultProvider: AuthValuesType = {
    admin: null,
    loading: true,
    error: false,
    errorMessage: '',
    accessToken: '',
    setAdmin: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    isInitialized: false,
    logout: () => Promise.resolve(),
    setIsInitialized: () => Boolean,
}

type Props = {
    children: ReactNode
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }: Props) => {
    // ** States
    const [admin, setAdmin] = useState<IAdmin | null>(defaultProvider.admin)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
    const [isInitialized, setIsInitialized] = useState<boolean>(
        defaultProvider.isInitialized
    )
    const [accessToken, setAccessToken] = useState<string>(
        defaultProvider.accessToken
    )
    const [error, setError] = useState<boolean>(defaultProvider.error)
    const [errorMessage, setErrorMessage] = useState<string>(
        defaultProvider.errorMessage
    )

    // ** Hooks
    const router = useRouter()

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            setIsInitialized(true)
            const storedToken1 = await window.localStorage.getItem('#TOKEN_SGC')
            const storedToken2 = await window.localStorage.getItem(
                'LoggedAdminSGC'
            )

            if (storedToken1 && storedToken2) {
                setLoading(true)
                const decodedToken = parseJwt(storedToken1 as string)
                if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
                    handleLogout()
                }
                setLoading(false)
            } else {
                await window.localStorage.removeItem('#TOKEN_SGC')
                await window.localStorage.removeItem('LoggedAdminSGC')
                setAdmin(null)
                setLoading(false)
                router.push('/login')
            }
        }
        initAuth()
    }, [])

    const handleLogout = async () => {
        setAdmin(null)
        setIsInitialized(false)
        await window.localStorage.removeItem('#TOKEN_SGC')
        await window.localStorage.removeItem('LoggedAdminSGC')
        router.push('/login')
    }

    const handleLogin = async (admin: IAdmin, token: string) => {
        const loggedAdmin = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
        }
        console.log('thisAdmin: ', admin, 'thisToken: ', token)
        await window.localStorage.setItem('#TOKEN_SGC', token)
        await window.localStorage.setItem(
            'LoggedAdminSGC',
            JSON.stringify(loggedAdmin)
        )
        setAccessToken(token)
        setAdmin(admin)
        const returnUrl = router.query.returnUrl
        const redirectURL =
            returnUrl && returnUrl !== '/dashboard' ? returnUrl : '/dashboard'
        router.replace(redirectURL as string)
    }

    const values = {
        admin,
        loading,
        error,
        errorMessage,
        setAdmin,
        accessToken,
        setLoading,
        isInitialized,
        setIsInitialized,
        login: handleLogin,
        logout: handleLogout,
    }

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}

const parseJwt = (token: any) => {
    try {
        return JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString('ascii')
        )
    } catch (e) {
        return null
    }
}

export { AuthContext, AuthProvider, parseJwt }
