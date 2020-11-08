import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import API from '../API';
import Loading from '../components/Loading';
import AddIcon from '@material-ui/icons/Add';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { formatDate } from '../utils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { xorBy } from 'lodash';

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
  const [addState, setAddState] = useState(false);
  const [teachersToAdd, setTeachersToAdd] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

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

  const addStateHandler = async () => {
    try {
      const data = await API.fetch('teachers/');
      setTeachersToAdd(xorBy(subject.teachers, data, 'username'));
      setAddState(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = e => {
    setSelectedTeacher(e.target.value);
  };

  const addTeacherHandler = async () => {
    try {
      await API.subjects.addTeacher(subjectId, selectedTeacher);
      setAddState(false);
      setSubject(prevState => {
        return {
          ...prevState,
          teachers: [
            ...prevState.teachers,
            teachersToAdd.find(x => x.username === selectedTeacher),
          ],
        };
      });
      setSelectedTeacher('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {subject ? (
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={9}>
                <Typography variant="h5">
                  {subject.name} - {subject.course.name}
                </Typography>
                <Typography variant="subtitle1">
                  {subject.teachers
                    .map(x => `${x.first_name} ${x.last_name}`)
                    .join(', ')}
                  {addState ? (
                    <div>
                      <Select
                        value={selectedTeacher}
                        onChange={handleChange}
                        autoWidth
                      >
                        {teachersToAdd.map(x => (
                          <MenuItem key={x.username} value={x.username}>
                            {x.first_name} {x.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <IconButton onClick={addTeacherHandler}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton onClick={() => setAddState(false)}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <IconButton
                      onClick={addStateHandler}
                      edge="end"
                      aria-label="add"
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
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
                <ListItemText style={{ textTransform: 'capitalize' }}>
                  {formatDate(Date.parse(x.start_date))}
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
