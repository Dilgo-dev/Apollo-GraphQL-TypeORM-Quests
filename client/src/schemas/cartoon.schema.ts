import { gql } from "@apollo/client";

export const GET_CARTOONS = gql`
    query GetCartoons {
        getCartoons {
            id
            name
            description
        }
    }
`;
