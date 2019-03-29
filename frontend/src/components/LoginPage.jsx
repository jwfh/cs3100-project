import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import BlackLogo from '../assets/images/logo-01.svg';
import { debug, backend } from '../settings';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormFunc from './FormFunc';

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
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '33%',
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
    width: '50%',
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

const UsernameForm = (props) => (
  <FormFunc onSubmit={props.onReturnKey}>
    <TextField
      label="Username"
      value={props.username}
      onChange={props.handleChange('username')}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={!props.showValid || props.isValid ? '' : props.errorMessage}
      error={props.showValid && !props.isValid}
    />
  </FormFunc>
);

UsernameForm.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  showValid: PropTypes.bool.isRequired,
};

const PasswordForm = (props) => (
  <FormFunc onSubmit={props.onReturnKey}>
    <TextField
      label="Password"
      type={props.hide ? 'password' : 'text'}
      value={props.password}
      onChange={props.handleChange('password')}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={!props.showValid || props.isValid ? '' : props.errorMessage}
      error={props.showValid && !props.isValid}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.toggleShowPassword}
            >
              {props.hide ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </FormFunc>
);

PasswordForm.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  toggleShowPassword: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  showValid: PropTypes.bool.isRequired,
};

const ForgotPasswordFormQuestion = (props) => (
  <FormFunc onSubmit={props.onReturnKey}>
    <TextField
      label="Security answer"
      type={props.hide ? 'password' : 'text'}
      value={props.secA}
      onChange={props.handleChange('secA')}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={!props.showValid || props.isValid ? '' : props.errorMessage}
      error={props.showValid && !props.isValid}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.toggleShowSecA}
            >
              {props.hide ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </FormFunc>
);

ForgotPasswordFormQuestion.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  secA: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  toggleShowSecA: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  showValid: PropTypes.bool.isRequired,
};

const ForgotPasswordFormReset = (props) => (
  <FormFunc onSubmit={props.onReturnKey}>
    <TextField
      label="New password"
      type={props.hidePassword ? 'password' : 'text'}
      value={props.resetPassword}
      onChange={props.handleChange('resetPassword')}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValidPassword
          ? ''
          : props.errorMessagePassword
      }
      error={props.showValid && !props.isValid}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.toggleShowResetPassword}
            >
              {props.hide ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="Confirm new password"
      type={props.hideConfirm ? 'password' : 'text'}
      value={props.resetConfirm}
      onChange={props.handleChange('resetConfirm')}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValidConfirm
          ? ''
          : props.errorMessageConfirm
      }
      error={props.showValid && !props.isValid}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.toggleShowResetConfirm}
            >
              {props.hide ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </FormFunc>
);

