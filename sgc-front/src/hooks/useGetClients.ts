import { useLazyQuery } from '@apollo/client'
import {
    FindClientsPaginatedInput,
    GetClientsOutput,
    GET_CLIENTS_QUERY,
    InputClient,
} from './queries/getClients'

const useGetClients = () => {
    const [
        getClientsQuery,
        { loading: loadingGetClients, error: errorGetClients },
    ] = useLazyQuery<GetClientsOutput, InputClient>(GET_CLIENTS_QUERY)

    const clients = async (data: FindClientsPaginatedInput) => {
        const response = await getClientsQuery({
            variables: { data },
        })
        return {
            data: response.data?.findClients,
            error: response.error?.message,
        }
    }

    return {
        clients,
        loadingGetClients,
        errorGetClients,
    }
}

export { useGetClients }
