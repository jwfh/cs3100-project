import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { backend } from '../settings';
import axios from 'axios';

const styles = (theme) => {};

export class ProfilePage extends Component {
  fetchProfile = async () => {
    const { uid } = this.props;
    const uri = backend ? `//${backend}/api/fetch` : '/api/fetch';
    const requestData = {
      type: 'profile',
      value: {
        uid,
      },
    };
    try {
      const response = await axios.post(uri, requestData);
      const { data } = response;
    } catch (error) {}
  };

  async componentDidMount() {
    if (!this.props.authenticated) {
      this.props.enqueueSnackbar('You need to sign in to post a question.');
      this.props.history.push('/login');
    }
    await this.fetchProfile();
  }

  render() {
    return <div />;
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
