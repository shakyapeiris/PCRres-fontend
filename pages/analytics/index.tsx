import React from 'react'
import {Line, Bar} from 'react-chartjs-2'
import { AuthContext } from '../../Store/AuthContext';

import Head from 'next/head'

function Index(props: any) {
    return (
      <>
      <Head>
        <title>Island Wide Analytics</title>
      </Head>
        <div style={{width: "70%", height: "75vh", margin: "auto", background: "white", position: "absolute", left: "50%", transform: "translateX(-50%)", top: "20%", borderRadius: "5px", padding: "10px", boxShadow: "5px 5px 27px 3px rgba(0,0,0,0.27)"}}>
            <Line data={props.mydata} />
        </div>
        </>
    )
}
export async function getStaticProps() {
  const url = "http://localhost:5000/user/analytics";
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
