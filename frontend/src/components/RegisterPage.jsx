import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
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
})

export class RegisterPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Paper
          className={classes.root}
          elevation={4}
        >
          <Typography variant="h5" component="h2">
            Create your NumHub Account
          </Typography>
          <RegisterForm />
        </Paper>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RegisterPage);
