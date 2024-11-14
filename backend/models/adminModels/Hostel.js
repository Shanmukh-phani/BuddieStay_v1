const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const QRCode = require('qrcode'); // Import QR code generator

const hostelSchema = new mongoose.Schema({
    hostel_name: { type: String, required: true },
    hostel_type: { type: String, required: true },
    hostel_city: { type: String, required: true },
    hostel_area: { type: String, required: true },
    hostel_pin_code: { type: String, required: true },
    hostel_phone: { type: String, required: true },
    hostel_mail: { type: String, required: true },
    hostel_owner_name: { type: String, required: true },
    hostel_password: { type: String, required: true },
    hostel_security_deposit: { type: Number, required: true },
    hostel_year: { type: Number, required: true },
    hostel_owner_languages: {
        telugu: { type: Boolean, default: false },
        hindi: { type: Boolean, default: false },
        english: { type: Boolean, default: false }
    },
    hostel_message: { type: String },
    hostel_about: { type: String },
    hostel_facilities: [{ type: String }],
    hostel_google_map_location: { type: String },
    sharing_prices: [{
        share_type: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    hostel_image: { type: String },
    hostel_image1: { type: String },
    hostel_image2: { type: String },
    hostel_image3: { type: String },
    hostel_qr_code: { type: String } , // Field to store QR code
    hostel_vacancy_available: { type: Boolean, default: true } , // New field for vacancy status
    hostel_dhobi: { type: Boolean, default: false }  // New field for vacancy status

});

// Middleware to hash the password before saving
hostelSchema.pre('save', async function(next) {
    const hostel = this;

    // Hash the password if modified
    if (hostel.isModified('hostel_password')) {
        const salt = await bcrypt.genSalt(10);
        hostel.hostel_password = await bcrypt.hash(hostel.hostel_password, salt);
    }

    // Generate QR code if not already created
    if (!hostel.hostel_qr_code) {
        // Define the base URL for adding a Buddie, and include the hostel ID in the URL
        // const addBuddieUrl = `https://localhost:3000/addBuddie?hostel_id=${hostel._id}`;
        const addBuddieUrl = `https://staybuddie.in/addBuddie/${hostel._id}`; // need to change URF for PROD

        // Generate the QR code and store it as a base64 string
        const qrCodeImage = await QRCode.toDataURL(addBuddieUrl);
        hostel.hostel_qr_code = qrCodeImage;  // Store the base64 QR code in the database
    }

    next();
});

// Method to compare password
hostelSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.hostel_password);
};

module.exports = mongoose.model('Hostel', hostelSchema);
