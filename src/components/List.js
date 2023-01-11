import React from 'react'
import 'boxicons' ;
import {default as api} from '../store/apiSlice' ;


// we will do the same thing that we did in Labels.js 
/*
const obj = [
    {
        name : "Savings", 
        color : "#f9c74f" , 
    } ,
    {
        name : "Investment", 
        color : "#f9c74f" ,
    } ,
    {
        name : "Expense", 
        color : "rgb(54, 162, 235)" 
    }
]
*/

export default function List() {

const {data , isFetching , isSuccess , isError} = api.useGetTransactionsQuery() ;

const [deleteTransaction] = api.useDeleteTransactionMutation() ;

let Transactions ;

// creating the handler fn for deleting trans from the list using the button 
const handlerClick = (e) => {
    // e is the event param 
    // console.log(e.target) ;
    console.log(e.target.dataset.id) ;
    if(!e.target.dataset.id) return 0 ;
    deleteTransaction({_id: e.target.dataset.id})
}

    if(isFetching){
        //we dont have any data in the data var 
        Transactions =  <div>Fetching</div> ;
    }
    else if(isSuccess){
        // Transactions = data.map((v , i) => <Transaction key={i} category={v}></Transaction>);
        Transactions = data.map((v , i) => <Transaction key={i} category={v} handler={handlerClick}></Transaction>);
    }
    else if(isError){
        Transactions = <div>Error</div> ;
    }

    

  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-xl'>History</h1>
    
        {/* {obj.map((v , i) => <Transaction key={i} category={v}></Transaction> )} */}
        {Transactions}
        
    </div>
  )
}

// function Transaction({category}){
    // Now accesing the handler var created in the parent fn 
function Transaction({category , handler}){
    if(!category) return null ;
    // console.log(category) ;
    return (
        <div className="item flex justify-center bg-gray-50 py-3 rounded-r" style={{borderRight:`8px solid ${category.color ?? "#e5e5e5"}`}}>
            {/* <button className='px-3'><box-icon color={category.color ?? "#e5e5e5"} size="15px" name="trash"></box-icon></button> */}
            <button className='px-3' onClick = {handler}><box-icon data-id={category._id ?? ''} color={category.color ?? "#e5e5e5"} size="15px" name="trash"></box-icon></button>
            <span className='block w-full'>{category.name ?? ""}</span>
        </div>
    )
}
