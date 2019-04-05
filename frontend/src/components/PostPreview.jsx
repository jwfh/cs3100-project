import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

const styles = (theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export class PostPreview extends Component {
  render() {
    const { classes } = this.props;
    const { title, bodyPreview } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{bodyPreview}</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small" color="primary">
            More
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

PostPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  bodyPreview: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(styles)(PostPreview);
