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
export default LoginPage;
