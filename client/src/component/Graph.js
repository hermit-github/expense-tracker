import React from 'react'
import {Doughnut} from "react-chartjs-2"
import {Chart,ArcElement} from "chart.js"
import Labels from './Labels';
import {chartData,getTotal} from "../helper/helper"
import {default as api} from "../store/apiSlice"

Chart.register(ArcElement);


const config = {
  data:{
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4,
      borderRadius:30,
      spacing:10
    }]
  },
  options:{
    cutout:115
  }
}

const Graph = () => {


  const {data,isFetching,isSuccess,isError} = api.useGetLabelsQuery();

  let graphData;
  let total;

  if(isFetching){
    graphData = <div>Fetching</div>  
  } else if (isSuccess){
    const currentData = data.data;
    total = getTotal(currentData)
    graphData = <Doughnut {...chartData(currentData)}/>
  } else if (isError){
    graphData = <div>Error</div>
  }


  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          <h3 className="mt-2 mb-4 font-bold title">Total
          <span className='block text-3xl text-emrald-400'>${total ?? 0}</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* Labels */}
          <Labels/>
        </div>
      </div>
    </div>
  )
}

export default Graph