import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';

const Attendance = () => {
  const { id: subjectId } = useParams();
  const [subject, setSubject] = useState();

  useEffect(() => {
    fetchCourse(subjectId);
  }, [subjectId]);

  const fetchCourse = async id => {
    try {
      const data = await API.fetch(`subjects/${id}`);
      setSubject(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <pre>{JSON.stringify(subject, null, 2)}</pre>;
};

export default Attendance;
