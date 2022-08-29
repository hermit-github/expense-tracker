import _ from "lodash";

export const getSum = (transactions,type) => {
    let sum = _(transactions)
                .groupBy("type")
                .map((obj,key) => {
                    if(!type) return _.sumBy(obj,"amount");
                    return {
                        "type":key,
                        "color":obj[0].color,
                        "total":_.sumBy(obj,"amount")
                    }
                })
                .value()
    return sum;
}

export const getLables = (transactions) => {
    let amountSum = getSum(transactions,"type");
    let Total = _.sum(getSum(transactions));
    let percent = _(amountSum)
                    .map( obj => _.assign(obj,{percent:(100*obj.total)/Total}))
                    .value()
    return percent;
}

export const chartData = (transactions,custom) => {
    let dataValues = getSum(transactions);
    let colorValues = _.map(transactions, a => a.color) 
    colorValues = _.uniq(colorValues)

    const config = {
        data:{
          datasets: [{
            label: 'My First Dataset',
            data: dataValues,
            backgroundColor: colorValues,
            hoverOffset: 4,
            borderRadius:30,
            spacing:10
          }]
        },
        options:{
          cutout:115
        }
      }

    return custom ?? config;
}

export const getTotal = (transactions) => {
    return _.sum(getSum(transactions))
}

