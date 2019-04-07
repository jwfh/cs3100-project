import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import FormFunc from './FormFunc';
import { FormatListBulletedRounded } from '@material-ui/icons';

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
    textAlign: 'left',
    paddingBottom: '1vh',
  },
  boldFace: {
    fontWeight: 'bold',
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 240,
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
  <FormFunc onSubmit={props.onReturnKey}>
    <TextField
      label="Username"
      onChange={props.handleChange('username')}
      value={props.username}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.usernameValid
          ? ''
          : props.usernameErrorMsg
      }
      error={props.showValid && !props.isValid.usernameValid}
    />
    <TextField
      type={props.hidePassword ? 'password' : 'text'}
      label="Password"
      onChange={props.handleChange('password')}
      value={props.password}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        !props.showValid || props.isValid.passwordComplex
          ? ''
          : props.passwordErrorMessage
      }
      error={props.showValid && !props.isValid.passwordComplex}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.toggleShowPassword}
            >
              {props.hidePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <TextField
      type={props.hideConfirmPassword ? 'password' : 'text'}
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.toggleShowConfirm}
            >
              {props.hideConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </FormFunc>
);

RegisterFormAccount.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameErrorMsg: PropTypes.string.isRequired,
  passwordErrorMessage: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  showValid: PropTypes.bool.isRequired,
  isValid: PropTypes.object.isRequired,
  hidePassword: PropTypes.bool.isRequired,
  hideConfirmPassword: PropTypes.bool.isRequired,
  toggleShowPassword: PropTypes.func.isRequired,
  toggleShowConfirm: PropTypes.func.isRequired,
};

const RegisterFormDetails = (props) => (
  <FormFunc onSubmit={props.onReturnKey}>
    <TextField
      label="Given name"
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
  </FormFunc>
);

RegisterFormDetails.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  givenName: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  showValid: PropTypes.bool.isRequired,
  isValid: PropTypes.object.isRequired,
};

export class RegisterFormSecurity extends Component {
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const props = this.props;

    return (
      <FormFunc onSubmit={props.onReturnKey}>
        <FormControl
          fullWidth
          variant="outlined"
          className={props.classes.formControl}
        >
          <InputLabel
            ref={(ref) => {
              this.InputLabelRef = ref;
            }}
            htmlFor="secQ"
          >
            Security Question
          </InputLabel>
          <Select
            variant="outlined"
            value={props.chosenSecurityQuestion}
            onChange={props.handleChange('chosenSecurityQuestion')}
            input={<OutlinedInput labelWidth={2} name="secQ" id="secQ" />}
          >
            {props.securityQuestions.map((question, index) => (
              <MenuItem key={index} value={question.id}>
                {question.question}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type={props.hideSecA ? 'password' : 'text'}
          label="Security answer"
          onChange={props.handleChange('securityAnswer')}
          value={props.securityAnswer}
          margin="normal"
          variant="outlined"
          fullWidth
          helperText={
            !props.showValid || props.isValid.secANotEmpty
              ? ''
              : 'This field is required.'
          }
          error={props.showValid && !props.isValid.secANotEmpty}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle security question visibility"
                  onClick={props.toggleShowSecA}
                >
                  {props.hideSecA ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormFunc>
    );
  }
}

RegisterFormSecurity.propTypes = {
  onReturnKey: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  securityAnswer: PropTypes.string.isRequired,
  securityQuestions: PropTypes.array.isRequired,
  chosenSecurityQuestion: PropTypes.number.isRequired,
  showValid: PropTypes.bool.isRequired,
  isValid: PropTypes.object.isRequired,
  hideSecA: PropTypes.bool.isRequired,
  toggleShowSecA: PropTypes.func.isRequired,
};

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 0,
      username: '',
      usernameErrorMsg: '',
      password: '',
      passwordErrorMessage: '',
      confirmPassword: '',
      givenName: '',
      surname: '',
      email: '',
      hidePassword: true,
      hideConfirmPassword: true,
      hideSecA: true,
      securityQuestionList: [],
      chosenSecurityQuestion: 0,
      securityAnswer: '',
      showValid: [false, false, false],
      isValid: [
        {
          usernameValid: false,
          passwordComplex: false,
          passwordsMatch: false,
        },
        {
          givenNameNotEmpty: false,
          surnameNotEmpty: false,
          emailValid: false,
        },
        {
          secANotEmpty: false,
        },
      ],
      postSuccessful: false,
    };
  }

  toggleHide = (field) => () => {
    const { hidePassword, hideConfirmPassword, hideSecA } = this.state;
    switch (field) {
      case 'password':
        this.setState({
          hidePassword: !hidePassword,
        });
        break;

      case 'confirmPassword':
        this.setState({
          hideConfirmPassword: !hideConfirmPassword,
        });
        break;
      case 'securityAnswer':
        this.setState({
          hideSecA: !hideSecA,
        });
        break;
      default:
        break;
    }
  };

