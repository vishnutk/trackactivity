import React from "react";
import { IState, IGoal, IGoogleUser} from './Interfaces';
import DB from './DB';
import Styles from './styles';
import { Redirect } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import { withRouter } from "react-router";

interface IAddGoalState extends IState {
    saved: boolean;
    target: number;
}

interface IAddGoalStateProps {
    user?: IGoogleUser
}

class AddGoal extends React.Component<any, IAddGoalState> {
    private classes: any;
    
    private goal: IGoal = {name: '', unit: '', suggested: 0};

    constructor(props: any) {
      super(props);
    
      this.state = {
        isInitialized: props && props.user && props.user.email !== null,
        signedIn: true,
        saved: false,
        target: 0
      };
      this.goal.name = props.match.params.goal;
      this.goal.unit = props.match.params.unit;
      this.goal.suggested = props.match.params.suggest;

      this.classes = Styles.getUseStyles();
    }

    private handleTargetChange (event: any)  {
        console.log(event);
        this.setState({target: event.target.value});
      }

    private saveTarget() {
        console.log("in save target of addGoal");
        console.log(this.state);
        if (this.state.isInitialized) {
            console.log("in save target of addGoal2");
            DB.getInstance().saveTarget(this.props.user.email, this.goal.name, this.state.target, this.goal.unit);
            this.setState({saved: true});
        }        
    }

    render() {
        if (!this.props.user || this.props.user.email === '') {
            return( <Redirect to='/' />)
        }
        if (this.state.saved) {
            return (<Redirect to='/goals'/>)
        }

        return (
            <header className="App-header">
            <div>
              {<label>{this.props.user.displayName}</label>}
            </div>
          <div className={this.classes.Button}>
              <label>{this.goal.name}</label>
              <TextField id="target" label="Select your target."
              required
              value={this.state.target}
              onChange={this.handleTargetChange}
            //   InputProps={{
            //     startAdornment: <InputAdornment position="start">{this.props.unit}</InputAdornment>,
            //   }}
              />
          </div>
          <div>
          <Button variant="contained" color="primary" onClick={() =>  this.saveTarget()}>
            Save Target
          </Button>
          </div>
        </header>       
        );
    }
}

export default withRouter(AddGoal);

  