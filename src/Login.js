import React from 'react';
import * as firebase from 'firebase'
import Button from '@material-ui/core/Button';
import Styles from './Styles';
import { Redirect
  } from "react-router-dom";

export default function Login (props) {
    const [signedIn, setSignedIn] = React.useState(false);
    const classes = Styles().useStyles();

    const handleChange = (user) => {
        props.onSignIn(user);
    }

    const signInSuccess = (result) => {
        if (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // The signed-in user info.
          handleChange(result.user);
          setSignedIn(true);
        }
      }
    
      const signInError = (error) => {
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;      
        // ...
        //setSignedIn(false);
        console.log("Error");
        console.log(error);
      };


    const signin2 = () => () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider).then(signInSuccess).catch(signInError);
        })
        .catch(signInError);
      };    

      if (signedIn) {
          return (<Redirect to="/goals" />)
      }
      return (  
        <header className="App-header">              
        Welcome to <h1>Activity Tracker</h1>
            <Button variant="contained" color="primary" onClick={signin2()}>
            Login to continue.
            </Button>
            <div id="firebaseui-auth-container" className={classes.signInButton} ></div> 
        </header> 
      );
    }
