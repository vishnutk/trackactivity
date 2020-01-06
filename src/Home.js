import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";

export default function Home() {
    return (
        <div>
        <h1>Loading...</h1>
        <Redirect
            to={{
              pathname: "/login"
            }}
          />
          </div>
    )
}