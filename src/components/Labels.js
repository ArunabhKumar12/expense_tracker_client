import React from 'react'
import {default as api} from '../store/apiSlice' ;
// import {getSum} from '../helper/helper' ;
import {getLabels} from '../helper/helper' ;

/*
const obj = [
    {
        type : "Savings", 
        color : "#f9c74f" ,
        percent : 45 
    } ,
    {
        type : "Investment", 
        color : "#f9c74f" ,
        percent : 20 
    } ,
    {
        type : "Expense", 
        color : "rgb(54, 162, 235)" ,
        percent : 10 
    }
]
*/

// now we are not using the obj rather we are getting the above values from the database 

export default function Labels() {

    // api.useGetCategoriesQuery() //RTK query will pass use as prefix to your query and then add query at the end of the fn
    // console.log(api.useGetCategoriesQuery()) ;

    // const {data , isFetching , isSuccess , isError} = api.useGetCategoriesQuery() ;
    const {data , isFetching , isSuccess , isError} = api.useGetLabelsQuery() ;
    // console.log(data) ;

    // console.log(data) ;


    let Transactions ;
    if(isFetching){
        //we dont have any data in the data var 
        Transactions =  <div>Fetching</div> ;
    }
    else if(isSuccess){
        // console.log(getLabels(data , 'type'));
        // Transactions = data.map((v , i) => <LabelComponent key={i} data={v}></LabelComponent>) 
        Transactions = getLabels(data , 'type').map((v , i) => <LabelComponent key={i} data={v}></LabelComponent>) 
        // getSum(data) ;
        // getSum(data , 'type') ; //earlier only category wise total sum was coming . Now color , type and total sum will also get printed 
        
    }
    else if(isError){
        Transactions = <div>Error</div> ;
    }
  return (
    <>
        {/* {obj.map((v , i) => <LabelComponent key={i} data={v}></LabelComponent>)} */}
        {/* {data.map((v , i) => <LabelComponent key={i} data={v}></LabelComponent>)} */}
        {Transactions}
    </>
  )
}

function LabelComponent({data}){

    if(!data) return <></> ;
    return (
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
            <div className='w-2 h-2 rounded-2 py-3' style={{background: data.color ?? '#f9c74f'}}></div>
                <h3 className='text-md'>{data.type ?? ""}</h3>
            </div>
            {/* <h3 className='font-bold'>{data.percent ?? 0}%</h3> */}
            {/* Now we will remove the decimal vals from the percentage thats coming from our backend  */}
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>
    )
}