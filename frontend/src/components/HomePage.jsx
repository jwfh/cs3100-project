import React, { Component } from 'react';
import { Title } from './PageTitle';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { backend, debug } from '../settings';
import { Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
  filter: {
    width: '20%',
  },
  posts: {
    margin: '5% auto',
    width: '90%',
  },
  emptyText: {
    marginTop: '10vh',
    textAlign: 'center',
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
    const uri = `//${backend}/api/fetch/all`;
    const requestData = {
      type: 'question',
    };
    const config = {
      timeout: 2000,
    };
    try {
      const users = await axios.post(uri, requestData, config);
      const { data } = await users;
      this.setState(
        {
          tags: data,
          fetchedTags: true,
        },
        () => {
          if (debug) {
            console.log('Successfully retrieved posts from API');
          }
        },
      );
    } catch (error) {
      if (debug) {
        console.log('Unable to retrieve posts:', error);
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
          tags: data,
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
    let previewsToRender =
      questions.length > 0 ? (
        questions.map((question) => this.createPostPreview(question))
      ) : (
        <div className={classes.emptyText}>
          <Typography variant="h5">The question bank is empty.</Typography>
          <Typography>
            Be the first to{' '}
            <Link component={RouterLink} to="/new">
              add a question
            </Link>
            .
          </Typography>
        </div>
      );
    return (
      <div className={classes.posts}>
        <Title>Welcome to NumHub</Title>
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
