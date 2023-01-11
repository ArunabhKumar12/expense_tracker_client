import _ from 'lodash' ;

// export function getSum(transaction ){
export function getSum(transaction , type){
    // console.log(transaction) ;

    let sum = _(transaction) 
            .groupBy("type") 
            .map((objs , key) => {
                // return objs 
                // return _.sumBy(objs , "amount") //we want to get the sum of the obj by amount 
                if(!type) return _.sumBy(objs , "amount") // This will return an array containing total sum under each category like this [1500 , 5000 , 4000]
                return{
                    'type': key ,
                    'color' : objs[0].color ,
                    'total' : _.sumBy(objs , 'amount')
                }
            })
            .value()
    // console.log(sum) ;
    return sum
}

export function getLabels(transaction){
    let amountSum = getSum(transaction , 'type') ; //amount under each category

    // we also need total amount under each category 
    let Total = _.sum(getSum(transaction)) //this will return an array conating total sum under each category like this [1500 , 5000 , 4000]

    let percent = _(amountSum) //this is the array of objs
                .map(objs => _.assign(objs , {percent: (100*objs.total)/Total}))
                .value()
    return percent
}

// export function chart_Data(transaction){
export function chart_Data(transaction , custom){
    // custom is the param we passing in case the user want to customize its own configuration

    let bg = _.map(transaction , a=> a.color) //this will give the array of colors
    bg = _.uniq(bg) // this will remove the duplicate colors present in the array 
    // console.log(bg) 

    let dataValue = getSum(transaction) ;

    const config = {
        data : {
            datasets: [{
          
                // data: [300, 50, 100],
                // we will replace the above hard coded val using getSuk fn 
                data: dataValue ,

                backgroundColor: bg ,
                // we will replace the below hard coded array with the array that we get from the above fn 
                /*
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                */
                hoverOffset: 4 ,
                borderRadius: 30 ,
                spacing : 10 
              }]
        } ,
        options : {
            cutout: 115
        }
      }

      return custom ?? config ;

}

export function getTotal(transaction){
    return _.sum(getSum(transaction)) ;
}