import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class RegisterFormAccount extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <TextField 
            hintText="Enter Your Username"
            floatingLabelText="Username"
            onChange={ handleChange('username') }
            defaultValue={ values.username }
          />
          <br/>
          <TextField 
            hintText="Enter Your Password"
            type="password"
            floatingLabelText="Password"
            onChange={ handleChange('password') }
            defaultValue={ values.password }
          />
          <br/>
          <TextField 
            hintText="Enter Your Email Address"
            type="password"
            floatingLabelText="Confirm Password"
            onChange={ handleChange('confirmPassword') }
            defaultValue={ values.confirmPassword }
          />
          <br/>
          <RaisedButton 
            label="Continue"
            primary={ true }
            className={ classes.button }
            onClick={ this.continue }
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

RegisterFormAccount.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default RegisterFormAccount;
