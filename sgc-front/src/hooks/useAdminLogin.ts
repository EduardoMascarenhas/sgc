import { gql, useMutation, useQuery } from '@apollo/client'
import { IAdmin } from '../interfaces/IAdmin'

interface SigninAdminInput {
    data: {
        email: string
        password: string
    }
}

const SIGNIN_ADMIN = gql`
    mutation SignInAdmin($data: SigninAdminInput!) {
        signInAdmin(data: $data) {
            admin {
                createdAt
                email
                id
                name
                updatedAt
            }
            token
        }
    }
`

const useAdminLogin = () => {
    return useMutation<IAdmin, SigninAdminInput>(SIGNIN_ADMIN)
}

export default useAdminLogin
