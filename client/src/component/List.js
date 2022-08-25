import React from 'react'
import "boxicons"

const obj = [
    {
      name:"Savings",
      color:"#f9c74f",
      percent:30
    },
    {
      name:"Expense",
      color:"#ff6484",
      percent:60
    },
    {
      name:"Investment",
      color:"#9d4edd",
      percent:10
    }
]

const List = () => {
  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-md text-xl'>History</h1>
        {obj.map((v,i) => {
            return <Transactions key={i} category={v}/>
        })}
    </div>
  )
}

const Transactions = ({category}) => {
    if(!category) return null;

    return (
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight:`8px solid ${category.color??"#e5e5e5"}`}}>
            <button className='px-3'><box-icon size="px" name="trash" color={category.color??"#e5e5e5"} /></button>
            <span className='block w-full'>{category.name??""}</span>
        </div>
    )
}

export default List