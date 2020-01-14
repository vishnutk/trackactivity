
import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

import DB from './DB';
import Styles from './Styles';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { Link, Redirect } from "react-router-dom";

export default function SelectGoal(props) {

    const classes = Styles().useStyles();
    console.log("select goal");
    console.log(props);
    console.log(props.user);
    console.log(DB().getUser());

    const [goals, setGoals] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);  
    const [selectedGoal, setSelectedGoal] =  React.useState(null); 

    if (!loaded) {
        DB().fetchGoals(setGoals);
        setLoaded(true);
    }

    const Redir = () =>  (
      <Redirect to={'/goalsadd/'+ selectedGoal.name + "/" + selectedGoal.unit}/>
    )

    const Tiles = () =>  (
        <header className="App-header">
        <div className={classes.list}>
          {goals? (
          <GridList>
          {goals.map(tile => (
            <GridListTile key={tile.name}>
              <img src="running256.png" /* {tile.img} */ alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>Target: {tile.suggested} {tile.unit}</span>}
                actionIcon={

                <Link to={"/goalsadd/" + tile.name + "/" + tile.unit + "/" + tile.suggested}>
                  <Button variant="contained" color="primary">
                    Select
                  </Button>
                </Link>                     
                }
              />
            </GridListTile>
            ))}
          </GridList>
        ) : (
            <span>Fetching.</span>
        )}
        </div>
      </header>          
    );

    return (selectedGoal? (<Redir/>): (<Tiles/>));
}