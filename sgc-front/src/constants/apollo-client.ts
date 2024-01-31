import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { API_URL } from './urls'

//@ts-ignore
const httpUploadLink = new createUploadLink({
    uri: `${API_URL}/graphql`,
    credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('#TOKEN_SGC')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false,
    }),
    link: authLink.concat(httpUploadLink),
})

export default client
