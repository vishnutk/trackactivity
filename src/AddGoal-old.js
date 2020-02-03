import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import DB from './DB';
import Styles from './Styles-old';
import { Redirect, useParams, withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';


function AddGoal(props) {

    console.log("in add goal");
    const classes = Styles().useStyles();
    const user = props.user; //DB().getUser();

    const {activity, unit, suggested} = useParams();

    const [loaded, setLoaded] = React.useState(false);
    const [target, setTarget] = React.useState(0);
    const [saved, setSaved] = React.useState(false);

    const Redir = () =>  (
        <Redirect to='/' />
    )

    const RedirectToGoals = () => (
      <Redirect to='/goals' />
    )

    const saveTarget = () => {
      if (user) {
        DB().saveTarget(user.email, activity, target, unit);
        setSaved(true);
      }
    }

    const handleTargetChange = props => event =>  {
      console.log(event);
      setTarget(event.target.value);
    }

    const Content = () => (
        <header className="App-header">
          <div>
            <label>{user.displayName}</label>
          </div>
        <div className={classes.Button}>
            <label>{activity}</label>
            <TextField id="target" label="Select your target."
            defaultValue={suggested} required
            value={target}
            onChange={handleTargetChange('target')}
            InputProps={{
              startAdornment: <InputAdornment position="start">{unit}</InputAdornment>,
            }}
            />
        </div>
        <div>
        <Button variant="contained" color="primary" onClick={() =>  saveTarget()}>
          Save Target
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

export default AddGoal;