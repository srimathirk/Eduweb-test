import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Books from "./Books";
import Math from "./Math";
// import Logic from "./Logic";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin]= useState(false);

  // useEffect(() => {
  //   console.log("Chcking session works");
  //   fetch("/check_session")
  //     .then((r) => {
  //       if (r.ok) {
  //         return r.text(); // Get the response as text
  //       }
  //     })
  //     .then((text) => {
  //       console.log("Response Text:", text);
  //       // Now try to parse it as JSON if it's not empty
  //       if (text.trim() !== "") {
  //         const user = JSON.parse(text); //converting text to JSON

  //         setUser(user);
  //         console.log(user);
  //       }
  //     });
  // }, []);

  useEffect(() => {
    console.log("Checking session works");
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json(); // Get the response as JSON
        }
      })
      .then((userData) => {
        console.log("User Data:", userData);

        if (userData.is_admin) {
          // User is an admin, do something
        }

        setUser(userData);
        console.log(userData);
      });
}, []);

useEffect(() => {
  fetch('/check_admin')
    .then(response => response.json())
    .then(data => {
      setIsAdmin(data.is_admin);
    })
    .catch(error => console.error('Error fetching admin status:', error));
}, []);

  console.log(user)
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route path="/">
              <Home user={user} isAdmin={isAdmin} />
            </Route>
            <Route path="/books">
              <Books user={user} isAdmin={isAdmin}/>
            </Route>
            <Route path="/math">
              <Math user={user}/>
            </Route>
            {/* <Route path="/logic">
              <Logic />
            </Route> */}
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
              <Home user={user}/>
            </Route>
            
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
