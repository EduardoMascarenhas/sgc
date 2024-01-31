import { gql } from '@apollo/client'

export const EDIT_CLIENTE_MUTATION = gql`
    mutation AdminEditClient($data: CreateClientInput!) {
        adminEditClient(data: $data) {
            coordX
            coordY
            createdAt
            email
            id
            name
            tel
            updatedAt
        }
    }
`

export type CreateClientInput = {
    id: number
    email: string
    name: string
    tel: string
    coordX: number
    coordY: number
}

export type ClienteInput = {
    data: CreateClientInput
}

export type CreateClientOutput = {
    user: CreateClientInput
}
