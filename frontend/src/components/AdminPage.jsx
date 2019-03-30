import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Datagrid, TextField, EmailField } from 'react-admin';
import{
    baselinelock_open24px,
}from '@material-ui/icons';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
});
let id = 0;
function createData(...rest) {
  id += 1;
  return { id, name, username, email,secQ};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
  
export class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    renderResetIcon = (user) => {
        
    };

    fetchUsers = () => {
        let users;
        const uri = '/api/fetch/all';
        const data = {
            type: 'user',
        };
        axios
            .post(uri, data)
            .then((response) => {
                users = response.body;
                this.setState({
                    users,
                });
            })
            .catch((error) => {

            });
    }

    getUserList = () => {
        const { users } = this.state;
        this.fetchUsers();
        const rows = users.map((user, index) => (
            <TableRow key={user.id}>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{this.renderResetIcon(user)}</TableCell>
            </TableRow>
        ));
    }

    render() {
        return (
            <div>
                {this.getUserList()}
            </div>
        );
    }
}

AdminPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default AdminPage;