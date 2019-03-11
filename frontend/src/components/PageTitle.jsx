import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  pageTitleText: {
    marginBottom: '3vh',
    textAlign: 'left',
  },
});

export class PageTitle extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Typography 
        variant="h4" 
        component="h2" 
        className={classes.pageTitleText}
      >
        {children}
      </Typography>
    );
  }
}

export default withStyles(styles)(PageTitle);
