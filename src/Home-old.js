import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";

export default function Home(props) {

  console.log("home");
  console.log(props);

    return (
        <div>
        {!props.loaded ? 
            (<h1>Loading...</h1>) :
          props.user ? (
            <Redirect
            to={{
              pathname: "/goals"
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        
        )
        }
          </div>
    )
}