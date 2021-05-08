import { BrowserRouter, Link, Route, } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="row">
        <div>
          <Link to="/" className="brand">
            Spot - Tag
          </Link>
        </div>

        <div>
          <ul className="dropdown-content">
            <li>
              <Link to="/profile">User Profile</Link>
            </li>

            <li>
              <Link to="#signout">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/signin">Sign In</Link>
      </header>

      <main>
        {/* <Route path="/language/:id" component={LanguageScreen} /> */}
        {/* <Route path="/signin" component={SigninScreen} /> */}
        {/* <Route path="/register" component={RegisterScreen} /> */}
        {/* <Route path="/addbug" component={AddBugScreen} /> */}
        {/* <Route path="/editbug" component={EditBugScreen} /> */}
        {/* <Route path="/profile" component={ProfileScreen}></Route> */}
        <Route path="/" component={HomeScreen} exact />
    </main>

    <footer className="row center">
      All Rights Reserved
    </footer>
   </BrowserRouter>
  );
}

export default App;
