import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { debug, backend } from '../settings';
import BlackLogo from '../assets/images/logo-01.svg';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  formBody: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '35%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '25%',
    },
    display: 'inline-block',
    textAlign: 'center',
  },
  formContent: {
    paddingBottom: '1vh',
  },
  boldFace: {
    fontWeight: 'bold',
  },
  hidden: {
    display: 'none',
  },
  root: {
    width: '90%',
    display: 'inline-block',
    textAlign: 'center',
  },
  actionsContainer: {
    flexGrow: 1,
    textAlign: 'right',
    marginBottom: theme.spacing.unit * 2,
  },
  formFooter: {
    display: 'flex',
    alignItems: 'baseline',
  },
  button: {
    marginLeft: 15,
  },
  logo: {
    width: theme.spacing.unit * 12,
    height: '100%',
    pointerEvents: 'none',
    textAlign: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    margin: theme.spacing.unit * 1,
    [theme.breakpoints.up('xs')]: {
      display: 'inline-block',
    },
  },
});

const RegisterFormAccount = (props) => (
  <Fragment>
    <TextField
      label="Username"
      onChange={props.handleChange('username')}
      value={props.username}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.usernameNotTaken
          ? ''
          : 'That username already exists.'
      }
      error={props.showValid && !props.isValid.usernameNotTaken}
    />
    <br />
    <TextField
      type="password"
      label="Password"
      onChange={props.handleChange('password')}
      value={props.password}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.passwordComplex
          ? ''
          : 'Your password does not meet complexity requirements.'
      }
      error={props.showValid && !props.isValid.passwordComplex}
    />
    <br />
    <TextField
      type="password"
      label="Confirm Password"
      onChange={props.handleChange('confirmPassword')}
      value={props.confirmPassword}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.passwordsMatch
          ? ''
          : 'Please confirm that your passwords match.'
      }
      error={props.showValid && !props.isValid.passwordsMatch}
    />
  </Fragment>
);

RegisterFormAccount.propTypes = {
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  showValid: PropTypes.bool.isRequired,
  isValid: PropTypes.object.isRequired,
};

const RegisterFormDetails = (props) => (
  <Fragment>
    <TextField
      label="Name"
      onChange={props.handleChange('givenName')}
      value={props.givenName}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.givenNameNotEmpty
          ? ''
          : 'This field is required.'
      }
      error={props.showValid && !props.isValid.givenNameNotEmpty}
    />
    <TextField
      label="Surname"
      onChange={props.handleChange('surname')}
      defaultValue={props.surname}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.surnameNotEmpty
          ? ''
          : 'This field is required.'
      }
      error={props.showValid && !props.isValid.surnameNotEmpty}
    />
    <TextField
      color="accent"
      label="Email Address"
      onChange={props.handleChange('email')}
      value={props.email}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.emailValid
          ? ''
          : 'Please enter a valid email address.'
      }
      error={props.showValid && !props.isValid.emailValid}
    />
  </Fragment>
);

RegisterFormDetails.propTypes = {
  handleChange: PropTypes.func.isRequired,
  givenName: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  showValid: PropTypes.bool.isRequired,
  isValid: PropTypes.object.isRequired,
};

