import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  pageTitleText: {
    marginBottom: '3vh',
    textAlign: 'left',
  },
  pageSubtitleText: {
    marginBottom: '2vh',
    textAlign: 'left',
  },
});

const TitleComponent = (props) => (
  <Typography
    variant="h4"
    component="h2"
    className={props.classes.pageTitleText}
  >
    {props.children}
  </Typography>
);

TitleComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SubtitleComponent = (props) => (
  <Typography
    variant="h5"
    component="h3"
    className={props.classes.pageSubtitleText}
  >
    {props.children}
  </Typography>
);

SubtitleComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Title = withStyles(styles)(TitleComponent);
const Subtitle = withStyles(styles)(SubtitleComponent);

export { Title, Subtitle };
