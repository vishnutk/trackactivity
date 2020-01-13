import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import * as firebase from 'firebase'

import Goals from './Goals';
import Login from './Login';
import Styles from './Styles';
import Home from './Home';
import AddGoal from './AddGoal';
import SelectGoal from './SelectGoal';
import AddActivity from './AddActivity'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import DB from './DB';

function App() {
  const classes = Styles().useStyles();
  console.log("reinit app");
  console.log("firstTime");
  DB().firebaseInit();

  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
        console.log("in callback");
        console.log(user); 
        setUser(user);
        setSignedIn(true);
    } else {
      //
    }
    setLoaded(true);
  });

  const [signedIn, setSignedIn] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [targets, setTarget] = React.useState(null);

  const signInSuccess = (u) => {
    if (u) {
      setUser(u);
      DB().setUser(u);
      setSignedIn(true);
      console.log("in signin callback");
      console.log(u);      
    }
  }

  const targetsLoaded = (t) => {
    console.log("in target callback");
    if (t) {
      console.log(t);  
      setTarget(t);
    }
  }

  function GoogleUserAvatar(props) {
    let user = props.user;
    if (props.signedIn) {
      return  <Avatar alt={user.displayName} src={user.photoURL}></Avatar>;
    } else {
      return <Button color="inherit">Login</Button>;
    }
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Track Activity
            </Typography>
            <GoogleUserAvatar user={user} signedIn={signedIn}/>
          </Toolbar>
        </AppBar>
      </div>
      <Router>
      <Switch>
          <Route exact path="/">
            <Home user={user} loaded={loaded}/>
          </Route>
          <Route path="/login">
            <Login onSignIn={signInSuccess} />
          </Route>
          <Route path="/goalsadd/:activity/:unit" >
            <AddGoal user={user} />
          </Route>
          <Route path="/goalsselect">
            <SelectGoal user={user}/>
          </Route>
          <Route path="/goals" >
            <Goals user={user} onTargetLoad={targetsLoaded}/>
          </Route>
          <Route path="/addactivity" >
            <AddActivity user={user}/>
          </Route>

          {/* <Route path="/activity">
            <Activity />
          </Route> */}
        </Switch>
      </Router>

      {/* {signedIn? (<ExerciseList user={user} goals={goals}/>) : loginArea()} */}
      
      {/* <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation> */}
    </div>
  );
}

export default App;
