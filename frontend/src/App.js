import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import LanguageScreen from './screens/LanguageScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import BugListScreen from './screens/BugListScreen';
import AdminRoute from './components/AdminRoute';
import LanguageListScreen from './screens/LanguageListScreen';
import LanguageEditScreen from './screens/LanguageEditScreen';
import BugEditScreen from './screens/BugEditScreen';
import BugScreen from './screens/BugScreen';
import AllBugsScreen from './screens/AllBugsScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SignupScreen from './screens/SignupScreen';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div class="grid-container">

<header class="row">
  <div>
    <Link to="/" className="brand">Spot Tag</Link>
  </div>

  <div>
    {userInfo ? (
      <div className="dropdown">
        <Link to="#">
          {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
        </Link>
        <ul className="dropdown-content">
          <li>
            <Link to="/profile">User Profile</Link>
          </li>
          <li>
            <Link to="#signout" onClick={signoutHandler}>
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      <Link to="/signin">Sign In</Link>
    )}

    {userInfo && userInfo.isAdmin && (
      <div className="dropdown">
        <Link to="#admin">
          Admin <i className="fa fa-caret-down"></i>
        </Link>
        <ul className="dropdown-content">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/languagelist">Languages</Link>
          </li>
          <li>
            <Link to="/buglist">Bugs</Link>
          </li>
          <li>
            <Link to="/userlist">Users</Link>
          </li>
        </ul>
      </div>
    )}
  </div>
</header>

<main>

  <Route path="/signin" component={LoginScreen}></Route>
  <Route path="/register" component={SignupScreen}></Route>
  <Route path="/language/:id" component={LanguageScreen} exact></Route>
  <Route path="/language/:id/edit" component={LanguageEditScreen} exact></Route>
  <Route path="/bug/:id" component={BugScreen} exact></Route>
  <Route path="/bug/:id/edit" component={BugEditScreen} exact></Route>
  <Route path="/user/:id/edit" component={UserEditScreen} exact></Route>
  <Route path="/bugs" component={AllBugsScreen} exact></Route>

  <PrivateRoute
    path="/profile"
    component={ProfileScreen}
  ></PrivateRoute>

  <AdminRoute
    path="/languagelist"
    component={LanguageListScreen}
  ></AdminRoute>

  <AdminRoute
    path="/buglist"
    component={BugListScreen}
  ></AdminRoute>

  <AdminRoute
    path="/userlist"
    component={UserListScreen}
  ></AdminRoute>

  <Route path="/" component={HomeScreen} exact></Route>
</main>

{/* <footer class="row center">All right reserved</footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
