import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import './assets/style/europa.scss';
import './assets/style/bell.scss';
import 'katex/dist/katex.min.css';
import TaskBar from './components/TaskBar';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"; 
import CssBaseline from '@material-ui/core/CssBaseline';

export const sideBarDrawerWidth = 240;

// function getContrastText(color) {
//   return (getLuminance(color) <= 0.5) ? dark.text.primary : light.text.primary;
// }

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

const styles = theme => ({
  a: {
    color: '#00B7FF',
  },
})

class App extends Component {

  constructor(props) {
    super(props)
    this.siteLevelItems = [
      this.createSiteLevelItem('Primary', <Filter1/>),
      this.createSiteLevelItem('Elementary', <Filter2/>),
      this.createSiteLevelItem('Intermediate', <Filter3/>),
      this.createSiteLevelItem('Secondary', <Filter4/>),
      this.createSiteLevelItem('Undergraduate', <Filter5/>),
      this.createSiteLevelItem('Graduate', <Filter6/>)
    ];
    this.state = {
      sideBarOpen: false,
      siteLevelIdx: 0,
      showBrand: true,
    };

    this.createSiteLevelItem = this.createSiteLevelItem.bind(this);

  }

  createSiteLevelItem(label, icon) {
    let item = {label: label, icon: icon};
    return item;
  };

  updateState = (key, value) => {
    this.setState({[key]: value});
  };

  getState = (key) => {
    return this.state[key];
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={"App"}>
          <TaskBar 
            sideBarOpen={this.state.sideBarOpen}
            globalUpdate={this.updateState}
            siteLevelName={this.siteLevelItems[this.state.siteLevelIdx].label}
          />
          <PageBody>
          <Switch>
            <Route 
              path="/"
              component={HomePage}
              exact
            />
            <Route 
              path="/register"
              component={RegisterPage}
              exact
            />
            <Route 
              path="/login"
              component={LoginPage}
              exact
            />
            <Route
              path="/forgot"
              component={ForgotPasswordPage}
              exact
            />
            <Route
              component={Error404}
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


App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(App);
