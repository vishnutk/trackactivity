import React from 'react';
import * as firebase from 'firebase'
import Button from '@material-ui/core/Button';
import Styles from './styles';
import { Redirect
  } from "react-router-dom";

interface ILoginProps {
  onSignIn: (user: any) => void;
}

interface ILoginStates {
  signedIn: boolean;
}

export default class Login extends React.Component<ILoginProps, ILoginStates> {
  private classes: any;

  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      signedIn: false
    };

    this.classes = Styles.getUseStyles();
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  private onSignInClick() {
    if (this.state.signedIn) {

    } else {

    }
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(this.signInSuccess).catch(this.signInError);
      })
      .catch(this.signInError);
  }

  private signInSuccess = (result: any) => {
    console.log(result);
    if (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      this.handleChange(result.user);
      // this.props.onSignIn(user);
      this.setState({
        signedIn: true
      });
    }
  }

  private signInError = (error: any) => {
    // // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // ...
    //setSignedIn(false);
    console.log("Error");
    console.log(error);
  }

  private handleChange = (user: any) => {
    if (!this.props) return;

    if (this) {
      this.props.onSignIn(user);
    }
    console.log('inside handle change');
    console.log(user);
  }

  render() {
    if (this.state.signedIn) {
      return (<Redirect to="/goals" />);
    }

    return (
      <header className="App-header">
          Welcome to <h1>Activity Tracker</h1>
          <Button variant="contained" color="primary" onClick={this.onSignInClick}>
            Login to continue.
          </Button>
          <div id="firebaseui-auth-container" className={this.classes.signInButton} ></div>
      </header>
    );
  }
}

