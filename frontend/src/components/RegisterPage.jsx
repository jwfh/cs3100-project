// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PageTitle from './PageTitle';

const RegisterFormAccount = (props) => {
  const { values, handleChange } = props;
  return (
    <Fragment>
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
        hintText="Confirm your password"
        type="password"
        floatingLabelText="Confirm Password"
        onChange={ handleChange('confirmPassword') }
        defaultValue={ values.confirmPassword }
      />
    </Fragment>
  );
};

RegisterFormAccount.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

const RegisterFormDetails = (props) => {
  const { values, handleChange } = props;
  return (
    <Fragment>
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
    </Fragment>
  );
}; 

RegisterFormDetails.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  formBody: {
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  hidden: {
    display: 'none',
  },
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '75%',
    display: 'inline-block',
    textAlign: 'left',
  },
});

export class RegisterPage extends Component {
  state = {
    activeStep: 0,
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    securityQuestionID: -1,
    securityAnswer: '',
    showValid: [false, false],
    isValid: [
      {
        usernameLength: false,
        usernameNotTaken: false,
        passwordComplex: false,
        passwordsMatch: true,
      },
      { 
        givenNameNotEmpty: false,
        surnameNotEmpty: false,
        emailNotEmpty: false,
        emailValid: false,
      },
    ],
    postSuccessful: false,
  };


  // Advance to the next form step
  nextStep = () => {
    const { activeStep, showValid } = this.state;
    showValid[activeStep] = true;
    this.setState({
      showValid,
    });
    let stepIsValid = this.isValid(activeStep);
    if (stepIsValid) {
      this.setState({
        activeStep: activeStep + 1,
      });
    }
  };

  // Return to the previous form step
  prevStep = () => {
    const { activeStep } = this.state;
    if (activeStep > 0) {
      this.setState({
        activeStep: activeStep - 1,
      });
    }
  };

  handleChange = (input) => ((e) => {
    const { activeStep } = this.state;
    this.setState({
      [input]: e.target.value,
    }, () => {
      this.validate(activeStep);
    });
  });

  validate = (step) => {
    const { isValid } = this.state;
    switch (step) {
    case 0:
      // Login info
      break;
    case 1:
      // Personal info
      break;
    default:
      break;
    }
    this.setState({ 
      isValid,
    });
  };

  isValid = (step) => {
    this.validate(step);
    const { isValid } = this.state;
    for (let val in isValid[step]) {
      if (!isValid[step][val]) {
        return false;
      }
    }
    return true;
  }

  // Do final validation and send form
  submit = () => {
    
  };

  getSteps = () => {
    const {
      username,
      password,
      confirmPassword,
      givenName, 
      surname, 
      emailAddress, 
      securityQuestionID,
      securityAnswer,
    } = this.state;
    const values = {
      username,
      password,
      confirmPassword,
      givenName, 
      surname, 
      emailAddress, 
      securityQuestionID,
      securityAnswer,
    };
    const { classes } = this.props;

    const steps = [
      {
        label: 'Enter Login Information',
        content:
          <RegisterFormAccount
            classes = { classes }
            nextStep = { this.nextStep }
            handleChange = { this.handleChange }
            values = { values }
          />,
      },
      {
        label: 'Enter Personal Information',
        content:
          <RegisterFormDetails 
            classes = { classes }
            prevStep = { this.prevStep }
            nextStep = { this.submit }
            handleChange = { this.handleChange }
            values = { values }
          />,
      },
    ];

    return steps;
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = this.getSteps();

    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <PageTitle>
            Create your NumHub Account
          </PageTitle>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.content}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={index === 0}
                        onClick={this.prevStep}
                        className={classNames(classes.button, index === 0 && classes.hidden )}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={index === steps.length - 1 ? this.submit : this.nextStep}
                        className={classes.button}
                      >
                        {index === steps.length - 1 ? 'Register' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);
