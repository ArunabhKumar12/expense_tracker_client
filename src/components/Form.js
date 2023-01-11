import React from 'react'
import {useForm} from 'react-hook-form' ;
import List from './List' ;

import {default as api} from '../store/apiSlice' ;

export default function Form() {

    const {register , handleSubmit , resetField} = useForm() ;

    const [addTransaction] = api.useAddTransactionMutation() ; //RTK query will pass use as the prefix of the fn and at the end we add Mutation

    // const onSubmit = (data) => {
    //     console.log(data) ;
    // }

    const onSubmit = async (data) => {
        // console.log(data) ;
        if(!data) return {} ;
        await addTransaction(data).unwrap() //to provide a raw response , we will use the unwrap fn 
        resetField('name') //this will reset the form fields once the make trans button is clicked
        resetField('amount')
    }

  return (
    <div className='form max-w-sm mx-auto w-96'>
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
                <div className='input-group'>
                    <input type="text" {...register('name')} placeholder='Salary , Rent , SIP' className='form-input'></input>
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings" defaultValue>Savings</option>
                </select>
                <div className='input-group'>
                    <input type="text" {...register('amount')} placeholder='Amount' className='form-input'></input>
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                </div>
            </div>
        </form>

        <List></List>
    </div>
  )
}
