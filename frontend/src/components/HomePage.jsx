import React, { Component } from 'react';
import PostPreview from './PostPreview';

export class HomePage extends Component {
  render() {
    return (
      <center>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
      </center>
    )
  }
}

export default HomePage