const RegisterFormSecurity = (props) => <Fragment />;

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 0,
      username: '',
      password: '',
      confirmPassword: '',
      givenName: '',
      surname: '',
      email: '',
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
          emailValid: false,
        },
      ],
      postSuccessful: false,
    };
  }

  toggleHide = () => {
    const { activeComponent, hidePassword, hideSecA } = this.state;
    switch (activeComponent) {
      case 1:
        this.setState({
          hidePassword: !hidePassword,
        });
        break;
      case 2:
        this.setState({
          hideSecA: !hideSecA,
        });
        break;
      default:
        break;
    }
  };

  fetchAssets = (componentIdx, callback) => {
    const uri = `//${backend}/api/fetch/all`;
    let data;
    const config = {
      timeout: 2000,
    };
    switch (componentIdx) {
      case 2:
        // Fetching list of security questions here before advance to #2 (RegisterFormSecurity)
        data = {
          type: 'secQ',
        };
        axios
          .post(uri, data, config)
          .then((response) => {
            if (response.status === 200) {
              // Valid response
              if (
                response.body &&
                response.body.secQs &&
                response.body.ok === true
              ) {
                this.setState(
                  {
                    secQs: response.body.secQs,
                  },
                  callback,
                );
              } else {
                if (debug) {
                  console.log('Error fetching security questions.');
                }
                callback();
              }
            } else {
              callback();
            }
          })
          .catch((error) => {
            if (debug) {
              console.log('Error fetching assets:', error);
            }
            callback();
          });
        break;
      default:
        callback();
        break;
    }
  };

  nextStep = (validateFirst) => () => {
    const { activeComponent, isValid, showValid } = this.state;
    this.validate(activeComponent, () => {
      let componentIsValid = isValid[activeComponent];
      if (!validateFirst || componentIsValid) {
        this.fetchAssets(activeComponent + 1, () => {
          this.setState({
            activeComponent: activeComponent + 1,
          });
        });
      }
      showValid[activeComponent] = true;
      this.setState({
        showValid,
      });
    });
  };

  prevStep = () => {
    const { activeComponent } = this.state;
    if (activeComponent > 0) {
      this.setState({
        activeComponent: activeComponent - 1,
      });
    }
  };

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

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
  };

  attemptRegistration = () => {};

  getDisplayedComponents = () => {
    const { classes } = this.props;
    const {
      username,
      password,
      confirmPassword,
      givenName,
      surname,
      email,
      securityQuestionID,
      securityAnswer,
      showValid,
      isValid,
    } = this.state;

    const components = [
      {
        header: (
          <Fragment>
            <Typography variant="h4" component="p">
              Sign up
            </Typography>
            <Typography variant="h6" component="p">
              for a NumHub Account
            </Typography>
          </Fragment>
        ),
        footer: (
          <Button component={Link} to="/login">
            <Typography>Have an Account?</Typography>
          </Button>
        ),
        nextButton: {
          label: 'Next',
          action: this.nextStep(true),
        },
        content: (
          <RegisterFormAccount
            classes={classes}
            handleChange={this.handleChange}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            showValid={showValid[0]}
            isValid={isValid[0]}
          />
        ),
      },
      {
        header: (
          <Fragment>
            <Typography variant="h4" component="p">
              Hey {username}!
            </Typography>
            <Typography variant="h6" component="p">
              Tell us a bit more about yourself.
            </Typography>
          </Fragment>
        ),
        content: (
          <RegisterFormDetails
            classes={classes}
            handleChange={this.handleChange}
            givenName={givenName}
            surname={surname}
            email={email}
            showValid={showValid[1]}
            isValid={isValid[1]}
          />
        ),
        nextButton: {
          label: 'Register',
          action: this.attemptRegistration,
        },
        backButton: {
          label: 'Back',
          action: this.prevStep,
        },
      },
    ];

    return components;
  };

  render() {
    const { classes } = this.props;
    const { activeComponent } = this.state;
    const components = this.getDisplayedComponents();

    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <Paper className={classes.formBody} elevation={4}>
            {components.map(
              (component, index) =>
                index === activeComponent && (
                  <Fragment key={index}>
                    <div className={classes.formHeader}>
                      <img
                        className={classes.logo}
                        src={BlackLogo}
                        alt="NumHub"
                      />
                      {component.header && component.header}
                    </div>
                    <div className={classes.formContent}>
                      {component.content}
                    </div>
                    <div className={classes.formFooter}>
                      <div>{component.footer && component.footer}</div>
                      <div className={classes.actionsContainer}>
                        {component.backButton && (
                          <Button
                            disabled={index === 0}
                            onClick={component.backButton.action}
                            className={classes.button}
                          >
                            {component.backButton.label}
                          </Button>
                        )}
                        {component.nextButton && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={component.nextButton.action}
                            className={classes.button}
                          >
                            {component.nextButton.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Fragment>
                ),
            )}
          </Paper>
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
