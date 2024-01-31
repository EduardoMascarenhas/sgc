import { useLazyQuery } from '@apollo/client'
import {
    OutputCalculateRoute,
    GET_CALCULATE_ROUTE_QUERY,
} from './queries/calculateRoute'

const useCalculateRoute = () => {
    const [
        getCalculateRouteQuery,
        { loading: loadingGetCalculateRoute, error: errorGetCalculateRoute },
    ] = useLazyQuery<OutputCalculateRoute>(GET_CALCULATE_ROUTE_QUERY)

    const route = async () => {
        const response = await getCalculateRouteQuery()
        return {
            data: response.data?.calculateRoute,
            error: response.error?.message,
        }
    }

    return {
        route,
        loadingGetCalculateRoute,
        errorGetCalculateRoute,
    }
}

export { useCalculateRoute }
