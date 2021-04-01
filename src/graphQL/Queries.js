import {gql} from '@apollo/client'


export const DECODED_TOKEN = gql`
  {
    getDecodedToken{
      id
      name
    }
  }
`

export const LOG_OUT = gql`
  {
    removeToken
  }
`