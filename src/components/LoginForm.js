import { useState } from 'react';
import {Wrapper, Aside, Content, Flexbox, Form, Button, Label, Input } from './LoginForm.style'
//import Login from '../imgs/Login.png'

//TODO: Try to put an imagem on the background
const LoginForm = () => {

  const [logIn, setLogIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = (e) => {
    console.log("i'll remove this later, it's just to stop the password var warning" + password);
  }

  const handleRegister = (e) => {
    console.log("i'll remove this later, it's just to stop the email var warning" + email);
  }

    return (
      <Wrapper>

        <Flexbox>
          <Aside onClick={() => setLogIn(false)}>Register</Aside>
          <Aside onClick={() => setLogIn(true)}>Log in</Aside>
        </Flexbox>

        <Content>
          {logIn && (
            <Form onSubmit={(handleLogIn)}>
              <Label>Log In</Label><br/>
              <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
              <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>
              <Button>NEXT</Button>
            </Form>
          )}

          {!logIn && (
            <Form onSubmit={(handleRegister)}>
              <Label>Register</Label><br/>
              <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
              <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>
              <Button>NEXT</Button>
            </Form>
          )}
        </Content>

    </Wrapper>
    );
  }
  
  export default LoginForm;
  