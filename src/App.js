import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";

import {
  BrowserRouter as Router,
} from "react-router-dom";

function App (props) {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user])
  
  return (
    <div className="App">
      <Router>
        { user ? 
          <Dashboard user={user} {...props} />
        : 
          <Landing user={user} {...props} />
        }
      </Router>
    </div>
  );
}

export default App;
