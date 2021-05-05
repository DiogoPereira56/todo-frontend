import { gql } from '@apollo/client';

//User login and resgistration
export const LOGIN_USER_MUTATION = gql`
    mutation clientLogin($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const REGISTER_USER_MUTATION = gql`
    mutation clientRegister($email: String!, $name: String!, $password: String!) {
        register(name: $name, email: $email, password: $password)
    }
`;

export const CLIENT_LISTS_MUTATION = gql`
    mutation getClient($limit: Float!, $offset: Float!) {
        getClientInformations {
            name
            idClient
            list(limit: $limit, offset: $offset) {
                idList
                idClient
                listName
            }
        }
    }
`;

//List actions
export const NEW_LIST_MUTATION = gql`
    mutation addNewList($listName: String!) {
        addList(listName: $listName)
    }
`;

export const DELETE_LIST_MUTATION = gql`
    mutation($idList: Float!, $idClient: Float!) {
        removeList(idList: $idList, idClient: $idClient)
    }
`;

export const RENAME_LIST_MUTATION = gql`
    mutation newList(
        $idList: Float!
        $title: String!
        $idClient: Float!
        $limit: Float!
        $offset: Float!
        $orderByTitle: Boolean!
        $order: String!
    ) {
        updateList(idList: $idList, title: $title, idClient: $idClient) {
            idList
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

export const LIST_INFO_MUTATION = gql`
    mutation getListInfo(
        $idList: Float!
        $idClient: Float!
        $limit: Float!
        $offset: Float!
        $orderByTitle: Boolean!
        $order: String!
    ) {
        getList(idList: $idList, idClient: $idClient) {
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

export const GET_CLIENT_TOTAL_LISTS = gql`
    mutation {
        getClientTotalLists
    }
`;

//Task Actions
export const NEW_TASK_MUTATION = gql`
    mutation newTask($title: String!, $idList: Float!, $idClient: Float!) {
        addTask(title: $title, idList: $idList, idClient: $idClient) {
            idTask
            idList
            title
            complete
            description
        }
    }
`;

export const DELETE_TASK_MUTATION = gql`
    mutation($idTask: Float!, $idClient: Float!) {
        removeTask(idTask: $idTask, idClient: $idClient)
    }
`;

export const UPDATE_TASK_DESCRIPTION_MUTATION = gql`
    mutation($idTask: Float!, $description: String!, $idClient: Float!) {
        updateTaskDescription(idTask: $idTask, description: $description, idClient: $idClient) {
            idTask
            title
            complete
            description
        }
    }
`;

export const UPDATE_TASK_TITLE_MUTATION = gql`
    mutation($idTask: Float!, $title: String!, $idClient: Float!) {
        updateTaskTitle(idTask: $idTask, title: $title, idClient: $idClient) {
            idTask
            title
            complete
            description
        }
    }
`;

export const UPDATE_TASK_COMPLETION_MUTATION = gql`
    mutation($idTask: Float!, $complete: Boolean!, $idClient: Float!) {
        updateTaskCompletion(idTask: $idTask, complete: $complete, idClient: $idClient) {
            idTask
            idList
            title
            complete
            description
        }
    }
`;

export const LIST_TOTAL_TASK_MUTATION = gql`
    mutation listTotalTasks($idList: Float!, $idClient: Float!) {
        getListsTotalTasks(idList: $idList, idClient: $idClient)
    }
`;

export const ALL_CLIENT_TASKS_MUTATION = gql`
    mutation($limit: Float!, $offset: Float!, $idClient: Float!, $orderByTitle: Boolean!, $order: String!) {
        getAllTasks(
            limit: $limit
            offset: $offset
            idClient: $idClient
            orderByTitle: $orderByTitle
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
export const SEARCHED_TASKS_MUTATION = gql`
    mutation(
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
export const TOTAL_SEARCHED_TASKS_MUTATION = gql`
    mutation($idClient: Float!, $search: String!) {
        getTotalSearchedTasks(idClient: $idClient, search: $search)
    }
`;
