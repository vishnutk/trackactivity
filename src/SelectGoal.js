
import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

import DB from './DB';
import Styles from './Styles';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import {
    Redirect
  } from "react-router-dom";

export default function SelectGoal(props) {

    const classes = Styles().useStyles();

    const [goals, setGoals] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);  
    const [selectedGoal, setSelectedGoal] =  React.useState(null); 

    const handleChange = (e) => {
        props.onTargetChange(e.target.value);
    }
    const selectGoal = (goal) => {
        alert("adding:" + goal.name);
        setSelectedGoal(goal.name);
    }

    if (!loaded) {
        DB().fetchGoals(setGoals);
        setLoaded(true);
    }

    const Redir = () =>  (
      <Redirect to={'/goalsadd/'+ selectedGoal} />
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
                  <Button variant="contained" color="primary" onClick={() => selectGoal(tile)}>
                  Select
                  </Button>
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