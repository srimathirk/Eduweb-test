import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Books from './Books'; // Import your Books, Math, and Logic components
import Math from './Math';
import Logic from './Logic';


function Home({ user }) {
  console.log(user)
  if (user){
  return (
    <div>
      <h1>Welcome to the Home {user.username}!</h1>

      <nav>
        <ul>
          {user && <li>
            <Link to="/books">Books</Link>
          </li>}
          <li>
            <Link to="/math">Math</Link>
          </li>
          {/* <li>
            <Link to="/logic">Logic</Link>
          </li> */}
        </ul>
      </nav>
      <Switch>
        <Route path="/books"> <Books user={user}/></Route> 
        <Route path="/math" component={Math} />
        {/* <Route path="/logic" component={Logic} /> */}
      </Switch>
    </div>
  );
}
else {
  return <h1>Please Login or Sign Up</h1>;
}
}

// function Books() {
//   return <h2>Books Component</h2>;
// }

// function Math() {
//   return <h2>Math Component</h2>;
// }

// function Logic() {
//   return <h2>Logic Component</h2>;
// }

export default Home


// function Home({ user }) {
//     if (user) {
//       return (
//       <div>
//       <h1>Welcome, {user.username} !</h1>
      
//     </div>
//       )
//     } else {
//       return <h1>Please Login or Sign Up</h1>;
//     }
//   }
  
//   export default Home;
  