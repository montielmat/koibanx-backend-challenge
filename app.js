const mongoose = require('mongoose');
const logger = require('./utils/logger');

mongoose.Promise = Promise;

const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const storeRouter = require('./routes/storesRouter')

//connect top the database
const db = mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'),
 { useNewUrlParser: true,
   useUnifiedTopology: true 
  });

require ('./utils/initializer').init()

//middlewares
app.use(express.json())

app.use('/api', storeRouter);

// Start the server
const createServer = app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = {app,db,createServer}
