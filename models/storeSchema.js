const mongoose = require('mongoose');
const logger = require('../utils/logger');
const aggregatePaginate =require("mongoose-aggregate-paginate-v2")

const StoreSchema = new mongoose.Schema({
  name: String,
  cuit: String,
  concepts: Array,
  currentBalance: Number,
  active: Boolean,
  lastSale: Date,
},{ timestamps: true });

StoreSchema.pre('save', async (success,err) => {
  if(success){
     logger.info("Commerce saved!")
  }else{
    logger.info(err)
  }
});

StoreSchema.plugin(aggregatePaginate); 

module.exports = mongoose.model('Store', StoreSchema);
