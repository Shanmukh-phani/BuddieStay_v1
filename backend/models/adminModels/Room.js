const mongoose = require('mongoose');

// Define the schema for Room
const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true },
  room_sharing: { type: Number, required: true },
  hostel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
  room_vacancy: { type: Number, required: true }
});

// Validation: Ensure room_vacancy is not more than room_sharing
roomSchema.pre('save', function (next) {
  if (this.room_vacancy > this.room_sharing) {
    return next(new Error('Room vacancy cannot be more than room sharing'));
  }
  next();
});

module.exports = mongoose.model('Room', roomSchema);
