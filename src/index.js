import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; 
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

import reportWebVitals from './reportWebVitals';
import Atlis from "atlis"

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <Atlis 
      request={{
        data: ["email", "name"],
        appName: "atlis",
        appID: "2a50a239-aaed-490f-8c94-032199ad0e64"
      }}>
      <App />
    </Atlis>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
