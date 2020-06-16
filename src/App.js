import React  from 'react';
import './App.css';
import SubApp from './SubApp';
import { GlobalProvider } from './context/api';

function App() {
  return (
    <div id="App" className="App">
      <GlobalProvider>
        <div>
          <h2>COVID-19 LIVE STATISTICS</h2>
        </div>
        <SubApp/>
        <p className="credits">Developed by <a className="credits" href="https://www.facebook.com/waqqasahmad.official">WAQAS</a> &#169; 2020</p>
      </GlobalProvider>
    </div>
  );
  
}

export default App;
