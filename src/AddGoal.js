import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import DB from './DB';
import Styles from './Styles';
import {
  Redirect, useParams
} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import {
    DatePicker
  } from 'react-date-picker';

export default function AddGoal(props) {

    const classes = Styles().useStyles();
    const user = props.user;

    const {activity} = useParams();

    const [loaded, setLoaded] = React.useState(false);    
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
      setSelectedDate(date);
    };    

    const Redir = () =>  (
        <Redirect to='/login' />
    )

    const Content = () => (
        <header className="App-header">
        <div className={classes.list}>
            {/* <label>{user.displayName}</label> */}
            <label>{activity}</label>
            {/* <DatePicker
                onChange={handleDateChange}
                value={selectedDate}
            />             */}
            {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker value={selectedDate} />
            </MuiPickersUtilsProvider>             */}
        </div>
      </header>  
    );
    
    return (<Content/>);
    // return (
    //     user ? (<Content/>) : (<Redir/>)     
    // );
}