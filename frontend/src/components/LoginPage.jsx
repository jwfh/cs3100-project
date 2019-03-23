import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';
import LinkButton from './LinkButton';
import {
  Paper,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import BlackLogo from '../assets/images/logo-01.svg';
import { debug, backend } from '../settings';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  <TextField 
    label="Username"
    value={props.value}
    onChange={props.handleChange}
    margin="normal"
    variant="outlined"
    fullWidth
  />
);

UsernameForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const PasswordForm = (props) => (
  <TextField 
    label="Password"
    type={props.hide ? 'password' : 'text'}
    value={props.value}
    onChange={props.handleChange}
    margin="normal"
    variant="outlined"
    fullWidth
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
);

PasswordForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  toggleShowPassword: PropTypes.func.isRequired,
};

const ForgotPasswordForm = (props) => (
  <TextField 
    label="Security Answer"
    type={props.hide ? 'password' : 'text'}
    value={props.value}
    onChange={props.handleChange}
    margin="normal"
    variant="outlined"
    fullWidth
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
);

ForgotPasswordForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  toggleShowSecA: PropTypes.func.isRequired,
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 0,
      passwordAttempts: 0,
      username: '',
      password: '',
      hidePassword: true,
      secQ: '',
      secA: '',
      hideSecA: true,
      errorMessage: '',
      showValid: [false, false, false],
      isValid: [
        {
          usernameExists: false,
        },
        { 
          passwordCorrect: false,
        },
      ],
    };
  } 

  toggleHide = () => {
    const { activeComponent } = this.state;
    switch (activeComponent) {
      case 1:
        const { hidePassword } = this.state;
        this.setState({
          hidePassword: !hidePassword,
        });
        break;
      case 2:
        const { hideSecA } = this.state;
        this.setState({
          hideSecA: !hideSecA,
        });
        break;
      default:
        break;
    }
  }

  validate = (componentIdx) => {
    let uri = '//' + backend + '/api/validate';
    let data;
    const { 
      username,
      secA,
      isValid,
    } = this.state;
    switch (componentIdx) {
      case 0:
        data = {
          type: 'username',
          value: {
            username,
          },
        };
        break;
      case 2:
        data =  {
          type: 'secA',
          value:  {
            username, 
            secA,
          },
        };
        break;
      default:
        break;
    }
    if (data) {
      axios.post(uri, data).then(
        (response) => {
          if (response.status === 202) {
            isValid[componentIdx] = true;
          } else {
            isValid[componentIdx] = false;
          }
        }
      ).catch(
        (error) => {
          if (debug) {
            console.log('Error in validation:', error);
          }
          isValid[componentIdx] = false;
        }
      );
      this.setState({ 
        isValid,
      });
    }
  };

  handleChange = (input) => ((e) => {
    this.setState({
      [input]: e.target.value,
    });
  });
    
  nextStep = (validateFirst) => (() => {
    const { activeComponent, isValid, showValid } = this.state;
    showValid[activeComponent] = true;
    this.setState({
      showValid,
    });
    this.validate(activeComponent);
    let componentIsValid = isValid[activeComponent];
    if (!validateFirst || componentIsValid) {
      this.fetchAssets(activeComponent + 1);
      this.setState({
        activeComponent: activeComponent + 1,
      });
    }
  });

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
    }
    axios.post(uri, data).then(
      (response) => {
        if (response.status === 202) {
          history.push('/');
        } else {
          isValid[1] = false;
        }
      }
    ).catch(
      (error) => {
        if (debug) {
          console.log('Error validating username and password:', error);
        }  
        isValid[1] = false;
      }
    );
    this.setState({
      isValid,
    });
  }

  prevStep = () => {
    const { activeComponent } = this.state;
    if (activeComponent > 0) {
      this.setState({
        activeComponent: activeComponent - 1,
      });
    }
  };

  fetchAssets = (componentIdx) => (() => {
    const { username } = this.state;
    const uri = '//' + backend +  '/api/fetch';
    let data =  {};
    switch (componentIdx) {
      case 2:
        // Fetching security question before advance to #2 (ForgotPasswordForm)
        data = {
          type: 'secQ',
          value: {
            username,
          },
        };
        axios.post(uri, data).then(
          (response) => {
            console.log(response);
          }
        ).catch(
          (error) => {

          }
        );
        break;
      default:
        break;
    }
  });

  getDisplayedComponents = () => {
    const { classes } = this.props;
    const { 
      username,
      password,
      hidePassword,
      secQ,
      secA,
      hideSecA,
      passwordAttempts,
      errorMessage,
      showValid,
      isValid,
      activeComponent,
    } = this.state;
    const values = {
      username,
      password,
      passwordAttempts,
    };

    const components = [
      {
        content: <UsernameForm 
          value={username}
          handleChange={this.handleChange('username')}
        />,
        header: <Fragment>
          <Typography variant="h4" component="p">
            Sign in
          </Typography>
          <Typography variant="h6" component="p">
            with your NumHub Account
          </Typography>
        </Fragment>,
        footer: <Button 
          component={Link} 
          to="/register"
        >
          <Typography>
            Create An Account
          </Typography>
        </Button>,
        nextButton: {
          label: 'Next',
          action: this.nextStep(true),
        },
      },
      {
        content: <PasswordForm 
          toggleShowPassword={this.toggleHide}
          hide={hidePassword}
          value={password}
          handleChange={this.handleChange('password')}
        />,
        header: <Typography variant="body1">
          Enter the password for <span className={classes.boldFace}>{username}</span>.
        </Typography>,
        footer: <Button 
          onClick={this.nextStep(false)}
          to="/register"
        >
          <Typography>
            Forgot password?
          </Typography>
        </Button>,
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
        content: <ForgotPasswordForm
          toggleShowSecA={this.toggleHide}
          hide={hideSecA}
          value={secA}
          handleChange={this.handleChange('secA')}
        />,
        nextButton: {
          label: 'Reset',
          action() {},
        },
        backButton: {
          label: 'Back',
          action: this.prevStep,
        },
      },
    ];

    return components;
  }

  render() {
    const { classes } = this.props;
    const { activeComponent } = this.state;
    const components = this.getDisplayedComponents();

    return (
      <div className={classes.container}>
        <div className={classes.root}>
          {/* <PageTitle>
            Sign In to NumHub
          </PageTitle> */}
          <Paper
            className={classes.formBody}
            elevation={4}
          >
            {components.map((component, index) => (index === activeComponent && (
              <Fragment key={index}>
                <div className={classes.formHeader}>
                  <img 
                    className={classes.logo}
                    src={BlackLogo} 
                    alt="NumHub"
                  />
                  {component.header && (component.header)}
                </div>
                <div className={classes.formContent}>
                  {component.content}
                </div>
                <div className={classes.formFooter}>
                  <div >
                    {component.footer && (component.footer)}
                  </div>
                  <div className={classes.actionsContainer}>
                    {component.backButton && (<Button
                      disabled={index === 0}
                      onClick={component.backButton.action}
                      className={classes.button}
                    >
                      {component.backButton.label}
                    </Button>)}
                    {component.nextButton && (<Button
                      variant="contained"
                      color="primary"
                      onClick={component.nextButton.action}
                      className={classes.button}
                    >
                      {component.nextButton.label}
                    </Button>)}
                  </div>
                </div>
              </Fragment>
            )))}
          </Paper>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
