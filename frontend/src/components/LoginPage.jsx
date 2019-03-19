import React, { Component } from 'react';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '75%',
    display: 'inline-block',
    textAlign: 'left',
  },
});


class LoginPage extends Component {
    state = {
      username:'',
      password:'',
      loginpage:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLoginForm:true
    }
    componentWillMount(){;
      var loginpage=[];
      loginpage.push(<LoginForm parentContext={this} appContext={this.parentContext}/>);
      var loginmessage = "Not registered yet, Register Now";
      this.setState({
        loginpage:loginpage,
        loginmessage:loginmessage
      })
    }
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.container}>
        <Paper
          className={classes.root}
          elevation={4}
        >
          <Typography variant="h5" component="h2">
            Login to your NumHub Account
          </Typography>
          <LoginForm />
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
