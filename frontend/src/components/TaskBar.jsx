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
  Button,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  AccountCircle,
  Add,
  Settings,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import WhiteLogo from '../assets/images/logo-02.svg';
import { sideBarDrawerWidth as drawerWidth } from '../App';

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
    color: '#fff',
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
  button: {
    color: '#fff',
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
    const { classes, siteLevelName, sideBarOpen, authenticated } = this.props;
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
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
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
        <MenuItem
          onClick={() => {
            this.props.history.push('/new');
            this.handleMenuClose();
          }}
        >
          <IconButton color="inherit">
            <Add />
          </IconButton>
          <p>New Question</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
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
                sideBarOpen && classes.hide,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Link style={{ textDecoration: 'none' }} to="/">
              <div className={classes.brand}>
                <img className={classes.logo} src={WhiteLogo} alt="NumHub" />
                <Typography
                  className={classes.siteVariant}
                  variant="h5"
                  color="inherit"
                  noWrap
                >
                  {siteLevelName}
                </Typography>
              </div>
            </Link>
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
            {authenticated ? (
              <div className={classes.sectionDesktop}>
                <IconButton
                  component={Link}
                  to="/admin"
                  className={classes.button}
                >
                  <Settings />
                </IconButton>
                <IconButton
                  component={Link}
                  to="/new"
                  className={classes.button}
                >
                  <Add />
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  component={Link}
                  to="/profile"
                  className={classes.button}
                >
                  <AccountCircle />
                </IconButton>
              </div>
            ) : (
              <div className={classes.sectionDesktop}>
                <Button component={Link} to="/login" className={classes.button}>
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  className={classes.button}
                >
                  Register
                </Button>
              </div>
            )}
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
  authenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TaskBar);
