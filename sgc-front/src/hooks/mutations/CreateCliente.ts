import { gql } from '@apollo/client'

export const CREATE_CLIENTE_MUTATION = gql`
    mutation AdminCreateClient($data: CreateClientInput!) {
        adminCreateClient(data: $data) {
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
