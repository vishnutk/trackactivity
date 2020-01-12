import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';

import Goals from './Goals';
import Login from './Login';
import Styles from './Styles';
import Home from './Home';
import AddGoal from './AddGoal';
import SelectGoal from './SelectGoal';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DB from './DB';

function App() {
  const classes = Styles().useStyles();
  DB().firebaseInit();
  
  const [signedIn, setSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [targets, setTarget] = React.useState(null);

  const signInSuccess = (user) => {
    if (user) {
      setUser(user);
      setSignedIn(true);
      console.log("in callback");
      console.log(user);      
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
            <Home />
          </Route>
          <Route path="/login">
            <Login onSignIn={signInSuccess} />
          </Route>
          <Route path="/goalsadd/:activity" >
            <AddGoal user={user} />
          </Route>
          <Route path="/goalsselect">
            <SelectGoal />
          </Route>
          <Route path="/goals" user={user}>
            <Goals />
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
