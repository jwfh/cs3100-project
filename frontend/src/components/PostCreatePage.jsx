import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Title } from './PageTitle';
import QuestionFormContent from './QuestionFormContent';
import QuestionFormTag from './QuestionFormTag';
import QuestionFormConfirm from './QuestionFormConfirm';
import axios from 'axios';
import { backend, debug } from '../settings';

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
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

export class PostCreatePage extends Component {
  state = {
    activeStep: 0,
    title: '',
    content: '',
    tags: [],
    fetchedTags: false,
    availableTags: [],
    contentSyntaxErrorMsg: '',
    showValid: [false, false, false],
    isValid: [
      {
        titleNotEmpty: false,
        contentNotEmpty: false,
        contentSyntaxErrorFree: true,
      },
      {
        hasTags: false,
      },
    ],
    postSuccessful: false,
    postRoute: '',
  };

  // Advance to the next form step
  nextStep = () => {
    const { activeStep, showValid } = this.state;
    showValid[activeStep] = true;
    this.setState({
      showValid,
    });
    let stepIsValid = this.isValid(activeStep);
    if (stepIsValid) {
      this.setState({
        activeStep: activeStep + 1,
      });
    }
  };

  // Return to the previous form step
  prevStep = () => {
    const { activeStep } = this.state;
    if (activeStep > 0) {
      this.setState({
        activeStep: activeStep - 1,
      });
    }
  };

  validate = (step) => {
    const { content, title, tags, isValid } = this.state;
    switch (step) {
      case 0:
        // Content
        isValid[0].contentNotEmpty = content !== '';
        isValid[0].titleNotEmpty = title !== '';
        isValid[0].contentSyntaxErrorFree = this.isContentSyntaxErrorFree();
        break;
      case 1:
        // Tags
        isValid[1].hasTags = tags.length > 0;
        break;
      default:
        break;
    }
    this.setState({
      isValid,
    });
  };

  isContentSyntaxErrorFree = () => {
    const { content } = this.state;
    let inlineMathValid =
      (content.match(/\\\(/g) || []).length ===
      (content.match(/\\\)/g) || []).length;
    if (!inlineMathValid) {
      this.setState({
        contentSyntaxErrorMsg: 'Unbalanced inline math',
      });
      return false;
    }
    let displayMathValid =
      (content.match(/\\\[/g) || []).length ===
      (content.match(/\\\]/g) || []).length;
    if (!displayMathValid) {
      this.setState({
        contentSyntaxErrorMsg: 'Unbalanced display math',
      });
      return false;
    }
    this.setState({
      contentSyntaxErrorMsg: '',
    });
    return true;
  };

  isValid = (step) => {
    this.validate(step);
    const { isValid } = this.state;
    for (let val in isValid[step]) {
      if (!isValid[step][val]) {
        return false;
      }
    }
    return true;
  };

  handleChangeText = (input) => (e) => {
    const { activeStep } = this.state;
    this.setState(
      {
        [input]: e.target.value,
      },
      () => {
        this.validate(activeStep);
      },
    );
  };

  handleChangeTags = (name) => (value) => {
    const { activeStep } = this.state;
    this.setState({
      [name]: value,
    });
    this.validate(activeStep);
  };

  getSteps = () => {
    const {
      title,
      content,
      tags,
      availableTags,
      showValid,
      isValid,
      contentSyntaxErrorMsg,
    } = this.state;
    const values = {
      title,
      content,
      tags,
      showValid,
      isValid,
      contentSyntaxErrorMsg,
    };

    const steps = [
      {
        label: 'Create Your Problem',
        content: (
          <QuestionFormContent
            handleChange={this.handleChangeText}
            values={values}
          />
        ),
      },
      {
        label: 'Tag Your Problem',
        content: (
          <QuestionFormTag
            availableTags={availableTags}
            handleChange={this.handleChangeTags}
            values={values}
          />
        ),
      },
      {
        label: 'Publish Your Problem',
        content: (
          <QuestionFormConfirm
            handleChange={this.handleChangeText}
            values={values}
          />
        ),
      },
    ];

    return steps;
  };

  fetchTags = async () => {
    const { fetchedTags } = this.state;
    if (!fetchedTags) {
      const uri = '//' + backend + '/api/fetch/all';
      const reqData = {
        type: 'tag',
      };
      const config = {
        timeout: 2000,
      };
      try {
        const users = await axios.post(uri, reqData, config);
        const { data } = await users;
        this.setState(
          {
            availableTags: data,
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
    }
  };

  submit = () => {
    const { title, content, tags, activeStep } = this.state;
    const { levelIdx, uid, numHubSessionKey } = this.props;
    const uri = '//' + backend + '/api/create';
    const data = {
      type: 'question',
      value: {
        title,
        content,
        tags,
        level: levelIdx,
        sessionKey: numHubSessionKey,
      },
    };
    const config = {
      timeout: 2000,
    };
    let pageIsValid = true;
    // TODO loop through this.state.isValid instead of 3 constant
    for (let i = 0; i < 3 && pageIsValid; i++) {
      if (!this.isValid(i)) {
        pageIsValid = false;
        this.setState({
          activeStep: i,
        });
      }
    }
    if (pageIsValid) {
      axios
        .post(uri, data, config)
        .then((response) => {
          if (response.status === 200 && response.data.route) {
            console.log(response.data);
            this.setState({
              postSuccessful: true,
              postRoute: response.data.route,
              activeStep: activeStep + 1,
            });
          } else {
            console.log(response.status, 'Unable to post new question');
          }
        })
        .catch((error) => {
          console.log('Unable to post new question:', error);
        });
    }
  };

  async componentDidMount() {
    if (!this.props.authenticated) {
      this.props.enqueueSnackbar('You need to sign in to post a question.');
      this.props.history.push('/login');
    }
    await this.fetchTags();
  }

  render() {
    const { classes, levelName } = this.props;
    const { activeStep, postSuccessful, postRoute, fetchedTags } = this.state;

    const steps = this.getSteps();
    if (fetchedTags) {
      return (
        <div className={classes.container}>
          <div className={classes.root}>
            <Title>Post an Exercise to NumHub {levelName}</Title>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    {step.content}
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={index === 0}
                          onClick={this.prevStep}
                          className={classNames(
                            classes.button,
                            index === 0 && classes.hidden,
                          )}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={
                            index === steps.length - 1
                              ? this.submit
                              : this.nextStep
                          }
                          className={classes.button}
                        >
                          {index === steps.length - 1 ? 'Publish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  {postSuccessful
                    ? 'Your question has been published!'
                    : 'There was an error submitting your post. Please try again later.'}
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Go to homepage
                </Button>
                {postSuccessful ? (
                  <Button
                    onClick={this.props.history.push(postRoute)}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                  >
                    View question
                  </Button>
                ) : (
                  ''
                )}
              </Paper>
            )}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

PostCreatePage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  levelIdx: PropTypes.number.isRequired,
  levelName: PropTypes.string.isRequired,
};

export default withStyles(styles)(PostCreatePage);
