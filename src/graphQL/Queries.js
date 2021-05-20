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
            __typename
            list(limit: $limit, offset: $offset) {
                idList
                listName
                idClient
                __typename
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
            __typename
            taskss(limit: $limit, offset: $offset, orderByTitle: $orderByTitle, order: $order) {
                tasks {
                    idTask
                    title
                    complete
                    description
                    __typename
                }
                hasMore
                __typename
            }
        }
    }
`;
export const ALL_CLIENT_TASKS = gql`
    query($limit: Float!, $offset: Float!, $idClient: Float!, $orderByTitle: Boolean!, $order: String!) {
        getAllTasks(
            limit: $limit
            offset: $offset
            idClient: $idClient
            orderByTitle: $orderByTitle
            order: $order
        ) {
            tasks {
                idTask
                idList
                title
                complete
                description
            }
            hasMore
        }
    }
`;
export const SEARCHED_TASKS = gql`
    query(
        $limit: Float!
        $offset: Float!
        $idClient: Float!
        $orderByTitle: Boolean!
        $search: String!
        $order: String!
    ) {
        getSearchedTasks(
            limit: $limit
            offset: $offset
            idClient: $idClient
            orderByTitle: $orderByTitle
            search: $search
            order: $order
        ) {
            idTask
            idList
            title
            complete
            description
        }
    }
`;
export const TOTAL_SEARCHED_TASKS = gql`
    query($idClient: Float!, $search: String!) {
        getTotalSearchedTasks(idClient: $idClient, search: $search)
    }
`;
