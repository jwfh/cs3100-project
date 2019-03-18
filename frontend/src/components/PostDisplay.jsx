import React, { Component, Fragment } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { classExpression } from 'babel-types';

 const styles = (theme) => ({
   block: {
     display: 'block',
   },
 });

export class PostDisplay extends Component {

  renderMath = (content) => {
    return (
      <Typography>
        {content}
      </Typography>
    );
  };

  render() {
    const { classes, title, content } = this.props;

    return (
      <div className={classes.block}>
          <Typography>
            {title}
          </Typography>
          {this.renderMath(content)}
      </div>
    );
  }
}

export default withStyles(styles)(PostDisplay);
