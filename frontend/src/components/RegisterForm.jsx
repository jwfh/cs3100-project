/*
 * This will be the main component for the registration form. There are two 
 * steps:
 *    1. Provide a username and password (and confirm password). 
 *       Here we will need to check that the username is unique from the database and that
 *       the password is complex enough. 
 * 
 *    2. Provide personal information such as email, location, bio, security question/answer. 
 * This will be done using the RegisterFormAccount and RegisterFormDetails components,
 * respectively.
 */

import React, { Component } from 'react';
import RegisterFormAccount from './RegisterFormAccount';
import RegisterFormDetails from './RegisterFormDetails';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formBody: {
    textAlign: 'center',
  },
  button: {
    margin: 15
  },
})

export class RegisterForm extends Component {
  state = {
    step: 1,
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    securityQuestionID: -1,
    securityAnswer: ''
  }

  // Advance to the next form step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    })
  }

  // Return to the previous form step
  prevStep = () => {
    const { step } = this.state;
    if (step > 1) {
      this.setState({
        step: step - 1
      })
    }
  }

  // Do final validation and send form
  submit = () => {
    
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  }

  render() {
    const { step } = this.state;
    const {
      username,
      password,
      confirmPassword,
      givenName, 
      surname, 
      emailAddress, 
      securityQuestionID,
      securityAnswer
    } = this.state;
    const values = {
      username,
      password,
      confirmPassword,
      givenName, 
      surname, 
      emailAddress, 
      securityQuestionID,
      securityAnswer
    }
    const { classes } = this.props;

    switch (step) {
      case 1:
        // Returning the RegisterFormAccount component 
        return (
          <div className={classes.formBody}>
            <RegisterFormAccount
              classes = { classes }
              nextStep = { this.nextStep }
              handleChange = { this.handleChange }
              values = { values }
            />
          </div>
        )

      case 2: 
        // Returning the RegisterFormDetails component
        return  (
          <div className={classes.formBody}>
            <RegisterFormDetails
              classes = { classes }
              prevStep = { this.prevStep }
              nextStep = { this.submit }
              handleChange = { this.handleChange }
              values = { values }
            />
          </div>
        )

      default:
        return (
          <div>
            An error ocurred.
          </div>
        )
    }
  }
}

export default withStyles(styles)(RegisterForm);
