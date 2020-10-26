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
import { useHistory } from 'react-router-dom';

export default function SubjectItem({ courseName, subjects }) {
  const [checked, setChecked] = React.useState(false);
  const history = useHistory();

  const handleListItemClick = () => {
    setChecked(prev => !prev);
  };

  const handleSubjectClick = id => {
    history.push(`/attendance/${id}`);
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
      </ListItem>
      <Fade in={checked}>
        <List style={{ marginLeft: '7rem' }}>
          {!!subjects &&
            subjects.map(subject => (
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
