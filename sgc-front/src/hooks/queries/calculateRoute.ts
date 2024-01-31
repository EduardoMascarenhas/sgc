import { gql } from '@apollo/client'

export const GET_CALCULATE_ROUTE_QUERY = gql`
    query CalculateRoute {
        calculateRoute
    }
`

export type OutputCalculateRoute = {
    calculateRoute: any
}
