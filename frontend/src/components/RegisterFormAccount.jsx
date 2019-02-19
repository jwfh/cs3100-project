import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class RegisterFormAccount extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <TextField 
            hintText="Enter Your First Name"
            floatingLabelText="First Name"
            onChange={ handleChange('firstName') }
            defaultValue={ values.firstName }
          />
          <br/>
          <TextField 
            hintText="Enter Your Last Name"
            floatingLabelText="Last Name"
            onChange={ handleChange('lastName') }
            defaultValue={ values.lastName }
          />
          <br/>
          <TextField 
            hintText="Enter Your Email Address"
            floatingLabelText="Email"
            onChange={ handleChange('firstName') }
            defaultValue={ values.emailAddress }
          />
          <br/>
          <RaisedButton 
          label="Continue"
          primary={ true }
          style={ styles.button }
          onClick={ this.continue }
          />
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default RegisterFormAccount
