import {createSlice} from '@reduxjs/toolkit' ;

const initialState = {
    categories : [] ,
    transaction: [] 
}

export const expenseSlice = createSlice({
    name: 'expense' ,
    initialState ,
    //using reducer we create a central store 
    reducers : {
        getTransactions: (state) => {
            //get transaction code 
        }
    }
})

export const {getTransactions} = expenseSlice.actions ;
export default expenseSlice.reducer ;