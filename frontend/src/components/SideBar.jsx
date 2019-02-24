import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListSubheader,
  Divider,
  IconButton,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import {
  sideBarDrawerWidth as drawerWidth
} from '../App';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  numHubType: {
    fontFamily: [
      'Europa',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


export class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
    };
  }

  handleLevelChange = (idx) => {
    console.warn('sdfgj')
    this.props.globalUpdate('siteLevelIdx', idx);
    this.handleDrawerClose();
  }

  handleDrawerOpen = () => {
    this.props.globalUpdate('sideBarOpen', true);
  };

  handleDrawerClose = () => {
    this.props.globalUpdate('sideBarOpen', false);
  };

  render() {
    const { classes, siteLevelItems, theme, sideBarOpen } = this.props;
    return (
      <div className={classes.root}>
      <CssBaseline />
      <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: sideBarOpen,
            [classes.drawerClose]: !sideBarOpen,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: sideBarOpen,
              [classes.drawerClose]: !sideBarOpen,
            }),
          }}
          open={sideBarOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List
          component="nav"
          subheader={
            <ListSubheader 
              component="div"
              className={classNames(sideBarOpen || classes.hide)}
            >
              Question Levels
            </ListSubheader>
          }
        >
          {siteLevelItems.map((item, index) => (
            <ListItem 
              button
              key={item['label']}
              onClick={() => {this.handleLevelChange(index)}}
            >
              <ListItemIcon>{item['icon']}</ListItemIcon>
              <ListItemText className={classes.numHubType} primary={item['label']} />
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
  theme: PropTypes.object.isRequired,
  sideBarOpen: PropTypes.bool,
  globalUpdate: PropTypes.func,
  siteLevelItems: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(SideBar);

