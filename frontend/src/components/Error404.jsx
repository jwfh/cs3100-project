import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({

});

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

export default withStyles(styles)(Error404);
