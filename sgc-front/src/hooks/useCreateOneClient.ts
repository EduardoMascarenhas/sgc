import { useMutation } from '@apollo/client'
import {
    CreateClientInput,
    CreateClientOutput,
    CREATE_CLIENTE_MUTATION,
    ClienteInput,
} from './mutations/CreateCliente'

const useCreateCliente = () => {
    const [
        createClienteMutation,
        { loading: loadingCreateCliente, error: errorCreateCliente },
    ] = useMutation<CreateClientOutput, ClienteInput>(CREATE_CLIENTE_MUTATION)

    const createCliente = async (data: CreateClientInput) => {
        await createClienteMutation({
            variables: { data },
        })
    }

    return {
        createCliente,
        loadingCreateCliente,
        errorCreateCliente,
    }
}

export { useCreateCliente }
