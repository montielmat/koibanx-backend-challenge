const moment = require('moment')

const isDate =(val)=>{
    if(!value){return false}
    const date= moment(val)
    if(date.isValid()){
        return true
    }else{return false}
}

module.exports={isDate}