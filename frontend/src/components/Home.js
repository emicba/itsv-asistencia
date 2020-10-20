import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
          <Paper className={classes.paper} style={{ background: '#e57373' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="h4"
                      style={{ color: 'white' }}
                    >
                      67
                    </Typography>
                  </Grid>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <AccessibilityNewOutlinedIcon
                        style={{ size: 'small', color: 'white' }}
                      ></AccessibilityNewOutlinedIcon>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" style={{ color: 'white' }}>
                        Total Students
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{ background: '#81c784' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="h4"
                      style={{ color: 'white' }}
                    >
                      5
                    </Typography>
                  </Grid>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <ClassOutlinedIcon
                        style={{ size: 'small', color: 'white' }}
                      ></ClassOutlinedIcon>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" style={{ color: 'white' }}>
                        Total Courses
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{ background: '#64b5f6' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="h4"
                      style={{ color: 'white' }}
                    >
                      3
                    </Typography>
                  </Grid>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <SubjectOutlinedIcon
                        style={{ size: 'small', color: 'white' }}
                      ></SubjectOutlinedIcon>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" style={{ color: 'white' }}>
                        Total Subjects
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{ background: '#4791db' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="h4"
                      style={{ color: 'white' }}
                    >
                      50
                    </Typography>
                  </Grid>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <CreateOutlinedIcon
                        style={{ size: 'small', color: 'white' }}
                      ></CreateOutlinedIcon>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" style={{ color: 'white' }}>
                        Today Present
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
