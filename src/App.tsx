import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase'

import GoogleUserAvatar from './GoogleUserAvatar';
import Styles from './styles';

import Login from './Login';
import Home from './Home';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DB from './DB';

interface IGoogleUser {
  displayName: string;
  photoURL: string;
}

interface IAppProps {
}

interface IAppStates {
  user: IGoogleUser;
  signedIn: boolean;
  loaded: boolean;
}

export default class App extends React.Component<IAppProps, IAppStates> {
  private classes: any;
  private user: any;
  private signedIn: boolean = false;
  private db = DB.getInstance();

  constructor() {
    super({});

    this.classes = Styles.getUseStyles();

    this.state = {
      user: {displayName: '', photoURL: ''},
      signedIn: false,
      loaded: false
    };

    this.loadUser();
  }

  loadUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log("in callback");
          console.log(user);

          // setUser(user);
          // setSignedIn(true);
      } else {
        //
      }
      // setLoaded(true);
    });
  }

  signInSuccess = (u: IGoogleUser) => {
    if (u) {
      this.db.setUser(u);
      console.log(u);
    }
  }

  render() {
    return (
      <div className="App">
        <div className={this.classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={this.classes.title}>
                Track Activity
              </Typography>
              <GoogleUserAvatar user={this.state.user} signedIn={this.state.signedIn}/>
            </Toolbar>
          </AppBar>
        </div>
        <Router>
          <Switch>
              <Route exact path="/">
                <Home user={this.state.user} loaded={this.state.loaded}/>
              </Route>
              <Route path="/login">
                <Login onSignIn={this.signInSuccess} />
              </Route>
            </Switch>
          </Router>
      </div>
    );
  }
}
