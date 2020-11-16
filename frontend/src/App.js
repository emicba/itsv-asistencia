import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersistentDrawerLeft from './components/Drawer';
import Home from './views/Home';
import Login from './views/Login';
import Courses from './views/Courses';
import Course from './views/Course';
import Subjects from './views/Subjects';
import Attendance from './views/Attendance';
import Container from '@material-ui/core/Container';
import { UserContext } from './UserContext';
import Subject from './views/Subject';
import Meet from './views/Meet';
import Student from './views/Student';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: <Home />,
  },
  {
    name: 'Courses',
    path: '/courses',
    exact: true,
    component: <Courses />,
  },
  {
    name: 'Course',
    path: '/course/:id',
    exact: true,
    component: <Course />,
  },
  {
    name: 'Attendance',
    path: '/attendance/:id',
    exact: true,
    component: <Attendance />,
  },
  {
    name: 'Subjects',
    path: '/subjects',
    exact: true,
    component: <Subjects />,
  },
  {
    name: 'Subject',
    path: '/subject/:id',
    exact: true,
    component: <Subject />,
  },
  {
    name: 'Meet',
    path: '/meet/:id/:start_date',
    exact: true,
    component: <Meet />,
  },
  {
    name: 'Student',
    path: '/student/:id',
    exact: true,
    component: <Student />,
  },
];

function App() {
  const [user] = useContext(UserContext);

  return (
    <div>
      {!!user ? (
        <Router>
          <PersistentDrawerLeft
            routes={routes.filter(x =>
              ['Home', 'Courses', 'Subjects'].includes(x.name),
            )}
          />
          <Container style={{ marginTop: '1rem' }}>
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  render={() => route.component}
                />
              ))}
            </Switch>
          </Container>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
