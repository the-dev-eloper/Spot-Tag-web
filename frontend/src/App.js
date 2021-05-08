import React from 'react'
import Language from './components/Language';
import data from './data'

function App() {
  return (
    <div class="grid-container">

      <header class="row">
        <div>
          <a class="brand" href="index.html">Spot Tag</a>
        </div>

        <div>
          <a href="signin.html">Sign In</a>
        </div>
      </header>

      <main>
        <div>
          <div class="row center">

            {data.languages.map((language) => (
              <Language key={language._id} language={language} />
            ))}
          </div>
        </div>
      </main>

      <footer class="row center">All right reserved</footer>
    </div>
  );
}

export default App;
