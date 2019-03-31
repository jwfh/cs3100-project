import React, { Component, Fragment } from 'react';
import { Title } from './PageTitle';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = (theme) => ({
  filter: {
    width: '20%',
  },
  posts: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  },
});

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      questions: [],
    };
  }

  fetchPosts = async () => {
    return [];
  };

  fetchTags = async () => {
    return [];
  };

  createPostPreviews = (post) => (
    <PostPreview
      key={post.id}
      title={post.title}
      bodyPreview={
        post.body.length < 150 ? post.body : post.body.substring(0, 150) + '...'
      }
      link={post.link}
    />
  );

  fetchAll = async () => {
    await Promise.all([this.fetchPosts(), this.fetchTags()]);
  };

  async componentDidMount() {
    await this.fetchAll();
  }

  render() {
    const { classes } = this.props;
    const { questions, tags } = this.state;
    let previewsToRender = questions.map((question) =>
      this.createPostPreview(question),
    );
    return (
      <Fragment>
        <div className={classes.posts}>{previewsToRender}</div>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
