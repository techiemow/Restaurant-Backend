const mongoose = require('mongoose');

const schema = mongoose.Schema

const RegistrationSchema = new schema({
    username: {
        type: String,
        required: true
    },
    emailaddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
   
})

const BookingSchema = new schema({
    username: { type: String , required: true },
    restaurentId: { type: String , required: true },
    selectedTime: { type: String , required: true },
    selectedSeats: { type: Number , required: true },
    selectedDate: { type: String , required: true },
    isCancelled: { type: Boolean },
  });
  



const RegistrationModel = mongoose.model('Registrations', RegistrationSchema);

const BookingModel = mongoose.model("bookings", BookingSchema);
module.exports = {
    RegistrationModel,
    BookingModel
}