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
import Typography from '@material-ui/core/Typography';

import StudyGroup from './StudyGroup';

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
});


const Exam = ({ classes, exam }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (<Card className={classes.card}>
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
        >
          <ExpandMoreIcon />
        </IconButton>
      }
      title={exam.title}
      subheader={exam.datetime}
    />
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        {exam.studyGroups && exam.studyGroups.length ?
          exam.studyGroups.map(studyGroup => (
            <StudyGroup key={studyGroup.id} studyGroup={studyGroup}/>))
          : null}
      </CardContent>
    </Collapse>
  </Card>);
}

export default withStyles(styles)(Exam);