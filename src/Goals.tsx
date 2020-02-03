import React from 'react';
import Styles from './styles';
import { Link, withRouter } from "react-router-dom";
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DB from './DB';
import { IState, IGoogleUser } from './Interfaces';

interface IGoalsState extends IState {
  targets: any[];
  user?: IGoogleUser;
}

interface IGoalsProps {
  signedIn: boolean
}

export default class Goals extends React.Component<any, IGoalsState> {
  private classes: any;

  constructor(props: any) {
    super(props);

    this.state = {
      isInitialized: false,
      signedIn: false,
      targets: []
    };
    console.log("getting targets");
    DB.getInstance().getTargets(this.setTargets.bind(this));
    this.classes = Styles.getUseStyles();
  }

  public setUser(user: IGoogleUser) {
    console.log("set user");
    this.setState({user: user});
    DB.getInstance().getTargets(this.setTargets.bind(this));
  }

  private setTargets(targets: any[]) {
    console.log("setTargets callback");
    console.log(targets);
    this.setState({targets: targets, isInitialized: true});
  }

  render() {
    if (this.state.isInitialized) {
      return (
      <header className="App-header">
      <Link to="/selectgoal">
        <Button variant="contained" color="primary">
          Add Goal
        </Button>
      </Link>

        <Fab color="primary" aria-label="Add Goal" className={this.classes.fab}>
          <AddIcon />
        </Fab>

        <div className={this.classes.list}>
          <GridList>
          {this.state.targets.map(tile => (
            <GridListTile key={tile.startDate}>
              <img src="running256.png" /* {tile.img} */ alt={tile.goal} />
              <GridListTileBar
                title={tile.goal}
                subtitle={<span>Target: {tile.achieved} / {tile.target}</span>}
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
      </header>
      )
    } else {
      return (
        <div>
            <h1>Fetching...</h1>
            <Link to="/goalsselect">Add Goal</Link>
        </div>        
      )
    }
  }
}
