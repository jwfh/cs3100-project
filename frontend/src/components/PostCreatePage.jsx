import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
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
  };

  // Advance to the next form step
  nextStep = () => {
    const { activeStep } = this.state;
    console.log(this.state.tags);
    this.setState({
      activeStep: activeStep + 1,
    });
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

  // Do final validation and send form
  submit = () => {
    
  };

  handleChangeText = input => e => {
    this.setState({
      [input]: e.target.value,
    });
  };

  handleChangeTags = name => value => {
    this.setState({
      [name]: value,
    });
  };


  getSteps = () => {
    const {
      title,
      content,
      tags,
    } = this.state;
    const values = {
      title,
      content,
      tags,
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
                        onClick={this.nextStep}
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
