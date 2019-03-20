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
import PageTitle from './PageTitle';
import PostCreateFormContent from './PostCreateFormContent';
import PostCreateFormTag from './PostCreateFormTag';
import PostCreateFormConfirm from './PostCreateFormConfirm';
import axios from 'axios';

const settings = require('../settings');

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  titleField: {
    width: '100%',
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
      }
    ],
  };

  // Advance to the next form step
  nextStep = () => {
    const { activeStep, showValid } = this.state;
    showValid[activeStep] = true;
    this.setState({
      showValid: showValid,
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
    this.setState({ isValid: isValid });
  };

  isContentSyntaxErrorFree = () => {
    const { content } = this.state;
    let inlineMathValid = (content.match(/\(/g) || []).length === (content.match(/\)/g) || []).length;
    if (!inlineMathValid) {
      this.setState({
        contentSyntaxErrorMsg: 'Unbalanced inline math',
      })
      return false;
    }
    let displayMathValid = (content.match(/\[/g) || []).length === (content.match(/\]/g) || []).length;
    if (!displayMathValid) {
      this.setState({
        contentSyntaxErrorMsg: 'Unbalanced display math',
      })
      return false;
    }
    this.setState({
      contentSyntaxErrorMsg: '',
    })
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
  }

  handleChangeText = input => e => {
    const { activeStep } = this.state;
    this.setState({
      [input]: e.target.value,
    }, () => {
      this.validate(activeStep);
    });
  };

  handleChangeTags = name => value => {
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
    const { classes } = this.props;

    const steps = [
      {
        label: 'Create Your Problem',
        content: <PostCreateFormContent 
          classes = { classes }
          handleChange = { this.handleChangeText }
          values = { values }
        />,       
      },
      {
        label: 'Tag Your Problem',
        content: <PostCreateFormTag 
          // classes = { classes }
          availableTags={availableTags}
          handleChange = { this.handleChangeTags }
          values = { values }
        />,
      },
      {
        label: 'Publish Your Problem',
        content: <PostCreateFormConfirm 
          // classes = { classes }
          handleChange = { this.handleChangeText }
          values = { values }
        />,
      }
    ]

    return steps;
  }

  retrieveTags = () => {
    const uri = '//' + settings.backend + '/api/fetch/all';
    const data = {
      type: 'tag',
    };
    axios.post(uri, data).then(
      (response) => {
        this.setState({
          availableTags: response.data,
        })
      }
    ).catch(
      (error) => {
        console.log('Unable to retrieve tags:', error);
      }
    );
  };

  submit = () => {
    console.log('Submitting');
    const { title, content, tags, steps } = this.state;
    const { level } = this.props;
    const uri = '//' + settings.backend + '/api/post/create';
    const data = {
      title: title,
      content: content,
      tags: tags,
      level: level,
    };
    let pageIsValid = true;
    for (let i = 0; i < 3 && pageIsValid; i++) {
      if (!this.isValid(i)) {
        pageIsValid = false;
        this.setState({
          activeStep: i,
        })
      }
    }
    if (pageIsValid) {

    }
  };

  componentWillMount() {
    const steps = this.getSteps();
    this.setState({
      steps: steps,
    });
  }

  componentDidMount() {
    this.retrieveTags();
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <PageTitle>
            Post an Exercise
          </PageTitle>
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
                        className={classNames(classes.button, index === 0 && classes.hidden )}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={index === steps.length - 1 ? this.submit : this.nextStep}
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
              <Typography>Your question has been published!</Typography>
              <Button 
                onClick={this.handleReset} 
                className={classes.button}
              >
                Go to homepage
              </Button>
              <Button 
                onClick={this.handleReset} 
                className={classes.button}
                color="primary"
                variant="contained"
              >
                View question
              </Button>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PostCreatePage);
