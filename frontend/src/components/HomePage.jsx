import React, { Component } from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  filter: {
    width: '20%',
  },
  posts: {
    float: 'right',
    width: '75%',
  },
});

export class HomePage extends Component {

  fetchPosts = () => {
    return [
      {
        title: 'Some Post 1',
        body: 'Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body',
        link: '/questions/abcd',
        id: 1,
      },
      {
        title: 'Some Post 2',
        body: 'Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body',
        link: '/questions/abcd',
        id: 2,
      },
      {
        title: 'Some Post 2',
        body: 'Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body',
        link: '/questions/abcd',
        id: 3
      },
      {
        title: 'Some Post 2',
        body: 'Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body',
        link: '/questions/abcd',
        id: 4,
      },
      {
        title: 'Some Post 3',
        body: 'Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body Some body',
        link: '/questions/abcd',
        id: 5,
      },
    ]
  }

  createPostPreviews = (posts) => {
    let previews = posts.map((post, index) => {
      let shortPost = post.body.length < 150 ? post.body : post.body.substring(0, 150) + '...';
      return (
        <PostPreview
          key={post.id}
          title={post.title}
          bodyPreview={shortPost}
          link={post.link}
        />
      );
    });
    return previews;
  };

  render() {
    const { classes } = this.props;
    let posts = this.fetchPosts();
    let previewsToRender = this.createPostPreviews(posts);
    return (
      <div className={classes.posts}>
        {previewsToRender}
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);