import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import LanguageScreen from './screens/LanguageScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

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
          </div>
        </header>

        <main>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/language/:id" component={LanguageScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer class="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
