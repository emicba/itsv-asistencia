import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';
import Home from './Home';
import Login from './Login';
import CoursesTable from './CoursesTable';
import CourseTable from './CourseTable';
import Container from '@material-ui/core/Container';

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
    component: <CoursesTable />,
  },
  {
    name: 'Course',
    path: '/course/:id',
    exact: true,
    component: <CourseTable />,
  },
];

function App() {
  return (
    <div>
      <Router>
        <PersistentDrawerLeft
          routes={routes.filter(x => !['Login', 'Course'].includes(x.name))}
        />
        <Container>
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
    </div>
  );
}

export default App;
