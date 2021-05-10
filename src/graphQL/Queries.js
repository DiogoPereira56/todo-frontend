import { gql } from '@apollo/client';

export const DECODED_TOKEN = gql`
    {
        getDecodedToken {
            id
            name
        }
    }
`;

export const LOG_OUT = gql`
    {
        removeToken
    }
`;

export const GET_ALL_LISTS = gql`
    {
        lists {
            idList
            idClient
            listName
        }
    }
`;

export const GET_CLIENT_INFORMATION = gql`
    {
        getClientInformation {
            idClient
            name
            lists {
                idList
                idClient
                listName
            }
        }
    }
`;

export const GET_CLIENT = gql`
    query($limit: Float!, $offset: Float!) {
        getClientInformation {
            idClient
            name
            list(limit: $limit, offset: $offset) {
                idList
                listName
                idClient
            }
        }
    }
`;
export const CLIENT_TOTAL_LISTS = gql`
    {
        getTotalLists
    }
`;

export const GET_CLIENT_TOTAL_TASKS = gql`
    {
        getTotalAllTasks
    }
`;

export const GET_LIST_TASKS = gql`
    query(
        $idList: Float!
        $idClient: Float!
        $limit: Float!
        $offset: Float!
        $orderByTitle: Boolean!
        $order: String!
    ) {
        listQuery(idList: $idList, idClient: $idClient) {
            idList
            idClient
            listName
            taskss(limit: $limit, offset: $offset, orderByTitle: $orderByTitle, order: $order) {
                tasks {
                    idTask
                    title
                    complete
                    description
                }
                hasMore
            }
        }
    }
`;
