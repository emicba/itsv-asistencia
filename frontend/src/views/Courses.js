import React, { useState, useEffect } from 'react';
import API from '../API';
import {
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);

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
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default CourseTable;
