import {gql} from '@apollo/client'

//User login and resgistration
export const LOGIN_USER_MUTATION = gql`
mutation clientLogin($email: String!, $password: String!) {
    login(
      email:$email,
      password:$password
    ) 
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation clientRegister(
    $email: String!, 
    $name: String!, 
    $password: String!
  ){
    register(
        name: $name
        email: $email
        password: $password
    )
  }
`;

//List actions
export const NEW_LIST_MUTATION = gql`
  mutation addNewList($listName: String!){
    addList(
      listName:$listName,
    )
  }
`;

export const DELETE_LIST_MUTATION = gql`
  mutation ($idList: Float!){
    removeList(idList:$idList)
  }
`

export const RENAME_LIST_MUTATION = gql`
  mutation newList($idList: Float!, $title: String!){
    updateList(idList:$idList, title:$title){
      idList
      listName
      tasks{
        idTask
        title
        complete
        description
      }
    }
  }
`

//Task Actions
export const NEW_TASK_MUTATION = gql`
  mutation newTask($title: String!, $idList: Float!){
    addTask(title: $title, idList: $idList){
      idTask
      idList
      title
      complete
      description
    }
  }
`

export const DELETE_TASK_MUTATION = gql`
  mutation ($idTask: Float!){
    removeTask(idTask: $idTask)
  }
`

export const UPDATE_TASK_DESCRIPTION_MUTATION = gql`
  mutation ($idTask: Float!, $description: String!){
    updateTaskDescription(
      idTask: $idTask, 
      description: $description)
    {
      idTask
      idList
      title
      complete
      description
    }
  }
`

export const UPDATE_TASK_COMPLETION_MUTATION = gql`
  mutation ($idTask: Float!, $complete: Boolean!){
    updateTaskCompletion(
      idTask: $idTask, 
      complete: $complete)
    {
      idTask
      idList
      title
      complete
      description
    }
  }
`