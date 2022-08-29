import React from 'react'
import {default as api} from "../store/apiSlice"
import {getLables} from "../helper/helper"

// const obj = [
//   {
//     type:"Savings",
//     color:"#f9c74f",
//     percent:30
//   },
//   {
//     type:"Expense",
//     color:"#ff6484",
//     percent:60
//   },
//   {
//     type:"Investment",
//     color:"#9d4edd",
//     percent:10
//   }
// ]


const Labels = () => {

  const {data,isFetching,isSuccess,isError} = api.useGetLabelsQuery();

  
  
  let Trasactions;

  if(isFetching){
    Trasactions = <div>Fetching</div>  
  } else if (isSuccess){
    const currentData = data.data;
    Trasactions = getLables(currentData).map( (v,i) => {
      return <LabelComponent key={i} data={v}/>
    })
  } else if (isError){
    Trasactions = <div>Error</div>
  }
  
  return (
    <>
    {Trasactions}
    </>
  )
}

const LabelComponent = ({data}) => {
  if(!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded py-3" style={{background:data.color?? "#f9c74f"}}></div>
              <h3>{data.type ?? ""}</h3>
            </div>
            <div className="font-bold">{Math.round(data.percent)?? ""}%</div>
        </div>
    )
}

export default Labels