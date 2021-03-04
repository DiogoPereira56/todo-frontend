import Todo from './containers/Todo';
import Login from './containers/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
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
    </div>
    </Router>
  );
}

export default App;
