
const mongoose = require("mongoose")
const request = require('supertest');
const Store = require('../models/storeSchema');
const createServer = require('../app');
const moment = require('moment')

 beforeEach((done) => {
 	mongoose.connect(
 		"mongodb://127.0.0.1:27017/api",
 		{ useNewUrlParser: true },
 		() => done()
	)
 })

 afterEach((done) => {
 	mongoose.connection.db.dropDatabase(() => {
 		mongoose.connection.close(() => done())
 	})
 })

const app = createServer();

describe("Should get the stores with a 200 status",()=>{

  test("GET /stores",async()=>{

     const stores = await Store.find({})

     await request(app).get("/api/store").expect(200)
     .then((response)=>{
             expect(Array.isArray(response.body)).toBeTruthy()
             expect(response.body.length).toEqual(1)
             // Check the response data
             expect(response.body[0]._id).toBe(stores.id)
             expect(response.body[0].name).toBe(stores.name)
             expect(response.body[0].cuit).toBe(stores.cuit)
             expect(response.body[0].currentBalance).toBe(stores.currentBalance)
             expect(response.body[0].concepts).toBe(stores.concepts)
             expect(response.body[0].active).toBe(stores.active)
            expect(response.body[0].lastSale.moment().subtract(10, 'days').calendar()).toBe(stores.lastSale.moment().subtract(10, 'days').calendar())        
       })
  })

  test("POST /api/store", async () => {
  
      const newCommerce = {
           _id:"34",
           name: "test",
           cuit: "tesst",
           concepts:["adsad","adsasd"],
           currentBalance:1212,
           lastSale:moment().subtract(10, 'days').calendar(),
           active:true
         }
    
     await request(app)
       .post("/api/store")
        .send(newCommerce)
      .expect(200)
       .then(async (response) => {
         expect(response.body._id).toBeTruthy()
         expect(response.body.name).toBe(newCommerce.name)
         expect(response.body.cuit).toBe(newCommerce.cuit)  
         expect(response.body.concepts).toBe(newCommerce.concepts)  
         expect(response.body.currentBalance).toBe(newCommerce.currentBalance)  
         expect(response.body.active).toBe(newCommerce.active)     
         expect(response.body.lastSale.moment().subtract(10, 'days').calendar()).toBe(newCommerce.lastSale.moment().subtract(10, 'days').calendar())         
     })
  })
})
 

