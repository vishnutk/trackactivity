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
import DB from './DB';
import Goals from './Goals';
import SelectGoal from './SelectGoal';
import AddGoal from './AddGoal';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { IGoal, IGoogleUser } from './Interfaces';

interface IAppProps {
}

interface IAppStates {
  user: IGoogleUser;
  signedIn: boolean;
  loaded: boolean;
  selectedGoal: IGoal;
}

export default class App extends React.Component<IAppProps, IAppStates> {
  private classes: any;
  private db = DB.getInstance();

  constructor(props:IAppProps) {
    super(props);

    this.classes = Styles.getUseStyles();

    this.state = {
      user: {displayName: '', photoURL: '', email: ''},
      signedIn: false,
      loaded: false,
      selectedGoal: {name: '', unit: '', suggested: 0}

    };

    this.loadUser();
  }

  private loadUser(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          console.log("in callback");
          console.log(user);
          this.setState({user: user as IGoogleUser, signedIn: true});
      } else {
        //
      }
    });
  }

  signInSuccess = (u: IGoogleUser) => {
    if (u) {
      this.db.setUser(u);
      this.setState({user: u, signedIn: true});
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
              <Route path="/goals">
                <Goals/>
              </Route>
              <Route path="/selectgoal">
                <SelectGoal></SelectGoal>
              </Route>
              <Route path="/goalsadd">
                <AddGoal user={this.state.user} activity={this.state.selectedGoal}></AddGoal>
              </Route>
            </Switch>
          </Router>
      </div>
    );
  }
}
