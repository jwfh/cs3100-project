import React, { Component } from 'react';
import { view,store} from 'react-easy-stack';
import Snackbar from '@material-ui/core/Snackbar';

const notificationStore = store({
  message: '',
  isOpen: false
})

export function notify (){

}

export default view(() => (
  <Snackbar
    message={}
    open={this.state.open}
    autoHideDuration={6000}
    onClose={this.handleClose}
  />
));
