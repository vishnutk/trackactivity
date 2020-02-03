import React from "react";
import { IProps, IState, IGoogleUser, ITarget } from "./Interfaces";
import Styles from './styles';
import { TextField, Button } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import DB from "./DB";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export interface IAddActivityProps extends IProps {
    user: IGoogleUser;
    target: ITarget;
}
export interface IAddActivityState extends IState{
    saved: boolean;
    amount: number;
    selectedDate: Date;
    target: ITarget;
}

class AddActivity extends React.Component<any, IAddActivityState> {
    private classes: any;

  
    constructor(props: any) {
      super(props);
  
      console.log(props.location);
      this.state = {
        isInitialized: false,
        signedIn: false,
        saved: false,
        amount: 0,
        selectedDate: new Date(),
        target: props.location.state.target
      };
      console.log(props);
      this.classes = Styles.getUseStyles();
    }

    private handleCountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
       this.setState({amount: parseInt((e.target as HTMLInputElement).value)});
    }

    private handleDateChange = (date:any) => {
        console.log(date);
        //this.setState({selectedDate: new Date((e.target as HTMLInputElement).value)});
    }

    public saveActivity(){
        if (this.props.user) {
          console.log("in save activity");
          DB.getInstance().saveActivity(this.props.user.email, this.state.target.goal, this.state.amount, this.state.selectedDate);
          DB.getInstance().updateTarget(this.state.target, this.state.amount);
          this.setState({saved: true});
        }
      }

    render() {
        if (!this.props.user || this.props.user.email === '') {
            return ( <Redirect to='/' />)
        }
        if (this.state.saved) {
            return (<Redirect to='/goals?msg=success' />)
        }
        return (
            <header className="App-header">
            <div>
              <label>{this.props.user.displayName}</label>
            </div>
          <div className={this.classes.Button}>
              <label>{this.state.target.goal}</label>
              <TextField id="amount" label="Enter amount."
              required
              value={this.state.amount}
              onChange={this.handleCountChange}
            //   InputProps={{
            //     startAdornment: <InputAdornment position="start">{target.unit}</InputAdornment>,
            //   }}
              />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="activityDate"
                    label="Select Date"
                    format="MM/dd/yyyy"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />     

            </MuiPickersUtilsProvider>
                     
              {/* <TextField id="activityDate" label="Enter date."
              required
              value={this.state.selectedDate}
              //onChange={this.handleDateChange('date')}
              /> */}
          </div>
          <div>
          <Button variant="contained" color="primary" onClick={() =>  this.saveActivity()}>
            Save Activity
          </Button>
          </div>
        </header>
        )
    }
}

export default withRouter(AddActivity);