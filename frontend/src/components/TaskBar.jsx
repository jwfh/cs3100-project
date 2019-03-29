import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from '@material-ui/core';
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import MenuButton from './AccountBar';
import NotificationBar from './NotificationBar';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import WhiteLogo from '../assets/images/logo-02.svg';
import {
  sideBarDrawerWidth as drawerWidth,
} from '../App';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing.unit * -1,
    marginRight: theme.spacing.unit * 1,
  },
  hide: {
    display: 'none',
  },
  logo: {
    width: theme.spacing.unit * 4,
    height: '100%',
    pointerEvents: 'none',
    display: 'none',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    margin: theme.spacing.unit * 1,
    [theme.breakpoints.up('xs')]: {
      display: 'inline',
    },
  },
  siteVariant: {
    fontSize: theme.spacing.unit * 3,
    fontFamily: 'BellSlim',
    fontWeight: 500,
    verticalAlign: '-17%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline',
    },
  },
  brand: {
    position: 'relative',
    display: 'block',
    verticalAlign: 'middle',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class TaskBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleDrawer = () => {
    this.props.globalUpdate('sideBarOpen', !this.props.sideBarOpen);
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  // handleHomeButton = () => {

  // };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, siteLevelName, sideBarOpen } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Notification 1</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Notification 2</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Notification 3</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Notification 4</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <NotificationBar onClick={this.handleMobileMenuClose}>
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>

          <p>Notifications</p>
        </NotificationBar>
        <MenuButton onClick={this.handleProfileMenuOpen}>
          <AccountCircle items={['Profile', 'My account']} />
          <p>Profile</p>
        </MenuButton>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: sideBarOpen,
          })}
        >
          <Toolbar
          // disableGutters={!sideBarOpen}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawer}
              // className={classNames(classes.menuButton, {
              //   [classes.hide]: sideBarOpen,
              // })}
              className={classNames(
                classes.menuButton,
                sideBarOpen && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.brand}>
              <img
                className={classes.logo}
                src={WhiteLogo}
                alt="NumHub"
              ></img>
              <Typography
                className={classes.siteVariant}
                variant="h5"
                color="inherit"
                noWrap
              >
                {siteLevelName}
              </Typography>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              }
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <MenuButton iconType={AccountCircle} items={['Profile', 'My account']} />

            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

TaskBar.propTypes = {
  classes: PropTypes.object.isRequired,
  sideBarOpen: PropTypes.bool,
  globalUpdate: PropTypes.func,
  siteLevelName: PropTypes.string,
};

export default withStyles(styles)(TaskBar);
