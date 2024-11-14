const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const buddieSchema = new mongoose.Schema({
  buddie_name: {
    type: String,
    required: true
  },
  buddie_dob: {
    type: Date,
    required: true
  },
  buddie_gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  buddie_contact: {
    type: String,
    required: true
  },
  buddie_email: {
    type: String,
    default: ''
  },
  buddie_profession: {
    type: String,
    enum: ['Work', 'Student'],
    required: true
  },
  buddie_guardian_name: {
    type: String,
    required: true
  },
  buddie_emergency_contact: {
    type: String,
    required: true
  },
  buddie_id_proof: {
    type: String,
    required: true
  },
  buddie_bike_no: {
    type: String,
    default: ''
  },
  buddie_photo: {
    type: String,
    default: ''
  },
  buddie_password: {
    type: String,
    required: true
  },
  hostel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  room_no: {
    type: String,
    default: ''
  },
  buddie_doj: {
    type: Date,
    default: Date.now
  },
  rent_due: Number,
  paid_rents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  approved: {  // New flag for admin approval
    type: Boolean,
    default: false  // Set to false initially when a buddie adds themselves
  }
});

// Middleware to hash the password before saving
buddieSchema.pre('save', async function(next) {
  if (this.isModified('buddie_password')) {
    const salt = await bcrypt.genSalt(10);
    this.buddie_password = await bcrypt.hash(this.buddie_password, salt);
  }
  next();
});

buddieSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.buddie_password);
};

module.exports = mongoose.model('Buddie', buddieSchema);
