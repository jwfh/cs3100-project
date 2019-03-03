import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  main: {
    margin: '1in',
  },
});

export class PageBody extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <main className={classes.main}>
        {children}
      </main>
    );
  }
}

export default withStyles(styles)(PageBody);
