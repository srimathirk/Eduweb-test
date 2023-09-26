import React, {useState } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route path="/">
              <Home user={user}/>
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )}
      </main>
    </div>
  );
}

export default App;
