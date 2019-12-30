import React from 'react';
import './App.css';
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase'

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import { Avatar, GridList, GridListTile, GridListTileBar, Modal } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  signInButton: {
    height: "50%",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
} 

function ExerciseList(props)  {
  const classes = useStyles();
  const user = props.user;

  const goals = [
    {
      img: "running256.png",
      title: "Running",
      target: 300,
      unit: "km"
    },
    {
      img: "running256.png",
      title: "Walk",
      target: 200,
      unit: "km"
    },
    {
      img: "running256.png",
      title: "suryanamaskaar",
      target: 2000,
      unit: ""
    },
    {
      img: "running256.png",
      title: "Hike",
      target: 12,
      unit: "km"
    },
  ];

  const saveRecord = (user, activity) => {
    var record = {
      user: user,
      ts: new Date(),
      activity: activity,
      qty: 5
    };
    var db = firebase.firestore();
    db.collection("activity").add(record)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  };

  const modal = () => (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
    >
      <div  className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    </Modal>    
  );  

  return (
    <header className="App-header">
      <div className={classes.list}>
        <GridList>
        {goals.map(tile => (
          <GridListTile key={tile.title}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>target: {tile.target} {tile.unit}</span>}
              actionIcon={
                <Button variant="contained" color="primary" onClick={() => modal() /*saveRecord(user.email, tile.title)*/}>
                Record
                </Button>
              }
            />
          </GridListTile>
          ))}
        </GridList>
      </div>
    </header>
  )
}

function App() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  let firebaseProject = null;
  const [signedIn, setSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => (
    event
  ) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' ||
        event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const firebaseInit = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyDKuA_rd0CBTjtumUxtV8iE7e8dJljz5o8",
      authDomain: "igetfit.firebaseapp.com",
      databaseURL: "https://igetfit.firebaseio.com",
      projectId: "igetfit",
      storageBucket: "igetfit.appspot.com",
      messagingSenderId: "315482937147",
      appId: "1:315482937147:web:36e0953768b874fd33c91e",
      measurementId: "G-YPND24F0WC"
    };       
    firebaseProject = firebase.initializeApp(firebaseConfig);    
  }

  const signInSuccess = (result) => {
    if (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      setUser(result.user);
      console.log("success");
      console.log(user);
      setSignedIn(true);
    }
  }

  const signInError = (error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;      
    // ...
    setSignedIn(false);
    console.log("Error");
    console.log(email);
  };

  const signin2 = () => () => {
    firebaseInit();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(signInSuccess).catch(signInError);
  };
/*
  const signin = () => () => {
    firebaseInit();
    
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          // Google provider must be enabled in Firebase Console to support one-tap
          // sign-up.
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // Required to enable this provider in one-tap sign-up.
          authMethod: 'https://accounts.google.com',
          // Required to enable ID token credentials for this provider.
          // This can be obtained from the Credentials page of the Google APIs
          // console.
          clientId: '315482937147-9947bo0q7dk01gfld6u709jtcv380mp2.apps.googleusercontent.com'
        }
      ],
      // Required to enable one-tap sign-up credential helper.
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log("After success");
          console.log(authResult);
          console.log(redirectUrl);
          signInSuccess(authResult);
        },
      }
    });
    // Auto sign-in for returning users is enabled by default except when prompt is
    // not 'none' in the Google provider custom parameters. To manually disable:
    // ui.disableAutoSignIn();
  }
*/
  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About us', 'Contact us'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const loginArea = () => (
    <header className="App-header">              
      Welcome to <h1>Activity Tracker</h1>
      <Button variant="contained" color="primary" onClick={signin2()}>
      Login to continue.
      </Button>
      <div id="firebaseui-auth-container" className={classes.signInButton} ></div> 
    </header> 
  );

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
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Track Activity
            </Typography>

            <GoogleUserAvatar user={user} signedIn={signedIn}/>
            
          </Toolbar>
        </AppBar>
      </div>

      {signedIn? (<ExerciseList user={user} />) : loginArea()}
      
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
