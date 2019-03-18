import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Appbar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '75%',
    display: 'inline-block',
    textAlign: 'left',
  },
});

export class LoginForm extends Component { 
  state = {
    username: '',
    password: '',
  }
  render() {
    return (
        <MuiThemeProvider>
          <React.Fragment>
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange = {(event,newValue) => this.setState({username:newValue})}
            />
          <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
            <br/>
            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
            </React.Fragment>
        </MuiThemeProvider>
    );
  }
}

export default LoginForm;
