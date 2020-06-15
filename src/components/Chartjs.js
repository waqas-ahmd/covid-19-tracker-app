import React, {useEffect} from 'react';
import styles from './Chart.module.css';
import {Line} from 'react-chartjs-2';
import axios from 'axios';



function Chartjs(){
    const [data2, setData2] = React.useState();
    const [chartOpts, setChartOpts] = React.useState({
        scales: {
            xAxes: [{ticks: {display: true}}],
            yAxes: [{ticks: {display: true}}]
        }
    })
    
    
    useEffect(() => {
        const fetchStats = async () => {
          const {data} = await axios.get("https://covid19.mathdro.id/api/daily");
          setData2({
            labels: data.map(a => a.reportDate),
            datasets: [
                {
                label: 'Infected',
                data:(data.map(a => a['confirmed']['total'])),
                backgroundColor:'#00000000',
                borderColor:'#0000FF',
                pointRadius: 0,
                borderWidth:2
            },
            {
                label: 'Deaths',
                data:(data.map(a => a['deaths']['total'])),
                backgroundColor:'#00000000',
                borderColor:'#FF0000',
                pointRadius: 0,
                borderWidth:2
            }
            ]
        });
        };
        if(document.body.getBoundingClientRect().width < 500){
            setChartOpts({
                scales: {
                    xAxes: [{ticks: {display: false},gridLines: {color: "rgba(0, 0, 0, 0)"}}],
                    yAxes: [{ticks: {display: false},gridLines: {color: "rgba(0, 0, 0, 0)"}}]
                }
            })
        }
        fetchStats();
        
      },[]);// eslint-disable-line react-hooks/exhaustive-deps

    if(!data2){
        return <div>Loading data..Please Wait!</div>
    }
    return(
        <div className={styles.chart}>
            <Line
                data={data2}
                options={chartOpts}
            />
        </div>
    )
}

export default Chartjs;