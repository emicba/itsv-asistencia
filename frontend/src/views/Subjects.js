import React, { useContext, useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import Loading from '../components/Loading';
import API from '../API';
import SubjectItem from '../components/SubjectItem';
import { UserContext } from '../UserContext';

const Subjects = () => {
  const [subjects, setSubjects] = useState(null);
  const [groupedSubjects, setGroupedSubjects] = useState(null);
  const { user } = useContext(UserContext);
  const canEditItems = user.role === 'admin';

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!subjects) return;
    setGroupedSubjects(
      [...subjects].reduce((acc, el) => {
        (acc[el.course.name] = acc[el.course.name] || []).push({ ...el });
        return acc;
      }, {}),
    );
  }, [subjects]);

  const fetchSubjects = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await API.fetch('subjects');
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!groupedSubjects ? (
        <Loading />
      ) : (
        <List style={{ width: '100%' }}>
          {Object.entries(groupedSubjects).map(([k, v]) => {
            return (
              <SubjectItem
                key={k}
                courseName={k}
                subjects={v}
                canEdit={canEditItems}
              />
            );
          })}
        </List>
      )}
    </div>
  );
};

export default Subjects;
