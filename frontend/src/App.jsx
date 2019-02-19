import React, { Component } from 'react';
import './assets/style/europa.scss';
import './assets/style/bell.scss';
import './App.scss';
import RegisterForm from './components/RegisterForm';
import TaskBar from './components/TaskBar';
import SideBar from './components/SideBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskBar>

        </TaskBar>
        <RegisterForm 
        
        />
        <SideBar>
          
        </SideBar>
      </div>
    );
  }
}

export default App;
