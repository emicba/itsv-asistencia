import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import PersistentDrawerLeft from './components/Drawer';
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
import Users from './views/Users';
import {
  Class as ClassIcon,
  Folder as FolderIcon,
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';

const routes = [
  {
    name: 'Cursos',
    path: '/courses',
    exact: true,
    component: <Courses />,
    showInDrawer: true,
    icon: <ClassIcon />,
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
    name: 'Materias',
    path: '/subjects',
    exact: true,
    component: <Subjects />,
    showInDrawer: true,
    icon: <FolderIcon />,
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
  {
    name: 'Usuarios',
    path: '/users/',
    exact: true,
    component: <Users />,
    adminRequired: true,
    icon: <AccountCircleIcon />,
  },
  {
    name: 'Inicio',
    path: '/',
    component: <Redirect to="/subjects" />,
  },
];

const getDrawerRoutes = user => {
  return routes.filter(
    x => x.showInDrawer || (x.adminRequired && user.role === 'admin'),
  );
};

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {!!user ? (
        <Router>
          <PersistentDrawerLeft routes={getDrawerRoutes(user)} />
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
