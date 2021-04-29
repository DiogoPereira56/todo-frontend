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
            name
            lists {
                idList
                idClient
                listName
                tasks {
                    idTask
                    title
                    complete
                    description
                }
            }
        }
    }
`;

export const GET_CLIENT_TOTAL_TASKS = gql`
    {
        getTotalAllTasks
    }
`;
