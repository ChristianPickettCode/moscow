import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";

import {
  BrowserRouter as Router
} from "react-router-dom";
import { Button, PageHeader, Spin, Image } from "antd";

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
          <div onClick={connect}>
            <PageHeader
                title={<a href="https://atlis.dev"><h3 style={{ margin:"0" }}>"Atlis."</h3></a>}
                extra={<a href="https://atlis.dev"><Button>Home</Button></a>}
                />
            <Image
              width={400}
              src="hiker-man-monochrome.svg"
            />
            <h1 style={{marginTop:"4%", fontSize:"50px"}}>Dashboard</h1>
            <Button type="primary"><b>Enter</b></Button>
          </div> : <div style={{marginTop:"25%"}}><Spin /></div>}
      </Router>
    </div>
  );
}

export default App;
