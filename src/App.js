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
        Developed by <a href="https://www.facebook.com/waqqasahmad.official">WAQAS</a>
      </GlobalProvider>
    </div>
  );
  
}

export default App;
