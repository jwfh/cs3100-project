import React, { Component } from 'react';
import PostPreview from './PostPreview';

export class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
        <PostPreview/>
      </React.Fragment>
    );
  }
}

export default HomePage
