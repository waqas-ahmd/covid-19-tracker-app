import React  from 'react';
import './App.css';
import CountriesTable from './components/CountriesTable';
import GlobalData from './components/GlobalData';
import Chartjs from './components/Chartjs';


function SubApp() {
    const [page, setPage] = React.useState(true)

  return (
    <div>
        <button className="switchBtn" onClick = {() => setPage(prevMode=> !prevMode) }>{page? "See Countries Data" : "See Global Data"}</button>
        {!page? <CountriesTable/> : <div/>}
        {page? <GlobalData/> : <div/>}
        {page? <Chartjs/> : <div/>}
    </div>
  );
  
}

export default SubApp;
