import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { backend, debug } from '../settings';
import { Title, Subtitle } from './PageTitle';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  hidden: {
    display: 'none',
  },
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '75%',
    display: 'inline-block',
    textAlign: 'left',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});
export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      fetched: false,
    };
  }

  fetchProfile = async () => {
    const { numHubSessionKey } = this.props;
    const uri = backend ? `//${backend}/api/fetch` : '/api/fetch';
    const requestData = {
      type: 'profile',
      value: {
        numHubSessionKey,
      },
    };
    try {
      const response = await axios.post(uri, requestData);
      const { data } = await response;
      const { profile } = await data;
      this.setState({
        user: profile,
        fetched: true,
      });
    } catch (error) {
      if (debug) {
        console.log('Profile fetch failed.');
      }
    }
  };

  async componentDidMount() {
    if (!this.props.authenticated) {
      this.props.enqueueSnackbar('You need to sign in to view your profile.');
      this.props.history.push('/login');
    }
    await this.fetchProfile();
  }

  render() {
    const { classes } = this.props;
    const { fetched, user } = this.state;

    if (fetched) {
      return (
        <div className={classes.container}>
          <div className={classes.root}>
            <Title>My Profile</Title>
            <Typography>
              <b>Username:</b> {user.username}
            </Typography>
            <Typography>
              <b>Full name:</b> {user.name}
            </Typography>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
