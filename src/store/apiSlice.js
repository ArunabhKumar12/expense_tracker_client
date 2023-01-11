import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react" ;

const baseURI = 'http://localhost:8000' ;

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({
        baseUrl: baseURI
    }) ,
    endpoints: builder => ({
        //get categories
        getCategories: builder.query({
            //bellow coomand will make a get req on 'http://localhost:8000/api/categories' 
            query: () => '/api/categories' ,
            providesTags:['categories'] //using these tags we will group the data together 
        }),

        //get labels 
        getLabels: builder.query({
            // get: 'http://localhost:8000/api/labels'
            query : () => '/api/labels' , //making a get req on labels endpoint
            providesTags:['transaction']
        }),

        getTransactions: builder.query({
            // get: 'http://localhost:8000/api/transaction'
            query : () => '/api/transaction' , //making a get req on labels endpoint
            providesTags:['transaction']
        }),

        //add new transaction
        //we will make a post req using the API slice 
        addTransaction: builder.mutation({ //whenever we need to create , delete or update we use mutation

            // post : 'http://localhost:8000/api/transaction'
            query : (initialTransaction) => ({
                url: '/api/transaction' ,
                method: "POST" ,
                body: initialTransaction
            }) ,
            invalidatesTags: ['transaction']
        }),

        //delete record 
        deleteTransaction: builder.mutation({
            query: recordId => ({
                // delete : 'http://localhost:8000/api/transaction'
                url: '/api/transaction' ,
                method: "DELETE" ,
                body: recordId 
            }),
            invalidatesTags: ['transaction']
        })

    })
})

export default apiSlice ;