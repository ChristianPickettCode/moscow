import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";

import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Button } from "antd";

function App (props) {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
    
  }, [props.user]);

  const connect = () => {
    if(!props.user) { 
      props.login(); 
    }
  }
  
  return (
    <div className="App">
      <Router>
        { user ?  <Dashboard user={user} {...props} /> : <div onClick={connect} style={{marginTop:"25%"}}><Button type="primary">Connect</Button></div>}
      </Router>
    </div>
  );
}

export default App;
