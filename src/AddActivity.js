import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import DB from './DB';
import Styles from './Styles';
import { Redirect, useLocation} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

function AddActivity(props) {

    const classes = Styles().useStyles();
    const user = props.user; 
    let location = useLocation();
    const target = location && location.state? location.state.target: null;

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [saved, setSaved] = React.useState( target ? false : true);
    const [amount, setAmount] = React.useState(0);

    const Redir = () =>  (
        <Redirect to='/' />
    )

    const RedirectToGoals = () => (
      <Redirect to='/goals?msg=success' />
    )

    const saveActivity = () => {
      if (user) {
        console.log("in save activity");
        DB().saveActivity(user.email, target.goal, amount, selectedDate);
        DB().updateTarget(target, amount);
        setSaved(true);
      }
    }

    const handleCountChange = props => event =>  {
        setAmount(event.target.value);
    }

    const handleDateChange = props => event => {
        setSelectedDate(event.target.value);
    }

    const Content = () => (
        <header className="App-header">
          <div>
            <label>{user.displayName}</label>
          </div>
        <div className={classes.Button}>
            <label>{target.goal}</label>
            <TextField id="amount" label="Enter amount." 
            required 
            value={amount}
            onChange={handleCountChange('amount')}
            InputProps={{
              startAdornment: <InputAdornment position="start">{target.unit}</InputAdornment>,
            }}
            />
            <TextField id="activityDate" label="Enter date." 
            required 
            value={selectedDate}
            onChange={handleDateChange('date')}
            />
        </div>
        <div>
        <Button variant="contained" color="primary" onClick={() =>  saveActivity()}>
          Save Activity
        </Button>
        </div>
      </header>  
    );


    return (
        user ? 
          saved ? (<RedirectToGoals/>) : (<Content/>) 
          : (<Redir/>)     
    );
}

export default AddActivity;