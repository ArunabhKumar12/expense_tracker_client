import React from 'react'

import {Doughnut} from 'react-chartjs-2' ;
import {Chart , ArcElement} from 'chart.js' ;

import Labels from './Labels';

import { chart_Data , getTotal } from '../helper/helper';
import {default as api} from '../store/apiSlice' ;

Chart.register(ArcElement) ;

// Now its time to remove th below hard coded vals and get the data from the database 
/*
  const config = {
    data : {
        datasets: [{
      
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4 ,
            borderRadius: 30 ,
            spacing : 10 
          }]
    } ,
    options : {
        cutout: 115
    }
  }
  */

  // we are getting the chart_Data from the helper fn 


export default function Graph() {

  const {data , isFetching , isSuccess , isError} = api.useGetLabelsQuery() ;
    
    let graphData ;

    if(isFetching){
        graphData =  <div>Fetching</div> ;
    }
    else if(isSuccess){
        // console.log(getTotal(data)) ;
        // chart_Data(data) ;
        graphData = <Doughnut {...chart_Data(data)}></Doughnut> //we will only return the doughnut when we have the data inside the data var 
        // this chart_Data(data) will return the config obj with the backend data from the helper.js file 
    }
    else if(isError){
        graphData = <div>Error</div> ;
    }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
        <div className="item">
            <div className="chart relative">
                {/* Graph */}
                {/* <Doughnut {...config}></Doughnut>  */}
                {graphData}
                <h3 className='mb-4 font-bold title'>TOTAL
                {/* <span className='block text-rxl text-emerald-400'>${0}</span> */}
                <span className='block text-2xl text-emerald-400'>Rs {getTotal(data) ?? 0 }</span>
                </h3>
            </div>
            <div className="flex flex-col py-10 gap-4">
                {/* Labels  */}
                <Labels></Labels>
            </div>
        </div>
    </div>
  )
}
