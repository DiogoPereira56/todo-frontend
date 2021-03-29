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
        input: {
            name: $name
            email: $email
            password: $password
        }
        ){
        idClient
        name
        }
    }
`;
