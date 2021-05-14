import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LanguageScreen from './screens/LanguageScreen';

function App() {
  return (
    <BrowserRouter>

      <div class="grid-container">

        <header class="row">
          <div>
            <a class="brand" href="/">Spot Tag</a>
          </div>

          <div>
            <a href="/signin">Sign In</a>
          </div>
        </header>

        <main>
          <Route path="/language/:id" component={LanguageScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer class="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
