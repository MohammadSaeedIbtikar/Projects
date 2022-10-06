const mongoose = require('mongoose');

const user_schema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    booked: { type: Number, required: true },
    image: { type: String, required: true },
    rent_cost:{ type: Number, required:true},
    booking_time_expiration:{type:Date,require:false},
    hours:{type: Number,required:true}
  }
  );
  const Bike = mongoose.model("User", user_schema,"user");
module.exports=Bike;
  



