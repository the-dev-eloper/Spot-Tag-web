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

import { Menu } from "antd";

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const { SubMenu } = Menu;
  const current = "mail";

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>

      <nav className="st--navbar">

        <div className="st__navbar--title">
          <Link to="/" className="brand">Spot-Tag</Link>
        </div>

        <div className="st__navbar--options">
          {userInfo && userInfo.isAdmin && (

            <Menu
              selectedKeys={[current]}
              mode="horizontal"
              style={{ marginRight: '10', backgroundColor: 'transparent', color: '#FFFFFF' }}
            >
              <SubMenu
                key="SubMenu_1"
                title="Admin"
                theme='dark'
              >
                <Menu.Item key="languages">Languages</Menu.Item>
                <Menu.Item key="bugs">Bugs</Menu.Item>
                <Menu.Item key="users">Users</Menu.Item>
              </SubMenu>
            </Menu>
          )}

          {userInfo ? (

            <Menu
              selectedKeys={[current]}
              mode="horizontal"
              style={{ backgroundColor: 'transparent', color: '#FFFFFF' }}
            >
              <SubMenu
                key="SubMenu_2"
                title={userInfo.name}
                theme='dark'
              >
                <Menu.Item key="setting:1">User Profile</Menu.Item>
                <Menu.Item key="setting:2">Sign Out</Menu.Item>
              </SubMenu>
            </Menu>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </nav>

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
    </BrowserRouter>
  );
}

export default App;
