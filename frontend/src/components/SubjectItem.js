import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import API from '../API';
import Alert from './Alert';

export default function SubjectItem(props) {
  const { courseName, canEdit } = props;
  const [checked, setChecked] = useState(false);
  const [add, setAdd] = useState(false);
  const [subjects, setSubjects] = useState(props.subjects);
  const [subject, setSubject] = useState('');
  const history = useHistory();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [openWarning, setOpenWarning] = useState(false);

  const handleListItemClick = () => {
    setChecked(prev => !prev);
  };

  const handleSubjectClick = id => {
    history.push(`/subject/${id}`);
  };

  const handleAddClick = async () => {
    const newSubject = { name: subject, course: courseName };
    try {
      const data = await API.subjects.create(newSubject);
      setSubjects(prevState => [...prevState, data]);
      setAdd(false);
      setSubject('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubjectHandler = async id => {
    try {
      await API.subjects.delete(id);
      setSubjects(prevState => prevState.filter(x => x.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOpenWarning(true);
  }, [selectedSubject]);

  return (
    <div>
      {checked ? (
        <div>
          <ListItem
            style={{ marginLeft: '2rem' }}
            button
            onClick={() => handleListItemClick()}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={courseName} style={{ marginLeft: '1rem' }} />
            {canEdit && (
              <ListItemSecondaryAction onClick={() => setAdd(true)}>
                <IconButton edge="end" aria-label="add">
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Fade in={checked}>
            <List style={{ marginLeft: '7rem' }}>
              {!!subjects &&
                subjects.map(subject => (
                  <div key={subject.id}>
                    <ListItem
                      button
                      onClick={() => handleSubjectClick(subject.id)}
                    >
                      <ListItemIcon>
                        <SubjectOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={subject.name} />
                      {canEdit && (
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setSelectedSubject(subject);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  </div>
                ))}
              {add && (
                <ListItem button>
                  <ListItemIcon>
                    <SubjectOutlinedIcon />
                  </ListItemIcon>
                  <TextField
                    label="Materia"
                    value={subject}
                    onChange={event => {
                      setSubject(event.target.value);
                    }}
                    style={{ width: '15rem' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => handleAddClick()}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="close"
                      onClick={() => setAdd(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Fade>
        </div>
      ) : (
        <div>
          <ListItem
            style={{ marginLeft: '2rem' }}
            button
            onClick={() => handleListItemClick()}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={courseName} style={{ marginLeft: '1rem' }} />
          </ListItem>
        </div>
      )}
      {!!selectedSubject && (
        <Alert
          show={openWarning}
          handleClose={() => setOpenWarning(false)}
          message={`Estás seguro que deseas borrar ${selectedSubject.name}?`}
          agreeFunction={() => deleteSubjectHandler(selectedSubject.id)}
        />
      )}
    </div>
  );
}
