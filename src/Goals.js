import React from 'react';
import { GridList, GridListTile, GridListTileBar, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Styles from './Styles';
import DB from './DB'
import { Link } from "react-router-dom";


export default function Goals(props) {
    const classes = Styles().useStyles();
    const user = props.user;
    const [targets, setTargets] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    const init = () => {
        if (loaded) {
            return;
        }
        DB().fetchTargets(setTargets);
        console.log("targets:");
        console.log(targets);  
        setLoaded(true);
    }

    init();

    const Loading = () => (
        <div>
            <h1>No goals found, add some goals.</h1>
            <Link to="/goalsselect">Add Goal</Link>
        </div>            
    );

    const Tiles = () => (
      <header className="App-header">
        <div className={classes.list}>
          <GridList>
          {targets.map(tile => (
            <GridListTile key={tile.name}>
              <img src="running256.png" /* {tile.img} */ alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>Target: {tile.suggested} {tile.unit}</span>}
                actionIcon={
                  <Button variant="contained" color="primary" onClick={() =>  DB().saveActivity(user.email, tile.title)}>
                  Record
                  </Button>
                }
              />
            </GridListTile>
            ))}
          </GridList>
        </div>
        <Link to="/goalsselect">Add Goal</Link>
      </header>
    )

    return (loaded && targets && targets.length > 0? (<Tiles/>) : (<Loading/>));
}