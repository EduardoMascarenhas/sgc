import { gql } from '@apollo/client'
import { IClient } from '../../interfaces/IClient'

export const GET_CLIENTS_QUERY = gql`
    query FindClients($data: FindClientsPaginatedInput!) {
        findClients(data: $data) {
            count
            clients {
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
    }
`

export type GetClientsOutput = {
    findClients: {
        clients: IClient[]
        count: number
    }
}

export type FindClientsPaginatedInput = {
    skip: number
    take: number
    name?: string
    email?: string
    tel?: string
}

export type InputClient = {
    data: FindClientsPaginatedInput
}
