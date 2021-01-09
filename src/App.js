import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";

import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Button, Spin } from "antd";

function App (props) {
  const [user, setUser] = useState(props.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    setUser(props.user);
    if (props.user) {
      setLoggedIn(true);
    } else {
      setLoggedOut(true);
    }
    
  }, [props.user]);

  const connect = () => {
    if(!props.user) { 
      props.login(); 
    }
  }
  
  return (
    <div className="App">
      <Router>
        { loggedIn && user ?  
          <Dashboard user={user} {...props} /> 
          : loggedOut && !user ? 
          <div onClick={connect} style={{marginTop:"18%"}}>
            <h1>Atlis Dashboard</h1>
            <Button type="primary">Connect</Button>
          </div> : <div style={{marginTop:"25%"}}><Spin /></div>}
      </Router>
    </div>
  );
}

export default App;
