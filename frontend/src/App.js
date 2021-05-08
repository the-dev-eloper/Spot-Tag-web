import React from 'react'
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
              <div key={language._id} className="card">

                <a href={`/language/${language.name}`}>
                  <img class="medium" src={language.image} alt="language" />
                </a>

                <div class="card-body">
                  <a href={`/language/${language.name}`}>
                    <h2>{language.name}</h2>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer class="row center">All right reserved</footer>
    </div>
  );
}

export default App;
