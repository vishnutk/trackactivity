import React from 'react';
import { GridList, GridListTile, GridListTileBar, Modal } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Styles from './Styles';
import DB from './DB'

import { Link, Redirect } from "react-router-dom";

export default function Goals(props) {
    const classes = Styles().useStyles();
    const user = props.user;
    console.log("user: ");
    console.log(user);
    const loadCallback = props.onTargetLoad;
    const [targets, setTargets] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    const init = () => {
        if (loaded || !user) {
            return;
        }
        DB().fetchTargets(setTargets, user.email);
        setLoaded(true);
    }

    const receivedTargets = (targetsReceived) => {
      setTargets(receivedTargets);
      console.log("targets rceived:");
      console.log(targets);  
      if (loadCallback) {
        loadCallback(targets);
      }
    }

    init();

    const Loading = () => (
        <div>
            <h1>Fetching...</h1>
            <Link to="/goalsselect">Add Goal</Link>
        </div>            
    );

    const Redir = () =>  (
      <Redirect to='/' />
    )

    const Tiles = () => (
      <header className="App-header">
      <Link to="/goalsselect">
        <Button variant="contained" color="primary">
          Add Goal
        </Button>
      </Link>        
       
        <Fab color="primary" aria-label="Add Goal" className={classes.fab}>
          <AddIcon />
        </Fab>

        <div className={classes.list}>
          <GridList>
          {targets.map(tile => (
            <GridListTile key={tile.startDate}>
              <img src="running256.png" /* {tile.img} */ alt={tile.goal} />
              <GridListTileBar
                title={tile.goal}
                subtitle={<span>Target: {tile.target}</span>}
                actionIcon={
                  // <Link to="/addactivity" state={{target : tile}}>
                  <Link to={{ pathname: "/addactivity", state: {target: tile} }}>
                    <Button variant="contained" color="primary">
                      Record
                    </Button>
                  </Link>  
                }
              />
            </GridListTile>
            ))}
          </GridList>
        </div>

        {/* <Fab color="primary" variant="extended" aria-label="add">
          <AddIcon /><Link to="/goalsselect">Add Goal</Link>
        </Fab> */}
      </header>
    )

    return user
    ? (loaded && targets && targets.length > 0
        ? (<Tiles/>) 
        : (<Loading/>)) 
    : <Redir/>;
}