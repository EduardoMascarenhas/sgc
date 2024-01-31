import { useMutation } from '@apollo/client'
import {
    CreateClientInput,
    CreateClientOutput,
    EDIT_CLIENTE_MUTATION,
    ClienteInput,
} from './mutations/EditCliente'

const useEditCliente = () => {
    const [
        editClienteMutation,
        { loading: loadingEditCliente, error: errorEditCliente },
    ] = useMutation<CreateClientOutput, ClienteInput>(EDIT_CLIENTE_MUTATION)

    const editCliente = async (data: CreateClientInput) => {
        await editClienteMutation({
            variables: { data },
        })
    }

    return {
        editCliente,
        loadingEditCliente,
        errorEditCliente,
    }
}

export { useEditCliente }
