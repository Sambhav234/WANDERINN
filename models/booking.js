const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const bookingSchema= new Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'listing',
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  checkin: Date,
  checkout: Date,
  guests: Number,
  message: String,
  days: Number,
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  currDate:Date,
    
});


module.exports = mongoose.model('Booking', bookingSchema);

