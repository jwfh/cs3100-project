import React, { Component } from 'react';
import PageTitle from './PageTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  titleField: {
    width: '100%',
  },
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '75%',
    display: 'inline-block',
    textAlign: 'left',
  },
});

export class PostCreatePage extends Component {

  state = {
    title: '',
    content: '',
  };

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const {
      title,
      content,
    } = this.state;
    const values = {
      title,
      content,
    };
    const { classes } = this.props;

    return (
      <MuiThemeProvider>
        <div className={classes.container}>
          <div className={classes.root}>
            <PageTitle>
              Post a Question
            </PageTitle>
            <TextField 
              label="Question Title"
              placeholder="Name Your Question"
              className={classes.titleField}
              fullWidth={true}
              onChange={ this.handleChange('title') }
              defaultValue={ values.title }
            />
            <TextField
              label="Question Content"
              placeholder="Enter Your Question"
              multiline
              fullWidth
              rows="8"
              value={values.content}
              onChange={this.handleChange('content')}
              margin="normal"
              variant="outlined"
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(PostCreatePage);
