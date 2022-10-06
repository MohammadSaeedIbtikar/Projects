const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Bike = require('./bike_model');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000

mongoose.connect("mongodb://localhost:27017/User",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true

  }
)
app.use(bodyParser.json())
app.use(cors());
app.get('/', async (req, res) => {

  var result = await Bike.find({booked:0});
  res.send(result);


})
// searching for bikes based on location
app.get('/location/:searched_location', async (req, res) => {
  var result = await Bike.find({address:req.params.searched_location,booked:1});

  // setting the expired ones to unbooked
  for (let i = 0 ; i<result.length;i++){
    if (date.getHours()>result[i].booking_time_expiration.getHours()+result[i].hours && result[i].booking_time_expiration.getDay()==date.getDay()){
      Bike.updateOne({id:result[i].id},{booked:0});
      result[i].booking_time_expiration=new Date();
      result[i].hours=0;
    }}
    result = await Bike.find({address:req.params.searched_location,booked:0});
  res.send(result);
})




// search bikes based on name
app.get('/name/:searched_name', async (req, res) => {
  var result = await Bike.find({name:req.params.searched_name,booked:1});
   
   // setting the expired ones to unbooked
   for (let i = 0 ; i<result.length;i++){
    if (date.getHours()>result[i].booking_time_expiration.getHours()+result[i].hours && result[i].booking_time_expiration.getDay()==date.getDay())
    {
      Bike.updateOne({id:result[i].id},{booked:0});
      result[i].booking_time_expiration=new Date();
      result[i].hours=0;
    }
  }
  res.send(result);
})


// all booked bikes
app.get('/booked', async (req, res) => {
  var result = await Bike.find({booked:1});
  var date = new Date();

   // setting the expired ones to unbooked
   for (let i = 0 ; i<result.length;i++){
    if (date.getHours()>result[i].booking_time_expiration.getHours()+result[i].hours && result[i].booking_time_expiration.getDay()==date.getDay()){
      Bike.updateOne({id:result[i].id},{booked:0});
      result[i].booking_time_expiration=new Date();
      result[i].hours=0;
    }
  }
  result = await Bike.find({booked:1});
  res.send(result);
})

// all unbooked bikes
app.get('/unbooked', async (req, res) => {
  var result = await Bike.find({booked:0});
  var date = new Date();

   // setting the expired ones to unbooked
   for (let i = 0 ; i<result.length;i++){
    if (date.getHours()>result[i].booking_time_expiration.getHours()+result[i].hours && result[i].booking_time_expiration.getDay()==date.getDay()){
      Bike.updateOne({id:result[i].id},{booked:0});
      result[i].booking_time_expiration=new Date();
      result[i].hours=0;
    }
  }
  // sending the updated unbooked bikes
  result = await Bike.find({booked:0});
  res.send(result);
})

// a bike being booked
app.post('/book/:bike_id/:hours',async(req,res)=>{
  const resp = await Bike.updateOne({ id: String(req.params.bike_id) }, {
    booked: 1,
    hours: req.params.hours,
    booking_time_expiration: Date(req.body.booking_time_expiration)
  });
  res.send(resp);
})
// unbooking a bike
app.get('/unbook/:bike_id',async(req,res)=>{
  const resp = await Bike.updateOne({ id: req.params.bike_id }, {
    booked: 0
  });
  res.send(resp);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


