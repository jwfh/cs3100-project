import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const LinkButton = ({ history, ...props }) => {
  return (
    <Button 
      variant="contained"
      color="primary"
      onClick={() => {
        try {
          props.onClick();
          history.push(props.next);
        } catch(error) {
          props.handleError(error);
        }
      }}
    >
      {props.label}
    </Button>
  );
};

LinkButton.defaultProps = {
  onClick() {},
  handleError(error) {
    console.log('Error', error)
  },
  label: 'Submit',
};

LinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  handleError: PropTypes.func.isRequired,
};

export default withRouter(LinkButton);