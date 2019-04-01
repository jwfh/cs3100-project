import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { GroupAdd, Lock, LockOpen, RemoveCircle } from '@material-ui/icons';
import axios from 'axios';
import { debug, backend, lockoutCount } from '../settings';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from '@material-ui/core';
import { Title, Subtitle } from './PageTitle';
import FormFunc from './FormFunc';

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  hidden: {
    display: 'none',
  },
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '75%',
    display: 'inline-block',
    textAlign: 'left',
  },
  block: {
    marginBottom: theme.spacing.unit * 5,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

export class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedUsers: false,
      users: [],
      fetchedTags: false,
      tags: [],
      newTag: '',
    };
  }

  fetchUsers = async () => {
    const uri = '//' + backend + '/api/fetch/all';
    const requestData = {
      type: 'user',
    };
    const config = {
      timeout: 2000,
    };
    try {
      const users = await axios.post(uri, requestData, config);
      const { data } = await users;
      this.setState(
        {
          users: data,
          fetchedUsers: true,
        },
        () => {
          if (debug) {
            console.log('Successfully retrieved users from API');
          }
        },
      );
    } catch (error) {
      if (debug) {
        console.log('Unable to retrieve users:', error);
      }
    }
  };

  fetchTags = async () => {
    const uri = `//${backend}/api/fetch/all`;
    const requestData = {
      type: 'tag',
    };
    const config = {
      timeout: 2000,
    };
    try {
      const users = await axios.post(uri, requestData, config);
      const { data } = await users;
      this.setState(
        {
          tags: data.map((row) => row.tag.toLowerCase()),
          fetchedTags: true,
        },
        () => {
          if (debug) {
            console.log('Successfully retrieved tags from API');
          }
        },
      );
    } catch (error) {
      if (debug) {
        console.log('Unable to retrieve tags:', error);
      }
    }
  };

  addTag = async () => {
    const { newTag } = this.state;
    if (newTag !== '') {
      if (debug) {
        console.log('Submitting tag', newTag, 'for creation.');
      }
      const uri = `//${backend}/api/post/create`;
      const requestData = {
        type: 'tag',
        value: {
          tag: newTag,
        },
      };
      const config = {
        timeout: 2000,
      };
      try {
        const response = await axios.post(uri, requestData, config);
        const { status, data } = await response;
        if (status === 200 && data.ok === true) {
          this.setState(
            {
              newTag: '',
            },
            () => {
              if ('message' in data) {
                this.props.enqueueSnackbar(data.message);
              } else {
                this.props.enqueueSnackbar('Tag added');
              }
              if (debug) {
                console.log('Successfully created new tag');
              }
            },
          );
          await this.fetchAll();
        } else {
          this.props.enqueueSnackbar('An erorr occurred.', {
            variant: 'error',
          });
        }
      } catch (error) {
        if (debug) {
          console.log('Unable to create new tag:', error);
        }
      }
    }
  };

  makeAdmin = (uid) => () => {
    const uri = `//${backend}/api/update`;
    const data = {
      type: 'admin',
      value: {
        uid,
      },
    };
    axios.post(uri, data).then((response) => {
      if (response.status === 200 && response.data.ok === true) {
        this.fetchUsers();
      }
    });
  };

  unlockAccount = (uid) => () => {
    const uri = `//${backend}/api/update`;
    const data = {
      type: 'lockoutCount',
      value: {
        uid,
      },
    };
    axios.post(uri, data).then((response) => {
      if (response.status === 200 && response.data.ok === true) {
        this.fetchUsers();
      }
    });
  };

  deleteAccount = (uid) => () => {
    const uri = `//${backend}/api/delete`;
    const data = {
      type: 'user',
      value: {
        uid,
      },
    };
    axios.post(uri, data).then((response) => {
      if (response.status === 200 && response.data.ok === true) {
        this.fetchUsers();
      }
    });
  };

  getActions = (user) => (
    <Fragment>
      {user.admin ? (
        <IconButton disabled color="inherit">
          <GroupAdd />
        </IconButton>
      ) : (
        <IconButton onClick={this.makeAdmin(user.id)} color="inherit">
          <GroupAdd />
        </IconButton>
      )}
      {user.lockoutCount >= lockoutCount ? (
        <IconButton onClick={this.unlockAccount(user.id)} color="inherit">
          <Lock />
        </IconButton>
      ) : (
        <IconButton disabled color="inherit">
          <LockOpen />
        </IconButton>
      )}
      <IconButton onClick={this.deleteAccount(user.id)} color="inherit">
        <RemoveCircle />
      </IconButton>
    </Fragment>
  );

  makeUserTable = (users) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Username</TableCell>
          <TableCell align="left">Full Name</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell align="left">{user.username}</TableCell>
            <TableCell align="left">{user.name}</TableCell>
            <TableCell align="left">{user.email}</TableCell>
            <TableCell align="left">{this.getActions(user)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  fetchAll = async () => {
    await Promise.all([this.fetchUsers(), this.fetchTags()]);
  };

  async componentDidMount() {
    await this.fetchAll();
  }

  render() {
    const { classes } = this.props;
    const { fetchedUsers, users, fetchedTags, tags, newTag } = this.state;
    if (fetchedUsers && fetchedTags) {
      return (
        <div className={classes.container}>
          <div className={classes.root}>
            <Title>Admin Console</Title>
            <div className={classes.block}>
              <Subtitle>Profile Manager</Subtitle>
              {this.makeUserTable(users)}
            </div>
            <div className={classes.block}>
              <Subtitle>Add Post Tag Options</Subtitle>
              <FormFunc onSubmit={this.addTag}>
                <TextField
                  label="New tag"
                  value={newTag}
                  onChange={this.handleChange('newTag')}
                  margin="normal"
                  variant="outlined"
                  helperText={
                    newTag !== '' && tags.includes(newTag.toLowerCase())
                      ? 'This tag already exists.'
                      : ''
                  }
                  error={newTag !== '' && tags.includes(newTag.toLowerCase())}
                />
              </FormFunc>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);
