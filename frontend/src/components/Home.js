import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 8,
    marginTop: '6rem',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    maxHeight: 400,
  },
  card: { minWidth: 275 },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Card
            background="#e57373"
            title="Total Students"
            description="--"
            icon={AccessibilityNewOutlinedIcon}
          />
        </Grid>
        <Grid item xs={3}>
          <Card
            background="#81c784"
            title="Total Courses"
            description="--"
            icon={ClassOutlinedIcon}
          />
        </Grid>
        <Grid item xs={3}>
          <Card
            background="#64b5f6"
            title="Total Subjects"
            description="--"
            icon={SubjectOutlinedIcon}
          />
        </Grid>
        <Grid item xs={3}>
          <Card
            background="#4791db"
            title="Today attendance"
            description="--"
            icon={CreateOutlinedIcon}
          />
        </Grid>
      </Grid>
    </div>
  );
}
