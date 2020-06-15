import React, {useContext, useEffect} from 'react';
import axios from 'axios'
import styles from'./CountriesTable.module.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GlobalContext } from '../context/api';
//import cx from 'classnames';

var ord = true;


const columns = [
    { id: 'country', label: 'Country'},
    {
      id: 'population',
      label: 'Population',
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'totalCases',
      label: 'Total Cases',
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'newCases',
      label: 'New Cases',
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'totalDeaths',
      label: 'Total Deaths',
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'newDeaths',
      label: 'New Deaths',
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

function CountriesTable(){
  const { data, addData, sortData, sortDataRev } = useContext(GlobalContext);
  function sortOrder(id){
    if(ord){
      sortData(id);
    }else{
      sortDataRev(id);
    }
    ord= !ord;
  }
  
  useEffect(() => {
    const fetchStats = async () => {
      const abc  = await axios.get("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "c3ffeba565msha05d091de763f1bp1d8c3fjsnbd93b9f4b9b0"
        }
      });
      var arrayTemp=[];
      for(var i=0;i<abc.data.response.length;i++){
        arrayTemp.push({
          id: i,
          country: abc.data.response[i].country,
          totalCases: abc.data.response[i].cases.total,
          newCases: abc.data.response[i].cases.new,
          totalDeaths: abc.data.response[i].deaths.total,
          newDeaths: abc.data.response[i].deaths.new,
          population: abc.data.response[i].population
        })
      }
      const exclude =   [26,101, 149, 189, 204, 216, 217, 218, 219, 220, 221];
      arrayTemp = arrayTemp.filter(item => !exclude.includes(item.id))
      
      addData(arrayTemp);
      sortDataRev('totalCases')
    };
    fetchStats();
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
    
  if(!data){
    return(<div>Loading Data...</div>)
  }
  return (
    <Paper className={styles.root}>
      <TableContainer className={styles.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, padding:'3pt'}}
                >
                  {column.label}
                  {" "}<button className={styles.sortButton} onClick={() => sortOrder(column.id)}>⇅</button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice().map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={styles.cells} title={column.id} key = {column.id + row.id} align={column.align} style={{padding:4 }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        {value === null ? "N/A" : ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CountriesTable;