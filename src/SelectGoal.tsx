
import React from 'react';
import { IState, IProps } from './Interfaces';
import DB from './DB';
import Styles from './styles';
import { Link } from 'react-router-dom';
import { GridList, GridListTile, GridListTileBar, Button } from '@material-ui/core';

interface ISelectGoalsState extends IState {
    goals: any[];
}

export default class SelectGoal extends React.Component<IProps, ISelectGoalsState> {

    private classes: any;

    constructor(props: IProps) {
      super(props);
  
      this.state = {
        isInitialized: false,
        signedIn: true,
        goals: []
      };
  
      DB.getInstance().getGoals(this.setGoals.bind(this));
      this.classes = Styles.getUseStyles();
    }    

    private setGoals(goals: any[]) {
        this.setState({goals: goals, isInitialized: true});
    }
    render() {
        return (
            (
                <header className="App-header">
                <div className={this.classes.list}>
                  {this.state.goals? (
                  <GridList>
                  {this.state.goals.map(tile => (
                    <GridListTile key={tile.name}>
                      <img src="running256.png" /* {tile.img} */ alt={tile.name} />
                      <GridListTileBar
                        title={tile.name}
                        subtitle={<span>Target: {tile.suggested} {tile.unit}</span>}
                        actionIcon={
        
                        <Link to={"/goalsadd/" + tile.name + "/" + tile.unit + "/" + tile.suggested} >
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
            )   
        );
    }
}