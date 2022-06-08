const Store = require('../models/storeSchema');
// const User = require('../models/user');
const logger = require('../utils/logger');
// const bcrypt = require('bcryptjs');
const currentUser = require('../utils/initializer');
const checkCurrentUser = require('../utils/checkCurrentUser')
const userExists = require('../utils/userExists');
const db = require("../app"); 


const basicAuth = async (req,res,next)=>{

   if(userExists(currentUser)){

    if(!checkCurrentUser(currentUser)){
         return res.status(400).send({ok:false,msj:"Invalid data provided"})
     }else{
         res.status(200).send({ok:true,msj:currentUser.username})
         next();
     }
  }
}

const getStores = async(req,res)=>{

if(userExists(currentUser) && checkCurrentUser(currentUser)){

    const countTotal = ()=>{
        db.countDocuments({}),function(count){
            return logger.info("total:",count)
        }.catch((err)=>logger.info(err))
    }

    try {
        const {pge,lmt} = req.params;

        const rows = null;

        rows = await Store.find({}).limit(lmt?lmt:10).skip(10 * pge)

        res.status(200).send({
            data:rows,
            page:pge,
            pages:rows.count(),
            limut:lmt || 10,
            total: countTotal()
        })
      } catch (errors) { 
        res.status(404)
        logger.info([errors])
    }
  }else{
      res.status(404).send({error:"You must sign up first"})
  }
};

const createCommerce =async(req,res)=>{
   if(userExists(currentUser)){
       try {
        const {name,cuit,concept,currentBalance,lastSell,active} = req.body; 
        const newCommerce= new Store(name,cuit,concept,currentBalance,lastSell,active)
        await newCommerce.save()
        res.status(200).send(newCommerce);
        } catch (errors) {
            res.status(404)
            logger.info([errors])
       }
   }else{
       res.status(404).send({error:"You must sign up first"})
   }

}

module.exports={
basicAuth,
getStores,
createCommerce
}