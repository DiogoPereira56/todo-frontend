import {gql} from '@apollo/client'

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

export const NEW_LIST_MUTATION = gql`
  mutation addNewList($listName: String!){
    addList(
      listName:$listName,
    )
  }
`;