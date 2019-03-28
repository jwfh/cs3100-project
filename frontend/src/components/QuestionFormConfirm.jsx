import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PostDisplay from './PostDisplay';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 1,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

export class QuestionFormConfirm extends Component {
  render() {
    const { classes, values } = this.props;

    return (
      <Fragment>
        <Typography>
          Please ensure that your problem contains no errors or omissions, and
          that the tags you included reflect the purpose and subject of the
          question.
        </Typography>
        <Paper className={classes.root} elevation={1}>
          <PostDisplay title={values.title} content={values.content} />
          {values.tags.map((tag) => {
            return (
              <Chip
                key={tag.label}
                variant="outlined"
                label={tag.label}
                className={classes.chip}
              />
            );
          })}
        </Paper>
      </Fragment>
    );
  }
}

QuestionFormConfirm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionFormConfirm);
