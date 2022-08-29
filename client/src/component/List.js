import React from 'react'
import "boxicons"
import {default as api} from "../store/apiSlice"

// const obj = [
//     {
//       name:"Savings",
//       color:"#f9c74f",
//       percent:30
//     },
//     {
//       name:"Expense",
//       color:"#ff6484",
//       percent:60
//     },
//     {
//       name:"Investment",
//       color:"#9d4edd",
//       percent:10
//     }
// ]

const List = () => {

  const {data,isFetching,isSuccess,isError} = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation()

  

  let Transactions ;

  const handleClick = (e) => {
    if(!e.target.dataset.id) return 0;
    deleteTransaction({transactionId:e.target.dataset.id})
  }

  if(isFetching){
    Transactions = <div>Fetching</div>  
  } else if (isSuccess){
    const currentData = data.data;
    Transactions = currentData.map( (v,i) => {
      return <Transaction key={i} category={v} handler = {handleClick}/>
    })
  } else if (isError){
    Transactions = <div>Error</div>
  }

  

  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-md text-xl'>History</h1>
        {Transactions}
    </div>
  )
}

const Transaction = ({category,handler}) => {

    if(!category) return null;

    return (
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight:`8px solid ${category.color??"#e5e5e5"}`}}>
            <button className='px-3' onClick={handler}><box-icon data-id={category.id??""} size="px" name="trash" color={category.color??"#e5e5e5"} /></button>
            <span className='block w-full'>{category.name??""}</span>
        </div>
    )
}

export default List