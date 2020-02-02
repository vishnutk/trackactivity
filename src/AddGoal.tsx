import React from "react";
import { IState, IProps, IGoal, IGoogleUser} from './Interfaces';
import DB from './DB';
import Styles from './styles';
import { Redirect } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@material-ui/core';

interface IAddGoalState extends IState {
    saved: boolean;
    target: number;
}

interface IAddGoalProps extends IProps {
    user?: IGoogleUser;
    activity: IGoal
}

export default class AddGoal extends React.Component<IAddGoalProps, IAddGoalState> {
    private classes: any;
  
    constructor(props: IAddGoalProps) {
      super(props);
  
      this.state = {
        isInitialized: false,
        signedIn: true,
        saved: false,
        target: 0
      };

      this.classes = Styles.getUseStyles();
      console.log("in add goal");
      console.log(props);
    }

    private handleTargetChange (props: any, event: any)  {
        console.log(event);
        this.setState({target: event.target.value});
      }

    private saveTarget() {
        if (this.props.user) {
            DB.getInstance().saveTarget(this.props.user.email, this.props.activity.name, this.state.target, this.props.activity.unit);
            this.setState({saved: true});
        }        
    }

    render() {
        if (!this.props.user || this.props.user.displayName === '') {
            return( <Redirect to='/' />)
        }
        if (this.state.saved) {
            return (<Redirect to='/goals'/>)
        }

        return (
            <header className="App-header">
            <div>
              <label>{this.props.user.displayName}</label>
            </div>
          <div className={this.classes.Button}>
              <label>{this.props.activity.name}</label>
              <TextField id="target" label="Select your target."
              defaultValue={this.props.activity.suggested} required
              value={this.state.target}
              
              InputProps={{
                startAdornment: <InputAdornment position="start">{this.props.activity.unit}</InputAdornment>,
              }}
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
  