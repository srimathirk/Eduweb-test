import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Books from './Books';
import Math from './Math';
import Logic from './Logic';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <NavBar user={user} setUser={setUser} />
        <main>
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/math">
              <Math />
            </Route>
            <Route path="/logic">
              <Logic />
            </Route>
            <Route path="/">
              {user ? <Home user={user} /> : <Home />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
