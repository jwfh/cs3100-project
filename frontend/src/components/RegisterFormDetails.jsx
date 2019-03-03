import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class RegisterFormDetails extends Component {

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

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
            hintText="Enter Your Given Name"
            floatingLabelText="Given Name"
            onChange={ handleChange('givenName') }
            defaultValue={ values.givenName }
          />
          <br/>
          <TextField 
            hintText="Enter Your Surname"
            floatingLabelText="Surname"
            onChange={ handleChange('surname') }
            defaultValue={ values.surname }
          />
          <br/>
          <TextField 
            hintText="Enter Your Email Address"
            color="accent"
            floatingLabelText="Email Address"
            onChange={ handleChange('emailAddress') }
            defaultValue={ values.emailAddress }
          />
          <br/>
          <RaisedButton 
            label="Back"
            primary={ false }
            className={ classes.button }
            onClick={ this.back }
          />
          <RaisedButton 
            label="Register"
            primary={ true }
            className={ classes.button }
            onClick={ this.continue }
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

RegisterFormDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default RegisterFormDetails;
