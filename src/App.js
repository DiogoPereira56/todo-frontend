import Todo from './containers/Todo';
import Login from './containers/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  uri: "http://localhost:3000/graphql"
})

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client} >
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/Todo">
              <Todo />
            </Route>
            <Route path="*">
              <Login />
            </Route>
          </Switch>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
