import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import API from '../API';
import Loading from '../components/Loading';
import AddIcon from '@material-ui/icons/Add';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    padding: '1rem',
  },
}));

const Subject = () => {
  const { id: subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetchData(subjectId);
  }, [subjectId]);

  const fetchData = async id => {
    try {
      const data = await API.fetch(`subjects/${id}`);
      setSubject(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clickMeetHandler = start_date => {
    history.push(`/meet/${subjectId}/${start_date}`);
  };

  return (
    <div className={classes.container}>
      {subject ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={8}>
                <Typography variant="h5">
                  {subject.name} - {subject.course.name}
                </Typography>
                <Typography variant="subtitle1">
                  {subject.teachers
                    .map(x => `${x.first_name} ${x.last_name}`)
                    .join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: 'flex' }}>
                <Link to={`/attendance/${subjectId}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '2rem', float: 'right' }}
                    startIcon={<AddIcon />}
                  >
                    Take Attendance
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Previous meets
              </ListSubheader>
            }
          >
            {subject.meets.map(x => (
              <ListItem
                key={x.start_date}
                button
                onClick={() => clickMeetHandler(x.start_date)}
              >
                <ListItemIcon>
                  <EventNoteIcon />
                </ListItemIcon>
                <ListItemText>
                  {format(Date.parse(x.start_date), 'MMMM dd, yyyy HH:mm')}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Subject;
