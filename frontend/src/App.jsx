import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles, withTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import './assets/style/europa.scss';
import './assets/style/bell.scss';
import 'katex/dist/katex.min.css';
import './App.scss';
import TaskBar from './components/TaskBar';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import Error404 from './components/Error404';
import { 
  Filter1, 
  Filter2, 
  Filter3, 
  Filter4, 
  Filter5, 
  Filter6,
} from '@material-ui/icons';
import { MuiThemeProvider } from "@material-ui/core/styles"; 
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue100 } from 'material-ui/styles/colors';

export const sideBarDrawerWidth = 240;


const theme = createMuiTheme({
  typography: { useNextVariants: true },
});
/*
const styles = theme => ({
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
});*/

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
    };

    this.createSiteLevelItem = this.createSiteLevelItem.bind(this);

  }

  componentDidMount() {
    
  }

  createSiteLevelItem(label, icon) {
    let item = {label: label, icon: icon};
    return item;
  };


  updateState = (key, value) => {
    this.setState({[key]: value})
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={classNames("App", classes.numHubType)}>
          <TaskBar 
            sideBarOpen={this.state.sideBarOpen}
            globalUpdate={this.updateState}
            siteLevelName={this.siteLevelItems[this.state.siteLevelIdx].label}
          />
          <Switch>
            <Route 
              path="/"
              component={HomePage}
              exact
            />
            <Route 
              path="/register"
              component={RegisterForm}
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
          <SideBar
            sideBarOpen={this.state.sideBarOpen}
            siteLevelItems={this.siteLevelItems}
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

export default withStyles({withTheme: true})(App);
