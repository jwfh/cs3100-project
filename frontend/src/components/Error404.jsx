import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Error404 extends Component {
  render() {
    return (
      <div>
        Error 404 Not Found
      </div>
    );
  }
}

Error404.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Error404;
