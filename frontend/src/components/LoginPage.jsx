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

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  formBody: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    // TODO: Change based on breakpoint
    width: '50%',
    display: 'inline-block',
    textAlign: 'center',
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
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: 15,
  },
  logo: {
    width: theme.spacing.unit * 12,
    height: '100%',
    pointerEvents: 'none',
    display: 'none',
    textAlign: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    margin: theme.spacing.unit * 1,
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
});

const UsernameForm = (props) => (
  <TextField 
    label="Username"
    placeholder="Enter Your Username"
    value={props.value}
    onChange={props.handleChange('username')}
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
    placeholder="Enter Your Password"
    value={props.value}
    onChange={props.handleChange('password')}
    margin="normal"
    variant="outlined"
    fullwidth
  />
);

PasswordForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

const ForgotPasswordForm = (props) => (
  <TextField 
    label="Security Answer"
    placeholder="Enter Your Answer"
    value={props.value}
    onChange={props.handleChange('secAnswer')}
    margin="normal"
    variant="outlined"
    fullwidth
  />
);

ForgotPasswordForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 0,
      passwordAttempts: 0,
      username: '',
      password: '',
      secAnswer: '',
      errorMessage: '',
      isValid: [],
    };
  } 

  validate = (component) => {
    const { isValid } = this.state;
    switch (component) {
      default:
        break;
    }
    this.setState({ 
      isValid,
    });
  };

  handleChange = input => e => {
    const { activeComponent } = this.state;
    this.setState({
      [input]: e.target.value,
    }, () => {
      this.validate(activeComponent);
    });
  };
    
  getDisplayedComponents = () => {
    const { classes } = this.props;
    const { 
      username,
      password,
      secAnswer,
      passwordAttempts,
      errorMessage,
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
          handleChange={this.handleChange}
        />,
        footer: <Link to="/register">Create An Account</Link>,
        nextButton: {
          label: 'Next',
          action() {},
        },
      },
      {
        content: <PasswordForm 
          value={password}
          handleChange={this.handleChange}
        />,
        header: <Typography variant="body1">
          Enter the password for <span className={classes.boldFace}>{username}</span>.
        </Typography>,
        nextButton: {
          label: 'Sign In',
          action() {},
        },
        backButton: {
          label: 'Back',
          action() {},
        },
      },
      {
        content: <ForgotPasswordForm
          value={secAnswer}
          handleChange={this.handleChange}
        />,
        nextButton: {
          label: 'Reset',
          action() {},
        },
        backButton: {
          label: 'Back',
          action() {},
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
          <PageTitle>
            Sign In to NumHub
          </PageTitle>
          <Paper
            className={classes.formBody}
            elevation={4}
          >
            <img 
              className={classes.logo}
              src={BlackLogo} 
              alt="NumHub"
            />
            {components.map((component, index) => (index == activeComponent && (
              <Fragment key={index}>
                
                {component.header && (<Typography>{component.header}</Typography>)}
                {component.content}
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
                  {component.footer && (<Typography>{component.footer}</Typography>)}
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
};

export default withStyles(styles)(LoginPage);