  fetchAssets = (componentIdx, callback) => {
    const uri = backend ? `//${backend}/api/fetch/all` : '/api/fetch/all';
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
                response.data &&
                response.data.length > 0 &&
                'id' in response.data[0] &&
                'question' in response.data[0]
              ) {
                const sortedQuestions = response.data.sort((a, b) => {
                  if (a.id < b.id) return -1;
                  if (a.id > b.id) return 1;
                  return 0;
                });
                this.setState(
                  {
                    securityQuestionList: sortedQuestions,
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
      let componentIsValid = true;
      for (let val in isValid[activeComponent]) {
        if (!isValid[activeComponent][val]) {
          componentIsValid = false;
          break;
        }
      }
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

  handleChangeSelect = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  validate = async (step, callback) => {
    const {
      isValid,
      username,
      password,
      confirmPassword,
      givenName,
      surname,
      email,
      securityAnswer,
    } = this.state;
    const uri = backend ? `//${backend}/api/validate` : '/api/validate';
    let passwordErrorMessage, usernameErrorMsg;
    switch (step) {
      case 0:
        // Login info
        if (username !== '') {
          try {
            const requestData = {
              type: 'username',
              value: {
                username,
              },
            };
            const response = await axios.post(uri, requestData);
            const { data } = await response;
            if (data.ok === true) {
              if (data.exists === false) {
                isValid[0].usernameValid = true;
                usernameErrorMsg = '';
              } else {
                isValid[0].usernameValid = false;
                if (data.message) {
                  usernameErrorMsg = data.message;
                } else {
                  usernameErrorMsg = 'Username exists already.';
                }
              }
            } else {
              isValid[0].usernameValid = false;
              if (debug) {
                console.log('Invalid response when validating username.');
              }
            }
          } catch (error) {
            isValid[0].usernameValid = false;
            if (debug) {
              console.log('Error when attempting to validate username:', error);
            }
          }
        } else {
          isValid[0].usernameValid = false;
          usernameErrorMsg = 'Username cannot be empty.';
        }
        try {
          const requestData = {
            type: 'password',
            value: {
              password,
            },
          };
          const response = await axios.post(uri, requestData);
          const { data } = await response;
          if (data.ok === true) {
            isValid[0].passwordComplex = true;
            passwordErrorMessage = '';
          } else {
            isValid[0].passwordComplex = false;
            if (data.message) {
              passwordErrorMessage = data.message;
            }
          }
        } catch (error) {
          isValid[0].passwordComplex = false;
          if (debug) {
            console.log(
              'Error when attempting to validate password complexity:',
              error,
            );
          }
        }
        isValid[0].passwordsMatch = password === confirmPassword;
        this.setState(
          {
            isValid,
            usernameErrorMsg,
            passwordErrorMessage,
          },
          callback,
        );
        break;
      case 1:
        // Personal info
        isValid[1].givenNameNotEmpty = givenName !== '';
        isValid[1].surnameNotEmpty = surname !== '';
        isValid[1].emailValid = email.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
        );
        this.setState(
          {
            isValid,
          },
          callback,
        );
        break;
      case 2:
        // Security answer
        isValid[2].secANotEmpty = securityAnswer !== '';
        this.setState(
          {
            isValid,
          },
          callback,
        );
        break;
      default:
        break;
    }
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

  attemptRegistration = () => {
    const {
      activeComponent,
      username,
      password,
      chosenSecurityQuestion,
      securityQuestionList,
      securityAnswer,
      givenName,
      surname,
      email,
    } = this.state;
    this.validate(activeComponent, () => {
      if (this.isValid(activeComponent)) {
        const uri = backend ? `//${backend}/api/gatekeeper` : '/api/gatekeeper';
        const data = {
          action: 'register',
          value: {
            username,
            password,
            name: givenName + ' ' + surname,
            secQ: securityQuestionList[chosenSecurityQuestion].question,
            secA: securityAnswer,
            email,
          },
        };
        const config = {
          timeout: 2000,
          crossOrigin: true,
          withCredentials: true,
        };
        axios
          .post(uri, data, config)
          .then((response) => {
            if (response.status === 200 && response.data) {
              if (response.data.ok === true) {
                this.props.enqueueSnackbar(
                  'You are now registered; try signing in.',
                  { variant: 'success' },
                );
                this.props.history.push('/login');
              } else if (debug) {
                if ('message' in response.data) {
                  console.log(
                    'The server rejected the register request:',
                    response.data.message,
                  );
                } else {
                  console.log(
                    'The server rejected the register request but neglected to say why.',
                  );
                }
              }
            } else if (debug) {
              console.log('Bodyless response from server.');
            }
          })
          .catch((error) => {});
      } else {
      }
    });
  };

  getDisplayedComponents = () => {
    const { classes } = this.props;
    const {
      username,
      password,
      usernameErrorMsg,
      passwordErrorMessage,
      confirmPassword,
      givenName,
      surname,
      hideConfirmPassword,
      hidePassword,
      hideSecA,
      email,
      securityQuestionList,
      chosenSecurityQuestion,
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
            onReturnKey={this.nextStep(true)}
            classes={classes}
            handleChange={this.handleChange}
            username={username}
            password={password}
            hidePassword={hidePassword}
            hideConfirmPassword={hideConfirmPassword}
            confirmPassword={confirmPassword}
            showValid={showValid[0]}
            isValid={isValid[0]}
            toggleShowPassword={this.toggleHide('password')}
            toggleShowConfirm={this.toggleHide('confirmPassword')}
            usernameErrorMsg={usernameErrorMsg}
            passwordErrorMessage={passwordErrorMessage}
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
            onReturnKey={this.nextStep(true)}
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
              One last step...
            </Typography>
            <Typography variant="h6" component="p">
              Help us secure your account.
            </Typography>
          </Fragment>
        ),
        content: (
          <RegisterFormSecurity
            onReturnKey={this.attemptRegistration}
            classes={classes}
            hideSecA={hideSecA}
            handleChange={this.handleChange}
            handleChangeSelect={this.handleChangeSelect}
            securityQuestions={securityQuestionList}
            chosenSecurityQuestion={chosenSecurityQuestion}
            securityAnswer={securityAnswer}
            toggleShowSecA={this.toggleHide('securityAnswer')}
            showValid={showValid[2]}
            isValid={isValid[2]}
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

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.enqueueSnackbar('You are already signed in.');
      this.props.history.push('/');
    }
  }

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
