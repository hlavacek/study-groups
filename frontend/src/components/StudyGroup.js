import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';


const styles = theme => ({
  studyGroup: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

const StudyGroup = ({ classes, studyGroup }) => {

  return (<Paper className={classes.studyGroup}>
    <header className={classes.header}>
      <Typography variant="body1" className={classes.grow}>{studyGroup.location}</Typography>
      <Typography variant="caption" className={classes.datetime}>{studyGroup.datetime}</Typography>
    </header>
    {studyGroup.students && studyGroup.students.length ?
      studyGroup.students.map(student => <Chip label={student} key={student} className={classes.chip} />)
      : null}
  </Paper>);
}

export default withStyles(styles)(StudyGroup);