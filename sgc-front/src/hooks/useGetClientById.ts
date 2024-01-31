import { useLazyQuery } from '@apollo/client'
import {
    OutputClientById,
    CLIENT_BY_ID_QUERY,
    InputClientById,
    FindClientInput,
} from './queries/clientById'

const useGetClienteById = () => {
    const [
        clienteByIdQuery,
        { loading: loadingGetClienteById, error: errorGetClienteById },
    ] = useLazyQuery<OutputClientById, InputClientById>(CLIENT_BY_ID_QUERY)

    const cliente = async (data: FindClientInput) => {
        const response = await clienteByIdQuery({
            variables: { data },
        })
        return {
            data: response.data?.findClient,
            error: response.error?.message,
        }
    }

    return {
        cliente,
        loadingGetClienteById,
        errorGetClienteById,
    }
}

export { useGetClienteById }
