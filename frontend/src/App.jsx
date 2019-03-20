import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './assets/style/Europa.scss';
import './assets/style/BellSlim.scss';
import 'katex/dist/katex.min.css';
import TaskBar from './components/TaskBar';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
import PostCreatePage from './components/PostCreatePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import PageBody from './components/PageBody';
import Error404 from './components/Error404';
import { 
  Filter1, 
  Filter2, 
  Filter3, 
  Filter4, 
  Filter5, 
  Filter6,
} from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import { SnackbarProvider, withSnackbar } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

export const sideBarDrawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
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
  palette: {
    primary: {
      light: '#1565c0',
      main: '#0d47a1',
      dark: '#002171',
    },
    accent: {
      light: '#ff5983',
      main: '#f50057',
      dark: '#bb002f',
    },
    error: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
    },
  },
});

const styles = (theme) => ({
  a: {
    color: '#00B7FF',
  },
});

class AppBody extends Component {

  constructor(props) {
    super(props);
    this.siteLevelItems = [
      this.createSiteLevelItem('Primary', <Filter1/>),
      this.createSiteLevelItem('Elementary', <Filter2/>),
      this.createSiteLevelItem('Intermediate', <Filter3/>),
      this.createSiteLevelItem('Secondary', <Filter4/>),
      this.createSiteLevelItem('Undergraduate', <Filter5/>),
      this.createSiteLevelItem('Graduate', <Filter6/>),
    ];
    this.state = {
      sideBarOpen: false,
      siteLevelIdx: 0,
      showBrand: true,
    };

    this.createSiteLevelItem = this.createSiteLevelItem.bind(this);

  }

  createSiteLevelItem = (label, icon) => {
    let item = {
      label, 
      icon,
    };
    return item;
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  getState = (key) => {
    return this.state[key];
  };

  render() {
    const { enqueueSnackbar } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={'App'}>
          <TaskBar 
            sideBarOpen={this.state.sideBarOpen}
            globalUpdate={this.updateState}
            siteLevelName={this.siteLevelItems[this.state.siteLevelIdx].label}
          />
          <PageBody>
          <Switch>
            <Route 
              path="/"
              render={(props) => <HomePage {...props} enqueueSnackbar={enqueueSnackbar} />}
              exact
            />
            <Route 
              path="/new"
              render={(props) => <PostCreatePage {...props} enqueueSnackbar={enqueueSnackbar} level={this.siteLevelItems[this.state.siteLevelIdx]} />}
              exact
            />
            <Route 
              path="/register"
              render={(props) => <RegisterPage {...props} enqueueSnackbar={enqueueSnackbar} />}
              exact
            />
            <Route 
              path="/login"
              render={(props) => <LoginPage {...props} enqueueSnackbar={enqueueSnackbar} />}
              exact
            />
            <Route
              path="/forgot"
              render={(props) => <ForgotPasswordPage {...props} enqueueSnackbar={enqueueSnackbar} />}
              exact
            />
            <Route
              render={(props) => <Error404 {...props} enqueueSnackbar={enqueueSnackbar} />}
            />
          </Switch>
          </PageBody>
          <SideBar
            sideBarOpen={this.state.sideBarOpen}
            siteLevelItems={this.siteLevelItems}
            siteLevelIdx={this.state.siteLevelIdx}
            globalUpdate={this.updateState}
          />
        </div>
      </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

AppBody.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

const AppWithStyles = withStyles(styles, { withTheme: true })(AppBody);

const AppWithSnackBar = withSnackbar(AppWithStyles);

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppWithSnackBar />
    </SnackbarProvider>
  );
};

export default App;
