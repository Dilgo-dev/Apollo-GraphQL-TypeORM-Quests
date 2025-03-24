import { gql } from "@apollo/client";

export const GET_CARTOON = gql`
    query GetCartoons {
        getCartoons {
            id
            name
            description
        }
    }
`;
