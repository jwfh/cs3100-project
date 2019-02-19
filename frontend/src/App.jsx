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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TaskBar />
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
          <SideBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
