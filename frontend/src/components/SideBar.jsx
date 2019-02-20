import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListSubheader,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

export class SideBar extends Component {
  state = {
    selectedIndex: 1,
  };

  handleLevelChange = (idx) => {
    // this.props.globalUpdate('siteLevelIdx', idx);
  }

  render() {
    const { classes, siteLevelItems } = this.props;
    return (
      <div>
        <Drawer
          variant="temporary"
          anchor="left"
          open={this.props.sideBarOpen}
        >
          <List
            component="nav"
            subheader={<ListSubheader component="div">Question Levels</ListSubheader>}
            className={classes.root}
          >
            {siteLevelItems.map((item, index) => (
              <ListItem 
                button 
                key={item['label']}
                onClick={this.handleLevelChange(index)}
              >
                <ListItemIcon>{item['icon']}</ListItemIcon>
                <ListItemText primary={item['label']} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  sideBarOpen: PropTypes.bool,
  globalUpdate: PropTypes.func,
  siteLevelItems: PropTypes.array,
};

export default withStyles(styles)(SideBar);

