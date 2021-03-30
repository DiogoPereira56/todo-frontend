import { useState } from 'react';
import {Wrapper, Aside, Flexbox, FormPadding, Button, Label, Input, Warnning } from '../Login/LoginForm.style'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { LOGIN_USER_MUTATION, REGISTER_USER_MUTATION } from '../../graphQL/Mutations';
import { useMutation } from '@apollo/client';
//import Login from '../imgs/Login.png'

//TODO: Try to put an imagem on the background
const LoginForm = () => {

  const [logIn, setLogIn] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [mailInUse, setMailInUse] = useState(false);
  const [login, { errorLogin }] = useMutation(LOGIN_USER_MUTATION);
  const [register, { errorResgister }] = useMutation(REGISTER_USER_MUTATION);
  const history = useHistory();

  const handleLogIn = (values) => {
    makeLogIn(values);

  }

  function makeLogIn(values) {
    login({variables: values })
      .then(data => {
        if (!data.data.login) {
          console.log('Wrong Email or Password');
          values.password = '';
          setWrongCredentials(true);
        }
        else
          /* console.log(data.data); */
          history.push('/Todo');
      });
    
  }

  const handleRegister = (values) => {
    register({variables: values })
      .then(data => {
        if(!data.data.register){
          /* console.log('Something went wrong, ups!'); */
          setMailInUse(true);
        }
        else
          /* console.log(data.data); */
          makeLogIn(values);
      });
    
  }

  const validateLogin = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is Required'),
  })

  const validateRegister = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is Required'),
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('A Name is required'),
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
              validationSchema={validateLogin}
              onSubmit={(handleLogIn)}
            >
              {({values, errors}) => (
                <Form>
                  <Label>Log In</Label><br/>
                  <Field placeholder="Email" autoComplete="off" name="email" as={Input} /><br/>
                  <Warnning><ErrorMessage name="email" /><br/></Warnning>
                  <Field placeholder="Password" autoComplete="off" name="password" type="password" as={Input}/><br/>
                  <Warnning><ErrorMessage name="password" /><br/><br/></Warnning>
                  <Button type="submit">NEXT</Button>
                  {wrongCredentials && (<Warnning><br/>Wrong Email or Password<br/></Warnning>)}
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
            validationSchema={validateRegister}
            onSubmit={(handleRegister)}
          >
            {({values, errors}) => (
              <Form>
                <Label>Register</Label><br/>
                <Field placeholder="Email" autoComplete="off" name="email" as={Input} /><br/>
                {mailInUse && (<Warnning>Email already in use, sorry<br/></Warnning>)}
                <Warnning><ErrorMessage name="email"/><br/></Warnning>
                <Field placeholder="Name" autoComplete="off" name="name" as={Input} /><br/>
                <Warnning><ErrorMessage name="name" /><br/></Warnning>
                <Field placeholder="Password" autoComplete="off" name="password" type="password" as={Input} /><br/>
                <Warnning><ErrorMessage name="password" /><br/><br/></Warnning>
                <Button type="submit">NEXT</Button>
              </Form>
            )}
          </Formik>
        </FormPadding>
        )}
    
    </Wrapper>
  );
}
  
  export default LoginForm;
  