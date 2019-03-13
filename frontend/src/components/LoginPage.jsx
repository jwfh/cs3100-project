import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class LoginPage extends Component {
    state = {
      username:'',
      password:'',
      loginpage:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLoginForm:true
    }
    componentWillMount(){;
      var loginpage=[];
      loginpage.push(<LoginForm parentContext={this} appContext={this.parentContext}/>);
      var loginmessage = "Not registered yet, Register Now";
      this.setState({
        loginpage:loginpage,
        loginmessage:loginmessage
      })
    }
    render() {
      return (
        <div className="loginpage">
          {this.state.loginpage}
          <div>
            {this.state.loginmessage}
            <MuiThemeProvider>
              <div>
                <RaisedButton label={this.state.buttonLabel} primary={true} onClick={(event) => this.handleClick(event)}/>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      );
    }
}
handleClick(event); {
  // console.log("event",event);
  var loginmessage;
  if(this.state.isLogin){
    var loginscreen=[];
    loginscreen.push(<Register parentContext={this}/>);
    loginmessage = "Already registered.Go to Login";
    this.setState({
                   loginscreen:loginscreen,
                   loginmessage:loginmessage,
                   buttonLabel:"Login",
                   isLogin:false
                 })
  }
  else{
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this}/>);
    loginmessage = "Not Registered yet.Go to registration";
    this.setState({
                   loginscreen:loginscreen,
                   loginmessage:loginmessage,
                   buttonLabel:"Register",
                   isLogin:true
                 })
  }
}
export default withStyles(styles) (LoginPage);
