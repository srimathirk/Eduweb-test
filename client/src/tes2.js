import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Books from "./Books";
import Math from "./Math";
import Logic from "./Logic";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <Router>
      <div>
        <NavBar user={user} setUser={setUser} />
        <main>
          {user ? (
            <Switch>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          ) : (
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
            </Switch>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
