const logger = require('../utils/logger');
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validateFields');
const { getStores, createCommerce, basicAuth } = require('../controller/storeController');
const { isDate } = require('../utils/isDate');


router.get("/api/auth"),[
check("email","email is valid").notEmpty().isEmail(),
check("password","password is valid").notEmpty().length({min:7})
],
basicAuth;

router.get('/api/stores'),[basicAuth],getStores;

router.post('/api/stores'),
[
check("name","name is required").notEmpty().isLength({min:3}),
check("cuit","cuit is required and cuit must be a number").notEmpty().isNumeric(),
check("current balance","current balance is required and must be a number").notEmpty().isNumeric(),
check("concepts","must be array not empty").notEmpty().toArray(),
check("active","active is required and must be bool").notEmpty().isBoolean(),
check("last sale","last sale must be a Data obj").custom(isDate()),
validateFields,
basicAuth
],
createCommerce;

module.exports = router;
