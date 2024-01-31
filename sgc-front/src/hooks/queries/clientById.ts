import { gql } from '@apollo/client'

export interface IClientModel {
    id: number
    name: string
    email: string
    tel: string
    coordX: number
    coordY: number
    createdAt: string
    updatedAt: string
}

export const CLIENT_BY_ID_QUERY = gql`
    query FindClient($data: FindClientInput!) {
        findClient(data: $data) {
            id
            name
            email
            tel
            coordX
            coordY
            createdAt
            updatedAt
        }
    }
`

export type OutputClientById = {
    findClient: IClientModel
}

export type FindClientInput = {
    id: number
}

export type InputClientById = {
    data: FindClientInput
}
