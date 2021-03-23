import { useState } from 'react';
import {Wrapper, Aside, Flexbox, FormPadding, Button, Label, Input } from '../Login/LoginForm.style'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
//import Login from '../imgs/Login.png'

//TODO: Try to put an imagem on the background
const LoginForm = () => {

  const [logIn, setLogIn] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogIn = (values) => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        query:`
          mutation getClient($email: String!, $password: String!) {
            login(
              email:$email,
              password:$password
            ) {
              client{
                idClient
                name
                email
              }
              token
            }
          }
        `,
        variables: values
      })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.data){
        console.log('wrong credentials');
        setWrongCredentials(true);
      }
      else
        /* console.log(data.data); */
        history.push('/Todo');
    });
    
    
  }

  const handleRegister = (e) => {
    console.log("i'll remove this later, it's just to stop the email var warning");
  }

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is Required'),
  })

  return (
    <Wrapper>

      <Flexbox>
        <Aside onClick={() => setLogIn(false)}>Register</Aside>
        <Aside onClick={() => setLogIn(true)}>Log in</Aside>
      </Flexbox>

      
        {logIn && (
          <FormPadding>
            <Formik
              initialValues={{ 
                email: '', 
                password: '',
              }}
              validationSchema={validate}
              onSubmit={(handleLogIn)}
            >
              {({values, errors}) => (
                <Form>
                  <Label>Log In</Label><br/>
                  <Field placeholder="Email" autoComplete="off" name="email" /><br/>
                  <ErrorMessage name="email" /><br/>
                  <Field placeholder="Password" autoComplete="off" name="password" /><br/>
                  <ErrorMessage name="password" /><br/>
                  <Button type="submit">NEXT</Button>
                  {wrongCredentials && (<p>Wrong Credentials<br/></p>)}
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Form>
              )}
            </Formik>
          </FormPadding>
        )}

        {!logIn && (
          <FormPadding onSubmit={(handleRegister)}>
            <Label>Register</Label><br/>
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>
            <Button>NEXT</Button>
          </FormPadding>
        )}
    
    </Wrapper>
  );
}
  
  export default LoginForm;
  