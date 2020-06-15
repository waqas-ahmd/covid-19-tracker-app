import React from 'react';
import axios from 'axios';
import styles from './GlobalData.module.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function GlobalData(){
    const [data,setData] = React.useState([]);
    React.useEffect(() => {
        const fetchStats = async () => {
          const {data}  = await axios.get("https://covid19.mathdro.id/api");
          //setData(abc.data.response[189]);
          setData([
            {
                name: 'Total Cases',
                data: data.confirmed.value
            },{
                name: 'Total Recoveries',
                data: data.recovered.value
            },{
                name: 'Total Deaths',
                data: data.deaths.value
            },
        ]);
        };
        fetchStats();
      },[]);
    
    if(!data){
        return(<div>Loading...</div>)
    }

    return (
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {data.map((value) => (
                <Grid key={value.name} item>
                  <Card>
                    <CardContent title={value.name} className={styles.card}>
                      <Typography title={value.name} className={styles.text}>{value.name}</Typography>
                      <Typography title={value.name} className={styles.text}>{value.data.toLocaleString('en-US')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      );
}

export default GlobalData;