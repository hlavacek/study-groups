import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { API_BASE_PATH } from './config';

import Exam from './components/Exam';

const styles = theme => ({
  root: {
    display: 'flexGrow: 1,',
  },
  grow: {
    flexGrow: 1,
  },
  mainIcon: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    marginLeft: 10,
    marginRight: 10
  },
  appbar: {
    marginBottom: 20
  }

});


function App({ classes }) {
  const [exams, setExams] = useState([]);

  const loadExams = async () => {
    const response = await fetch(`${API_BASE_PATH}/api/exams`);
    const exams = await response.json();
    setExams(exams);
  }

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Icon className={classes.mainIcon} >group</Icon>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Study Groups
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container spacing={24}>
          {exams.map(exam =>
            <Grid item xs={12} sm={12} md={6} key={exam.title}>
              <Exam exam={exam} loadExams={loadExams}/>
            </Grid>)}
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
