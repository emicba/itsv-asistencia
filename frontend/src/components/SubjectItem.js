import React from 'react';
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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import API from '../API';

export default function SubjectItem({ courseName, subjects }) {
  const [checked, setChecked] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [subjects1, setSubjects1] = React.useState(subjects);
  const [subject, setSubject] = React.useState('');
  const history = useHistory();

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
      setSubjects1(prevState => [...prevState, data]);
      setAdd(false);
      setSubject('');
    } catch (error) {
      console.error(error);
    }
  };

  return checked ? (
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
        <ListItemSecondaryAction onClick={() => setAdd(true)}>
          <IconButton edge="end" aria-label="add">
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Fade in={checked}>
        <List style={{ marginLeft: '7rem' }}>
          {!!subjects1 &&
            subjects1.map(subject => (
              <ListItem
                key={subject.id}
                button
                onClick={() => handleSubjectClick(subject.id)}
              >
                <ListItemIcon>
                  <SubjectOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={subject.name} />
              </ListItem>
            ))}
          {add && (
            <ListItem button>
              <ListItemIcon>
                <SubjectOutlinedIcon />
              </ListItemIcon>
              <TextField
                label="Subject"
                value={subject}
                onChange={event => {
                  setSubject(event.target.value);
                }}
                style={{ width: '25ch' }}
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
  );
}
