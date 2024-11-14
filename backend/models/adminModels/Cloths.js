const mongoose = require('mongoose');

const clothSchema = new mongoose.Schema({
    hostel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel', // Reference to the Hostel model
        required: true
    },
    buddie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buddie', // Reference to the Buddie model
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Sets the default date to now
    },
    clothing_details: {
        type: Map,
        of: Number, // To store clothing item names and their counts
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Cloths = mongoose.model('Cloths', clothSchema);

module.exports = Cloths;
