import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { API_BASE_PATH } from '../config';

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
  inputField: {
    marginTop: 10
  }
});

const StudyGroup = ({ classes, exam, studyGroup, loadExams }) => {
  const [name, setName] = useState('');

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
     // Do code here
      event.preventDefault();

      await fetch(`${API_BASE_PATH}/api/exams/${exam.id}/studyGroups/${studyGroup.id}/students`, {
        body: JSON.stringify({name}),
        method: 'PUT',
        mode: 'cors'
      });

      await loadExams();
      setName('');
    }
  }

  return (<Paper className={classes.studyGroup} data-testid={`studyGroup-${studyGroup.id}`}>
    <header className={classes.header}>
      <Typography variant="body1" data-testid='location' className={classes.grow}>{studyGroup.location}</Typography>
      <Typography variant="caption" className={classes.datetime} data-testid='datetime'>{studyGroup.datetime}</Typography>
    </header>
    {studyGroup.students && studyGroup.students.length ?
      studyGroup.students.map((student, idx) => <Chip label={student} key={idx} data-testid='student' className={classes.chip} />)
      : null}
    <TextField
      placeholder="Student Name"
      className={classes.inputField}
      value={name}
      onChange={(event) => setName(event.target.value)}
      onKeyDown={handleKeyPress}
    />
  </Paper>);
}

export default withStyles(styles)(StudyGroup);