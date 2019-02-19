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
import { 
  Filter1, 
  Filter2, 
  Filter3, 
  Filter4, 
  Filter5, 
  Filter6,
} from '@material-ui/icons';

function createSideBarItem(label, icon) {
  return {label: label, icon: icon}
}

const sideBarItems = [
  createSideBarItem('Primary', <Filter1/>),
  createSideBarItem('Elementary', <Filter2/>),
  createSideBarItem('Intermediate', <Filter3/>),
  createSideBarItem('Secondary', <Filter4/>),
  createSideBarItem('Undergraduate', <Filter5/>),
  createSideBarItem('Graduate', <Filter6/>)
]

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

  render() {
    const { classes, sideBarOpen } = this.props;
    return (
      <div>
        <Drawer
          variant="persistent"
          anchor="left"
          open={sideBarOpen}
        >
          <List
            component="nav"
            subheader={<ListSubheader component="div">Question Levels</ListSubheader>}
            className={classes.root}
          >
            {sideBarItems.map((item, index) => (
              <ListItem button key={item['label']}>
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
};

export default withStyles(styles)(SideBar);

