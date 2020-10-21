import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: props => props.background,
  },
  text: {
    color: '#fff',
  },
  description: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default function CardItem(props) {
  const classes = useStyles(props);

  const { title, description, icon: Icon } = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.text}>
          <Icon /> {title}
        </Typography>
        <Typography variant="h4" className={classes.description}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
