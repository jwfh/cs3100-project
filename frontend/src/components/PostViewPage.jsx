import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Link, Chip } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PostDisplay, { AnswerDisplay } from './PostDisplay';
import TextField from '@material-ui/core/TextField';
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
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        content: '',
        isValid: {
          contentSyntaxErrorFree: true,
          contentNotEmpty: false,
        },
        showValid: false,
        contentSyntaxErrorMsg: '',
      },
    };
  }
  isContentSyntaxErrorFree = () => {
    const { values } = this.state;
    let inlineMathValid =
      (values.content.match(/\\\(/g) || []).length ===
      (values.content.match(/\\\)/g) || []).length;
    if (!inlineMathValid) {
      values.contentSyntaxErrorMsg = 'Unbalanced inline math';
      this.setState({
        values,
      });
      return false;
    }
    let displayMathValid =
      (values.content.match(/\\\[/g) || []).length ===
      (values.content.match(/\\\]/g) || []).length;
    if (!displayMathValid) {
      values.contentSyntaxErrorMsg = 'Unbalanced display math';
      this.setState({
        values,
      });
      return false;
    }
    values.contentSyntaxErrorMsg = '';
    this.setState({
      values,
    });
    return true;
  };

  handleChangeText = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  attemptPost = () => {
    const { values } = this.state;
    const { content } = values;
  };

  render() {
    const { values } = this.state;
    return (
      <TextField
        label="Answer Content"
        placeholder="Enter Your Answer"
        helperText={
          values.isValid.contentSyntaxErrorFree
            ? 'You can use Markdown and LaTeX to style your answer.'
            : values.contentSyntaxErrorMsg
        }
        multiline
        fullWidth
        rows="8"
        value={values.content}
        onChange={this.handleChange('content')}
        margin="normal"
        variant="outlined"
        error={
          (values.showValid && !values.isValid.contentNotEmpty) ||
          !values.isValid.contentSyntaxErrorFree
        }
      />
    );
  }
}

export class PostViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedQ: false,
      question: {},
      fetchedA: false,
      answers: [],
    };
  }

  fetchPost = async () => {
    const { match } = this.props;
    const uri = backend ? `//${backend}/api/fetch` : '/api/fetch';
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
          fetchedQ: true,
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

  // fetchAnswers = async () => {
  //   const { match, numHubSessionKey } = this.props;
  //   const idHash = match.params.idHash;
  //   const uri = backend ? `//${backend}/api/fetch/all` : '/api/fetch/all';
  //   const requestData = {
  //     type: 'answer',
  //     value: {
  //       idHash,
  //       numHubSessionKey,
  //     },
  //   };
  //   const config = {
  //     timeout: 2000,
  //     crossOrigin: true,
  //     withCredentials: true,
  //   };
  //   try {
  //     const response = await axios.post(uri, requestData, config);
  //     const { data } = await response;
  //     this.setState(
  //       {
  //         fetchedA: true,
  //         answers: data.answers,
  //       },
  //       () => {
  //         if (debug) {
  //           console.log('Successfully retrieved answers from API');
  //         }
  //       },
  //     );
  //   } catch (error) {
  //     if (debug) {
  //       console.log('Unable to retrieve post:', error);
  //     }
  //   }
  // };

  // renderAnswers = () => {
  //   const { authenticated } = this.props;
  //   const { fetchedA, answers } = this.state;
  //   if (authenticated && fetchedA) {
  //     return answers
  //       .sort((a, b) => {
  //         if (a.id < b.id) return -1;
  //         else if (a.id > b.id) return 1;
  //         else return 0;
  //       })
  //       .map((answer, index) => (
  //         <AnswerDisplay
  //           title={'Answer #' + (index + 1)}
  //           content={answer.content}
  //         />
  //       ));
  //   }
  // };

  async componentDidMount() {
    await this.fetchPost();
    // if (this.props.authenticated) {
    //   await this.fetchAnswers();
    // }
  }

  render() {
    const { classes, match, authenticated } = this.props;
    const { question, fetchedQ } = this.state;
    if (typeof match.params.idHash === 'undefined' || !fetchedQ || !question) {
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
        <div className={classes.container}>
          <div className={classes.root}>
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
            {/* {authenticated ? <AnswerForm qIDHash={match.params.idHash} /> : ''}
            {this.renderAnswers()} */}
          </div>
        </div>
      );
    }
  }
}

PostViewPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostViewPage);