ForgotPasswordFormReset.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  resetPassword: PropTypes.string.isRequired,
  resetConfirm: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  hidePassword: PropTypes.bool.isRequired,
  hideConfirm: PropTypes.bool.isRequired,
  toggleShowResetPassword: PropTypes.func.isRequired,
  toggleShowResetConfirm: PropTypes.func.isRequired,
  errorMessagePassword: PropTypes.string.isRequired,
  errorMessageConfirm: PropTypes.string.isRequired,
  isValidPassword: PropTypes.bool.isRequired,
  isValidConfirm: PropTypes.bool.isRequired,
  showValid: PropTypes.bool.isRequired,
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 0,
      username: '',
      usernameErrorMessage: '',
      password: '',
      hideField: {
        password: true,
        secA: true,
        resetPassword: true,
        resetConfirm: true,
      },
      passwordErrorMessage: '',
      secQ: '',
      secA: '',
      secAErrorMessage: '',
      resetPassword: '',
      resetConfirm: '',
      resetPassErrorMessage: '',
      resetConfirmErrorMessage: '',
      showValid: [false, false, false, false],
      isValid: [false, false, false, { password: false, confirm: false }],
    };
  }

  toggleHide = (field) => () => {
    const { hideField } = this.state;
    switch (field) {
      case 'password':
      case 'secA':
      case 'resetPassword':
      case 'resetConfirm':
        hideField[field] = !hideField[field];
        break;
      default:
        break;
    }
    this.setState({
      hideField,
    });
  };

  validate = (componentIdx, callback) => {
    let uri = '//' + backend + '/api/validate';
    let data;
    const {
      username,
      secA,
      isValid,
      newPassword,
      newPasswordConfirm,
    } = this.state;
    switch (componentIdx) {
      case 0:
        data = {
          type: 'username',
          value: {
            username,
          },
        };
        axios
          .post(uri, data)
          .then((response) => {
            if (
              response.status === 200 &&
              response.data &&
              response.data.ok === true &&
              'exists' in response.data
            ) {
              if (response.data.exists) {
                // Username exists in the database
                isValid[0] = true;
                this.setState(
                  {
                    isValid,
                  },
                  callback,
                );
              } else {
                // Username does not exist in the database
                isValid[0] = false;
                if ('message' in response.data) {
                  this.setState(
                    {
                      isValid,
                      usernameErrorMessage: response.data.message,
                    },
                    callback,
                  );
                } else {
                  this.setState(
                    {
                      isValid,
                      usernameErrorMessage: "We can't find that username.",
                    },
                    callback,
                  );
                }
              }
            } else {
              // Response does not contain all required fields
              if (debug) {
                console.log(
                  'Response lacking required data:',
                  response.status,
                  response,
                );
                isValid[0] = false;
                this.setState(
                  {
                    isValid,
                  },
                  callback,
                );
              }
            }
          })
          .catch((error) => {
            if (debug) {
              console.log('Error in validation:', error);
            }
            isValid[componentIdx] = false;
            this.setState(
              {
                isValid,
              },
              callback,
            );
          });
        break;
      case 2:
        data = {
          type: 'secA',
          value: {
            username,
            secA,
          },
        };
        axios
          .post(uri, data)
          .then((response) => {
            if (
              response.status === 200 &&
              response.data &&
              'ok' in response.data
            ) {
              if (response.data.ok === true) {
                // Username exists and answer was correct
                isValid[2] = true;
                this.setState(
                  {
                    isValid,
                    secAErrorMessage: '',
                  },
                  callback,
                );
              } else {
                // Username does not exist in the database
                // Or answer was not correct
                if ('message' in response.data) {
                  isValid[2] = false;
                  this.setState(
                    {
                      isValid,
                      secAErrorMessage: response.data.message,
                    },
                    callback,
                  );
                } else {
                  isValid[2] = false;
                  this.setState(
                    {
                      isValid,
                    },
                    callback,
                  );
                }
              }
            } else {
              // Response does not contain all required fields
              if (debug) {
                console.log(
                  'Response lacking required data:',
                  response.status,
                  response,
                );
                isValid[2] = false;
                this.setState(
                  {
                    isValid,
                  },
                  callback,
                );
              }
            }
          })
          .catch((error) => {
            if (debug) {
              console.log('Error in validation:', error);
            }
            isValid[componentIdx] = false;
            this.setState(
              {
                isValid,
              },
              callback,
            );
          });
        break;
      case 3:
        data = {
          type: 'password',
          value: {
            newPassword,
          },
        };
        isValid[3].confirm = newPassword === newPasswordConfirm;
        let resetConfirmErrorMessage =
          newPassword === newPasswordConfirm
            ? ''
            : 'Please make sure that your passwords match';
        axios
          .post(uri, data)
          .then((response) => {
            if (
              response.status === 200 &&
              response.data &&
              'ok' in response.data
            ) {
              if (response.data.ok === true) {
                // Password meets complexity requirements
                isValid[3].password = true;
                this.setState(
                  {
                    isValid,
                    resetPassErrorMessage: '',
                    resetConfirmErrorMessage,
                  },
                  callback,
                );
              } else {
                // Password does not meet complexity requirements
                isValid[3].password = false;
                if ('message' in response.data) {
                  this.setState(
                    {
                      isValid,
                      resetPassErrorMessage: response.data.message,
                    },
                    callback,
                  );
                } else {
                  if (debug) {
                    console.log(
                      "Didn't get message in response from password validation",
                    );
                  }
                  this.setState(
                    {
                      isValid,
                      resetPassErrorMessage:
                        'Your password does not meet complexity requirements',
                    },
                    callback,
                  );
                }
              }
            } else {
              // Response does not contain all required fields
              if (debug) {
                console.log(
                  'Response lacking required data:',
                  response.status,
                  response,
                );
                isValid[2] = false;
                this.setState(
                  {
                    isValid,
                  },
                  callback,
                );
              }
            }
          })
          .catch((error) => {
            if (debug) {
              console.log('Error in validation:', error);
            }
            isValid[componentIdx] = false;
            this.setState(
              {
                isValid,
              },
              callback,
            );
          });
        break;
      default:
        break;
    }
  };

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  nextStep = (validateFirst) => () => {
    const { activeComponent, isValid, showValid } = this.state;
    if (validateFirst) {
      this.validate(activeComponent, () => {
        let componentIsValid = isValid[activeComponent];
        showValid[activeComponent] = true;
        if (componentIsValid) {
          this.fetchAssets(activeComponent + 1, () => {
            this.setState({
              activeComponent: activeComponent + 1,
              showValid,
            });
          });
        } else {
          this.setState({
            showValid,
          });
        }
      });
    } else {
      this.fetchAssets(activeComponent + 1, () => {
        this.setState({
          activeComponent: activeComponent + 1,
        });
      });
    }
  };

  prevStep = () => {
    const { activeComponent } = this.state;
    if (activeComponent > 0) {
      this.setState({
        activeComponent: activeComponent - 1,
      });
    }
  };

  attemptSignIn = () => {
    const { history } = this.props;
    const { username, password, isValid } = this.state;
    const uri = '//' + backend + '/api/gatekeeper';
    const data = {
      action: 'sign-in',
      value: {
        username,
        password,
      },
    };
    axios
      .post(uri, data)
      .then((response) => {
        if (response.status === 200) {
          if (response.body) {
            if (response.body.ok === true) {
              isValid[1] = true;
              this.setState(
                {
                  isValid,
                },
                () => {
                  history.push('/');
                },
              );
            } else {
              isValid[1] = false;
              this.setState({
                isValid,
                passwordErrorMessage: response.body.message
                  ? response.body.message
                  : "The request failed but the server didn't tell us why.",
              });
            }
          } else {
            isValid[1] = false;
            this.setState({
              passwordErrorMessage: 'Recieved bodyless response from server.',
            });
            if (debug) {
              console.log('Bodyless response:', response);
            }
          }
        } else {
          isValid[1] = false;
          this.setState({
            passwordErrorMessage: `Recieved invalid response from server: ${
              response.status
            }`,
          });
        }
      })
      .catch((error) => {
        if (debug) {
          console.log('Error validating username and password:', error);
        }
        isValid[1] = false;
      });
    this.setState({
      isValid,
    });
  };

  attemptReset = () => {};

  fetchAssets = (componentIdx, callback) => {
    const { username } = this.state;
    const uri = `//${backend}/api/fetch`;
    let data = {};
    switch (componentIdx) {
      case 2:
        // Fetching security question before advance to #2 (ForgotPasswordFormQuestion)
        data = {
          type: 'secQ',
          value: {
            username,
          },
        };
        axios
          .post(uri, data)
          .then((response) => {
            if (
              response.status === 200 &&
              response.data.ok === true &&
              response.data.secQ
            ) {
              // Valid response
              this.setState(
                {
                  secQ: response.data.secQ,
                },
                callback,
              );
            }
            callback();
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

  getDisplayedComponents = () => {
    const { classes } = this.props;
    const {
      username,
      password,
      hideField,
      secQ,
      secA,
      resetPassword,
      resetConfirm,
      passwordErrorMessage,
      secAErrorMessage,
      resetPassErrorMessage,
      resetConfirmErrorMessage,
      showValid,
      isValid,
    } = this.state;

    const components = [
      {
        content: (
          <UsernameForm
            onReturnKey={this.nextStep(true)}
            username={username}
            showValid={showValid[0]}
            isValid={isValid[0]}
            handleChange={this.handleChange}
          />
        ),
        header: (
          <Fragment>
            <Typography variant="h4" component="p">
              Sign in
            </Typography>
            <Typography variant="h6" component="p">
              with your NumHub Account
            </Typography>
          </Fragment>
        ),
        footer: (
          <Button component={Link} to="/register">
            <Typography>Create An Account</Typography>
          </Button>
        ),
        nextButton: {
          label: 'Next',
          action: this.nextStep(true),
        },
      },
      {
        content: (
          <PasswordForm
            onReturnKey={this.attemptSignIn}
            toggleShowPassword={this.toggleHide('password')}
            hide={hideField.password}
            errorMessage={passwordErrorMessage}
            showValid={showValid[1]}
            isValid={isValid[1]}
            password={password}
            handleChange={this.handleChange}
          />
        ),
        header: (
          <Fragment>
            <Typography variant="h4" component="p">
              Welcome, <span className={classes.boldFace}>{username}</span>
            </Typography>
            <Typography variant="h6" component="p">
              Enter your password below
            </Typography>
          </Fragment>
        ),
        footer: (
          <Button onClick={this.nextStep(false)}>
            <Typography>Forgot password?</Typography>
          </Button>
        ),
        nextButton: {
          label: 'Sign In',
          action: this.attemptSignIn,
        },
        backButton: {
          label: 'Back',
          action: this.prevStep,
        },
      },
      {
        header: (
          <Fragment>
            <Typography variant="h4" component="p">
              Reset your password
            </Typography>
            <Typography variant="h6" component="p">
              But first, {secQ.charAt(0).toLowerCase() + secQ.slice(1)}
            </Typography>
          </Fragment>
        ),
        content: (
          <ForgotPasswordFormQuestion
            onReturnKey={this.nextStep(true)}
            toggleShowSecA={this.toggleHide('secA')}
            hide={hideField.secA}
            errorMessage={secAErrorMessage}
            showValid={showValid[2]}
            isValid={isValid[2]}
            secA={secA}
            handleChange={this.handleChange}
          />
        ),
        nextButton: {
          label: 'Next',
          action: this.nextStep(true),
        },
        backButton: {
          label: 'Back',
          action: this.prevStep,
        },
      },
      {
        header: (
          <Fragment>
            <Typography variant="h4" component="p">
              Reset your password
            </Typography>
            <Typography variant="h6" component="p">
              Great! Now create a new password
            </Typography>
          </Fragment>
        ),
        content: (
          <ForgotPasswordFormReset
            onReturnKey={this.attemptReset}
            resetPassword={resetPassword}
            resetConfirm={resetConfirm}
            toggleShowResetPassword={this.toggleHide('resetPassword')}
            toggleShowResetConfirm={this.toggleHide('resetConfirm')}
            hidePassword={hideField.resetPassword}
            hideConfirm={hideField.resetConfirm}
            errorMessagePassword={resetPassErrorMessage}
            errorMessageConfirm={resetConfirmErrorMessage}
            showValid={showValid[3]}
            isValidPassword={isValid[3].password}
            isValidConfirm={isValid[3].confirm}
            handleChange={this.handleChange}
          />
        ),
        nextButton: {
          label: 'Reset',
          action: this.attemptReset,
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  globalUpdate: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
