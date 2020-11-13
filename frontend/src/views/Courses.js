import React, { useState, useEffect } from 'react';
import API from '../API';
import {
  List,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState('');

  const history = useHistory();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await API.fetch('courses/');
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseClick = id => {
    history.push(`/course/${id}`);
  };

  const handleInputFileClick = e => {
    console.log(e.target.value);
    setFile(e.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <List style={{ width: '100%' }}>
        {!!courses &&
          courses.map(course => (
            <ListItem
              key={course.id}
              button
              style={{ marginLeft: '2rem' }}
              onClick={() => handleCourseClick(course.id)}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={course.name}
                style={{ marginLeft: '1rem' }}
              />
              <ListItemSecondaryAction>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={e => handleInputFileClick(e)}
                  />

                  <IconButton component="span" aria-label="add">
                    <AddIcon />
                  </IconButton>
                </label>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default CourseTable;
