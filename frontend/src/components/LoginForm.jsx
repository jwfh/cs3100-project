import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import { 
  withRouter
} from 'react-router-dom';

const styles = (theme) => ({
    formBody: {
      textAlign: 'center',
    },
    button: {
      margin: 15,
    },
});

const SubmitButton = withRouter(({ history, ...props }) => (
  <RaisedButton  label="Submit" primary={true} onClick={() => {
    props.handleError('test');
    // history.push('/');
  }}/>
));

class Login extends Component {

  state = {
    username: '',
    password: '',
    errMsg: '',
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={this.handleChange('username')}
            />
            <br/>
            <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={this.handleChange('password')}
            />
            <br/> 
            <SubmitButton handleError={(errMsg) => {this.setState( { errMsg: errMsg })}} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
export default withStyles(styles)(Login);
