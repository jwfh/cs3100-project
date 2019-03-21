import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export class QuestionFormContent extends Component {
  render() {
    const { values, handleChange, classes } = this.props;
    return (
        <Fragment>
          <TextField 
            label="Problem Title"
            placeholder="Name Your Problem"
            className={classes.titleField}
            fullWidth={true}
            onChange={handleChange('title')}
            defaultValue={values.title}
            error={values.showValid[0] && !values.isValid[0].titleNotEmpty}
          />
          <TextField
            label="Problem Content"
            placeholder="Enter Your Problem"
            helperText={values.isValid[0].contentSyntaxErrorFree ? 'You can use Markdown and LaTeX to style your question.' : values.contentSyntaxErrorMsg }
            multiline
            fullWidth
            rows="8"
            value={values.content}
            onChange={handleChange('content')}
            margin="normal"
            variant="outlined"
            error={(values.showValid[0] && !values.isValid[0].contentNotEmpty) || !values.isValid[0].contentSyntaxErrorFree}
          />
        </Fragment>
    );
  }
}

QuestionFormContent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default QuestionFormContent;
