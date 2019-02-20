import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/style/europa.scss';
import './assets/style/bell.scss';
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



class App extends Component {

  createSiteLevelItem = (label, icon) => {
    return {label: label, icon: icon}
  }

  siteLevelItems = [
    this.createSiteLevelItem('Primary', <Filter1/>),
    this.createSiteLevelItem('Elementary', <Filter2/>),
    this.createSiteLevelItem('Intermediate', <Filter3/>),
    this.createSiteLevelItem('Secondary', <Filter4/>),
    this.createSiteLevelItem('Undergraduate', <Filter5/>),
    this.createSiteLevelItem('Graduate', <Filter6/>)
  ]

  constructor(props) {
    super(props)

    this.state = {
      sideBarOpen: true,
      siteLevelIdx: 0,
    }
  }

  updateState = (key, value) => {
    this.setState({[key]: value})
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
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
    );
  }
}

export default App;
