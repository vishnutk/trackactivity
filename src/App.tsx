import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import * as firebase from 'firebase'

import GoogleUserAvatar from './GoogleUserAvatar';

import Styles from './styles';
import Login from './Login';
import Home from './Home';
import DB from './DB';
import Goals from './Goals';
import SelectGoal from './SelectGoal';
import AddGoal from './AddGoal';
import AddActivity from './AddActivity';

import { IGoal, IGoogleUser, ITarget } from './Interfaces';

interface IAppProps {
}

interface IAppStates {
  user: IGoogleUser;
  signedIn: boolean;
  loaded: boolean;
  selectedGoal: IGoal;
  target: ITarget;
}

export default class App extends React.Component<IAppProps, IAppStates> {
  private classes: any;
  private db = DB.getInstance();
  private goalRef: any;

  constructor(props:IAppProps) {
    super(props);

    this.classes = Styles.getUseStyles();
    this.goalRef = React.createRef();

    this.state = {
      user: {displayName: '', photoURL: '', email: ''},
      signedIn: false,
      loaded: false,
      selectedGoal: {name: '', unit: '', suggested: 0},
      target: {achieved: 0,
        goal: '',
        lastModifled: new Date(),
        startDate: new Date(),
        unit: '',
        user: ''}
    };

    this.loadUser();
  }

  private loadUser(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          console.log("in callback");
          console.log(user);
          this.db.setUser(user);
          this.setState({user: user as IGoogleUser, signedIn: true, loaded: true});
          if (this.goalRef && this.goalRef.current) {
            this.goalRef.current.setUser(user);
          }
      } else {
        this.setState({loaded: true});
      }
    });
  }

  signInSuccess = (u: IGoogleUser) => {
    if (u) {
      this.db.setUser(u);
      this.setState({user: u, signedIn: true, loaded: true});
      if (this.goalRef && this.goalRef.current) {
        this.goalRef.current.setUser(u);
      }
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
                <Goals ref={this.goalRef} signedIn={this.state.signedIn}/>
              </Route>
              <Route path="/selectgoal">
                <SelectGoal></SelectGoal>
              </Route>
              <Route path="/goalsadd/:goal/:unit/:suggest">
                <AddGoal user={this.state.user}></AddGoal>
              </Route>
              <Route path="/addactivity">
                <AddActivity user={this.state.user}></AddActivity>
              </Route>
            </Switch>
          </Router>
      </div>
    );
  }
}
