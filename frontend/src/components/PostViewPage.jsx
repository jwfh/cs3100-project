import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Link, Chip } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PostDisplay from './PostDisplay';
import { backend, debug } from '../settings';
import axios from 'axios';

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

export class PostViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      question: {},
    };
  }

  fetchPost = async () => {
    const { match } = this.props;
    const uri = `//${backend}/api/fetch`;
    const requestData = {
      type: 'question',
      value: {
        idHash: match.params.idHash,
      },
    };
    const config = {
      timeout: 2000,
    };
    try {
      const users = await axios.post(uri, requestData, config);
      const { data } = await users;
      this.setState(
        {
          question: data.post,
          fetched: true,
        },
        () => {
          if (debug) {
            console.log('Successfully retrieved post from API');
          }
        },
      );
    } catch (error) {
      if (debug) {
        console.log('Unable to retrieve post:', error);
      }
    }
  };

  async componentDidMount() {
    await this.fetchPost();
  }

  render() {
    const { classes, match } = this.props;
    const { question, fetched } = this.state;
    if (typeof match.params.idHash === 'undefined' || !fetched || !question) {
      return (
        <div className={classes.emptyText}>
          <Typography variant="h5">
            We can't find that question. That's a 404.
          </Typography>
          <Typography>
            Try searching for a question or browsing the{' '}
            <Link component={RouterLink} to="/">
              home page
            </Link>
            .
          </Typography>
        </div>
      );
    } else {
      return (
        <Fragment>
          <PostDisplay title={question.title} content={question.content} />
          {question.tags.map((tag) => {
            return (
              <Chip
                key={tag.label}
                variant="outlined"
                label={tag.label}
                className={classes.chip}
              />
            );
          })}
        </Fragment>
      );
    }
  }
}

PostViewPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostViewPage);
