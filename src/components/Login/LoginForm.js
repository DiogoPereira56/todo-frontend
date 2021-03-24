import { useState } from 'react';
import {Wrapper, Aside, Flexbox, FormPadding, Button, Label, Input, Warnning } from '../Login/LoginForm.style'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
//import Login from '../imgs/Login.png'

//TODO: Try to put an imagem on the background
const LoginForm = () => {

  const [logIn, setLogIn] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [mailInUse, setMailInUse] = useState(false);
  const history = useHistory();

  const handleLogIn = (values) => {
    makeLogIn(values);
  }

  function makeLogIn(values) {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation clientLogin($email: String!, $password: String!) {
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
        if (!data.data) {
          console.log('wrong credentials');
          values.email = '';
          values.password = '';
          setWrongCredentials(true);
        }
        else
          /* console.log(data.data); */
          history.push('/Todo');
      });

  }

  const handleRegister = (values) => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        query:`
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
        `,
        variables: values
      })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.data){
        console.log('Something went wrong, ups!');
        setMailInUse(true);
      }
      else
        /* console.log(data.data); */
        makeLogIn(values);
    });
    
  }

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is Required'),
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('A name is required'),
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
              onSubmit={(handleLogIn)}
            >
              {({values, errors}) => (
                <Form>
                  <Label>Log In</Label><br/>
                  <Field placeholder="Email" autoComplete="off" name="email" /><br/>
                  <ErrorMessage name="email" /><br/>
                  <Field placeholder="Password" autoComplete="off" name="password" type="password" /><br/>
                  <ErrorMessage name="password" /><br/>
                  <Button type="submit">NEXT</Button>
                  {wrongCredentials && (<Warnning><br/>Wrong Email or Password<br/></Warnning>)}
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Form>
              )}
            </Formik>
          </FormPadding>
        )}

        {!logIn && (
          <FormPadding>
          <Formik
            initialValues={{ 
              email: '', 
              name: '',
              password: '',
            }}
            validationSchema={validate}
            onSubmit={(handleRegister)}
          >
            {({values, errors}) => (
              <Form>
                <Label>Register</Label><br/>
                <Field placeholder="Email" autoComplete="off" name="email" /><br/>
                {mailInUse && (<Warnning>Email already in use, sorry<br/></Warnning>)}
                <ErrorMessage name="email" /><br/>
                <Field placeholder="Name" autoComplete="off" name="name" /><br/>
                <ErrorMessage name="name" /><br/>
                <Field placeholder="Password" autoComplete="off" name="password" type="password" /><br/>
                <ErrorMessage name="password" /><br/>
                <Button type="submit">NEXT</Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </FormPadding>
        )}
    
    </Wrapper>
  );
}
  
  export default LoginForm;
  