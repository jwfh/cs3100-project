import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class PostCreateFormContent extends Component {
  state = {
    contentHasSyntaxError: false,
    contentErrorMsg: '',
  };

  render() {
    const { values, handleChange, classes } = this.props;
    const { contentHasSyntaxError, contentErrorMsg } = this.state;
    return (
      <MuiThemeProvider>
        <Fragment>
          <TextField 
            label="Problem Title"
            placeholder="Name Your Problem"
            className={ classes.titleField }
            fullWidth={ true }
            onChange={ handleChange('title') }
            defaultValue={ values.title }
          />
          <TextField
            label="Problem Content"
            placeholder="Enter Your Problem"
            helperText={ contentHasSyntaxError ? contentErrorMsg : "You can use Markdown and LaTeX to style your question." }
            multiline
            fullWidth
            rows="8"
            value={values.content}
            onChange={handleChange('content')}
            margin="normal"
            variant="outlined"
          />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

PostCreateFormContent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
}

export default PostCreateFormContent;
