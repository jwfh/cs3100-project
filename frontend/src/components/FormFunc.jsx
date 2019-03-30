import React from 'react';
import PropTypes from 'prop-types';

const FormFunc = (props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    {props.children}
  </form>
);

FormFunc.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormFunc;
