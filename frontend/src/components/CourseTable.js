import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Course() {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/courses/${courseId}`);
      const data = await response.json();

      setCourse(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '4.5rem' }}>
      <pre>{JSON.stringify(course, 2, null)}</pre>
    </div>
  );
}
