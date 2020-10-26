import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersistentDrawerLeft from './components/Drawer';
import Home from './views/Home';
import Login from './views/Login';
import Courses from './views/Courses';
import Course from './views/Course';
import Subjects from './views/Subjects';
import Attendance from './views/Attendance';
import Container from '@material-ui/core/Container';
import { UserProvider } from './UserContext';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: <Home />,
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: <Login />,
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
];

function App() {
  return (
    <UserProvider>
      <Router>
        <PersistentDrawerLeft
          routes={routes.filter(
            x => !['Login', 'Course', 'Student', 'Attendance'].includes(x.name),
          )}
        />
        <Container style={{ marginTop: '5rem' }}>
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
    </UserProvider>
  );
}

export default App;
