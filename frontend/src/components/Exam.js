import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import StudyGroup from './StudyGroup';

import { API_BASE_PATH } from '../config';

const styles = theme => ({
  card: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  inputField: {
    width: '100%',
    marginTop: 10
  }
});


const Exam = ({ classes, exam, loadExams }) => {
  const [expanded, setExpanded] = useState(false);
  const [location, setLocation] = useState('');
  const [datetime, setDatetime] = useState(''); 

  const handleExpandClick = () => setExpanded(!expanded);

  const handleAddClick = async () => {
    const studyGroup = {
      location, datetime
    };
    await fetch(`${API_BASE_PATH}/api/exams/${exam.id}/studyGroups`, {
      body: JSON.stringify(studyGroup),
      method: 'PUT',
      mode: 'cors'
    });
    setLocation('');
    setDatetime('');
    await loadExams();
  };

  return (<Card className={classes.card} data-testid={`exam-root-${exam.id}`}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" className={classes.avatar}>
          {exam.shortcut}
        </Avatar>
      }
      action={
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          }, 'button')}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
          data-testid='expand'
        >
          <ExpandMoreIcon />
        </IconButton>
      }
      title={
        <Typography variant="body2" data-testid='title'>{exam.title}</Typography>
      }
      subheader={
        <Typography variant="caption" data-testid='subheader'>{exam.datetime}</Typography>
      }
    />
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        {exam.studyGroups && exam.studyGroups.length ?
          exam.studyGroups.map(studyGroup => (
            <StudyGroup key={studyGroup.id} studyGroup={studyGroup} loadExams={loadExams}
              exam={exam} />))
          : null}
        <Grid container spacing={24}>
          <Grid item xs={5}>
            <TextField
              id="standard-name"
              placeholder="Location"
              data-testid="location"
              className={classes.inputField}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="standard-name"
              placeholder="Date / Time"
              data-testid="datetime"
              className={classes.inputField}
              value={datetime}
              onChange={(event) => setDatetime(event.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={handleAddClick}
              aria-label="Add"
              data-testid='button-add'>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Collapse>
  </Card>);
}

export default withStyles(styles)(Exam);