import React from 'react'
import {Line, Bar} from 'react-chartjs-2'
import { AuthContext } from '../../Store/AuthContext';
import classes from '../../styles/Analytics.module.css'

import Head from 'next/head'

function Index(props: any) {
    return (
      <>
      <Head>
        <title>Island Wide Analytics</title>
      </Head>
        <div className={classes.Container}>
            <Line data={props.mydata} />
        </div>
        </>
    )
}
export async function getStaticProps() {
  const url = "https://pcrresapi.herokuapp.com/user/analytics";
  const response = await fetch(url);
  const data = await response.json();
  let labels = [];
  const dataSets: {label: string, data: number[], backgroundColor: string}[] = [{
      label: "Percentage of Postitives WRT to tests",
      data: [],
      backgroundColor: "rgb(0, 103, 34)",
  }];
  console.log(data)
  for (var key in data){
      labels.push(key);
      dataSets[0].data.push(data[key])
  }
  console.log(dataSets[0].data)
  return {
    props: {
      mydata: {
          labels,
          datasets: dataSets
      },
    },
    revalidate: 10, //interval of 10 seconds
  };
}
export default Index
