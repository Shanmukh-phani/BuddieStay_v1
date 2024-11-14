// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Hostel = require('../../models/adminModels/Hostel'); // Assuming your model is in the models folder
const Room = require('../../models/adminModels/Room'); // Assuming your Room model is in the models folder
const Buddie = require('../../models/adminModels/Buddie'); // Assuming your Room model is in the models folder
const FoodMenu = require('../../models/adminModels/FoodMenu');
const Payment = require('../../models/adminModels/Payment');
const Complaint = require('../../models/adminModels/Complaint');
const Cloths = require('../../models/adminModels/Cloths');
const moment = require('moment');

const mongoose = require('mongoose');


// const multer = require('multer');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');




const { generateToken } = require('./auth');
const nodemailer = require('nodemailer');
const verifyToken = require('./verifyToken'); // Make sure to provide the correct path

let otpStorage = {};

// Node mailer Authentication
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phanikumar0520@gmail.com', // Replace with your Gmail
        pass: 'qxvicvyrkyxjeoeg', // Replace with your Gmail password or App Password
    },
});

//Generate Unique OTP for Verification
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Sending OTP 
router.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    otpStorage[email] = otp;

    const mailOptions = {
        from: 'phanikumar0520@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // console.log(error);
            return res.status(500).send('Error sending email');
        }
        res.send('OTP sent successfully');
    });
});


// Verify OTP
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStorage[email] === otp) {
        delete otpStorage[email];
        return res.send('OTP verified successfully');
    }
    res.status(400).send('Invalid OTP');
});

// ================================================================== HOSTEL ===========================================

// create a new hostel
router.post('/create', async (req, res) => {
  const {
      hostel_name,
      hostel_type,
      hostel_city,
      hostel_area,
      hostel_pin_code,
      hostel_phone,
      hostel_mail,
      hostel_owner_name,
      hostel_password,
      hostel_security_deposit,
      hostel_year,
      hostel_owner_languages,
      hostel_message,
      hostel_about,
      hostel_facilities,
      hostel_google_map_location,
      sharing_prices,
      hostel_image,
      hostel_image1,
      hostel_image2,
      hostel_image3,
  } = req.body;

  try {
      const newHostel = new Hostel({
          hostel_name,
          hostel_type,
          hostel_city,
          hostel_area,
          hostel_pin_code,
          hostel_phone,
          hostel_mail,
          hostel_owner_name,
          hostel_password,
          hostel_security_deposit,
          hostel_year,
          hostel_owner_languages,
          hostel_message,
          hostel_about,
          hostel_facilities,
          hostel_google_map_location,
          sharing_prices,
          hostel_image,
          hostel_image1,
          hostel_image2,
          hostel_image3,
      });

      await newHostel.save(); // Save the hostel and generate QR code

      res.status(201).json({ message: 'Hostel created successfully', hostel: newHostel });
  } catch (error) {
      res.status(500).json({ message: 'Error creating hostel', error });
  }
});


// Login for Hostel Owners
router.post('/login', async (req, res) => {
  const { hostel_phone, hostel_password } = req.body;

  try {
    const hostel = await Hostel.findOne({ hostel_phone });

    if (!hostel) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    const isMatch = await hostel.comparePassword(hostel_password);


    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    const token = generateToken(hostel._id);

    res.json({ token, hostel_id: hostel._id,hostel_phone });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Display Hostel profile
router.get('/hostelProfile', verifyToken, async (req, res) => {
  const { hostel_id } = req.query;
  
  try {
    if (!hostel_id) {
      return res.status(400).json({ message: 'Hostel ID is required' });
    }

    const hostel = await Hostel.findOne({ _id: hostel_id }); // Use findOne to get a single document

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.status(200).json(hostel);
  } catch (error) {
    console.error('Error fetching hostel:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// update hostel profile
router.put('/updateHostelProfile', verifyToken, async (req, res) => {
  const { hostel_id } = req.body;
  const updateData = req.body;

  try {
    if (!hostel_id) {
      return res.status(400).json({ message: 'Hostel ID is required' });
    }

    const hostel = await Hostel.findById(hostel_id); // Find the hostel by ID

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Update hostel with the provided data
    Object.keys(updateData).forEach(key => {
      if (key !== 'hostel_id') {
        hostel[key] = updateData[key];
      }
    });

    await hostel.save(); // Save the updated hostel

    res.status(200).json(hostel);
  } catch (error) {
    console.error('Error updating hostel:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// update hostel sharing payments
router.put('/updateHostelPayments', verifyToken, async (req, res) => {
  const { hostel_id, sharing_prices } = req.body;

  try {
    // Find the hostel by ID and update the sharing prices
    const hostel = await Hostel.findOneAndUpdate(
      { _id: hostel_id },
      { $set: { sharing_prices } },
      { new: true, runValidators: true }
    );

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.status(200).json({ message: 'Prices updated successfully', hostel });
  } catch (error) {
    console.error('Error updating hostel Payments:', error);
    res.status(500).json({ message: 'Failed to update prices', error });
  }
});

// Update hostel Fees
router.put('/updateHostelFees', verifyToken, async (req, res) => {
  const { hostel_id, sharing_prices } = req.body;

  try {
    // Find the hostel by ID
    const hostel = await Hostel.findById(hostel_id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Update the sharing prices
    hostel.sharing_prices = sharing_prices;

    // Save the updated hostel
    await hostel.save();

    return res.status(200).json({ message: 'Prices updated successfully' });
  } catch (error) {
    console.error('Error updating prices:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// ======================================== ROOMS ===================================================

// Add Room
router.post('/addRoom', verifyToken, async (req, res) => {
  const { room_number, room_sharing, room_vacancy, hostel_id } = req.body;

  // console.log('Received data:', { room_number, room_sharing, room_vacancy, hostel_id });

  // Validate required fields
  if (!room_number || !room_sharing || !room_vacancy || !hostel_id) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the hostel exists
    const hostel = await Hostel.findById(hostel_id);
    if (!hostel) {
      console.log('Hostel not found');
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Check for duplicate room_number within the specified hostel
    const existingRoom = await Room.findOne({ room_number, hostel_id });
    if (existingRoom) {
      console.log('Room already exists in this hostel');
      return res.status(400).json({ message: 'Room already exists in this hostel' });
    }

    // Create a new room
    const newRoom = new Room({
      room_number,
      room_sharing,
      room_vacancy,
      hostel_id,
    });

    // Save the room to the database
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});  


// getting all rooms
router.get('/getrooms', verifyToken, async (req, res) => {
    const { hostel_id } = req.query;
  
    try {
      // Fetch rooms with the specified hostel_id and room_vacancy > 0
      const rooms = await Room.find({ 
        hostel_id, 
        room_vacancy: { $gt: 0 }  // Only select rooms with room_vacancy greater than 0
      });
  
      if (!rooms || rooms.length === 0) {  // Check if rooms is null or empty
        return res.status(404).json({ message: 'No rooms found with available vacancies' });
      }
  
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// getting 10 rooms for infinite scrolling
// router.get('/rooms', verifyToken, async (req, res) => {
//   // Parse page and limit as integers with default values
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 10;
//   const { hostel_id } = req.query;

//   // Calculate the number of documents to skip
//   const skip = (page - 1) * limit;

//   try {
//     // Ensure consistent sorting (e.g., by createdAt or _id)
//     const rooms = await Room.find({ hostel_id })
//       .sort({ createdAt: -1 }) // Sort by creation date descending
//       .skip(skip)
//       .limit(limit);

//     const totalRooms = await Room.countDocuments({ hostel_id });
//     const totalPages = Math.ceil(totalRooms / limit);

//     if (!rooms || rooms.length === 0) {
//       return res.status(404).json({ message: 'No rooms found' });
//     }

//     res.status(200).json({
//       rooms,
//       currentPage: page,
//       totalPages,
//       totalRooms,
//     });
//   } catch (error) {
//     console.error('Error fetching rooms:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// router.get('/rooms', verifyToken, async (req, res) => {
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 10;
//   const { hostel_id } = req.query;

//   if (!hostel_id) {
//     return res.status(400).json({ message: 'hostel_id is required' });
//   }

//   const skip = (page - 1) * limit;

//   try {
//     console.log(`Fetching page: ${page}, skip: ${skip}, limit: ${limit}`);
    
//     const rooms = await Room.find({ hostel_id })
//     .sort({ createdAt: 1 }) // Ascending to maintain stable order
//     .skip(skip)
//     .limit(limit);

//     const totalRooms = await Room.countDocuments({ hostel_id });
//     const totalPages = Math.ceil(totalRooms / limit);
//     console.log('Total Pages:', totalPages);
    

//     console.log(`Total rooms: ${totalRooms}, Total pages: ${totalPages}`);

//     res.status(200).json({
//       rooms,
//       currentPage: page,
//       totalPages,
//       totalRooms,
//       debugData: { rooms: rooms.map(room => room._id) }, // Log room IDs being sent
//     });
    
//   } catch (error) {
//     console.error('Error fetching rooms:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// API endpoint to fetch rooms
router.get('/rooms', verifyToken, async (req, res) => {
  const { hostel_id } = req.query; // Get hostel_id from the query parameters

  try {
    // Fetch rooms where the hostel_id matches the provided value
    const page = req.query.page ? parseInt(req.query.page):1;
    const size = req.query.size ? parseInt(req.query.size):10;
    const skip = (page - 1) * size;
    const total = await Room.countDocuments({hostel_id});
    const rooms = await Room.find({ hostel_id }).skip(skip).limit(size);
    res.json({
      records : rooms,
      total,
      page,
      size
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

  

// Getting rooms for outside buddies
router.get('/outRooms', async (req, res) => {
    const { hostel_id } = req.query;
  
    try {
      const rooms = await Room.find({ hostel_id });
  
      if (!rooms) {
        return res.status(404).json({ message: 'No rooms found' });
      }
  
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
// Updte room details
router.put('/updateRoom/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { hostel_id, room_number, room_sharing, room_vacancy } = req.body;

  try {
    // Check if a room with the same room_number already exists in the same hostel (excluding the current room)
    const existingRoom = await Room.findOne({
      hostel_id,
      room_number,
      _id: { $ne: id }, // Exclude the current room being updated
    });

    if (existingRoom) {
      return res.status(400).json({ message: 'A room with this number already exists in the hostel' });
    }

    // Update the room with the specified id and hostel_id
    const room = await Room.findOneAndUpdate(
      { _id: id, hostel_id },
      { room_number, room_sharing, room_vacancy },
      { new: true } // Return the updated room
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found or unauthorized' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

  
// delete room  
router.delete('/deleteRoom/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { hostel_id } = req.body;
  
    try {
      // Optional: Verify hostel_id from the token if you set it in req.user or req.body
      // const hostel_id_from_token = req.user.hostel_id; // Adjust according to your token verification logic
  
      // Find and delete the room with the provided id and hostel_id
      const room = await Room.findOneAndDelete({ _id: id, hostel_id });
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found or unauthorized' });
      }
  
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error('Error deleting room:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

//Search rooms
// router.get('/rooms/search', async (req, res) => {
//   const { room_number } = req.query;
//   try {
//     const rooms = await Room.find({ room_number: room_number });
//     res.json(rooms);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to search rooms' });
//   }
// });

// Search rooms by room_number and hostel_id
router.get('/rooms/search', async (req, res) => {
  const { room_number, hostel_id } = req.query;

  // Ensure hostel_id is provided
  if (!hostel_id) {
    return res.status(400).json({ error: 'hostel_id is required' });
  }

  try {
    // Build search criteria based on provided parameters
    const searchCriteria = {
      hostel_id, // Match rooms with the specified hostel_id
      ...(room_number && { room_number: { $regex: room_number, $options: 'i' } }) // Case-insensitive partial match on room_number if provided
    };

    const rooms = await Room.find(searchCriteria);
    res.json(rooms);
  } catch (error) {
    console.error('Failed to search rooms:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// =============================================== BUDDIES ====================================================
  
// Add buddies
  router.post('/addBuddie', verifyToken, async (req, res) => {
    const {
      buddie_name, buddie_dob, buddie_gender, buddie_contact, buddie_email,
      buddie_profession, buddie_guardian_name, buddie_emergency_contact,
      buddie_id_proof, buddie_bike_no, buddie_photo, buddie_password, buddie_confirm_password, room_no, hostel_id,buddie_doj,approved = true
    } = req.body;
  
    // Validate passwords
    if (buddie_password !== buddie_confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    // Validate hostel_id
    if (!hostel_id) {
      return res.status(400).json({ message: 'Hostel ID is required' });
    }
  
    try {
      // Check if the hostel exists
      const hostel = await Hostel.findById(hostel_id);
      if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }
  
      // Check if a buddie with the same contact already exists in the specified hostel
      const existingBuddie = await Buddie.findOne({ buddie_contact, hostel_id });
      if (existingBuddie) {
        return res.status(400).json({ message: 'Buddie with this contact number already exists in this hostel' });
      }
  
      // Check room availability and update vacancy if a room is specified
      if (room_no) {
        const room = await Room.findOne({ room_number: room_no, hostel_id });
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        if (room.room_vacancy <= 0) {
          return res.status(400).json({ message: 'No vacancies available in the specified room' });
        }
  
        // Decrease room vacancy
        room.room_vacancy -= 1;
        await room.save();
      }
  
      // // Hash the password before saving
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(buddie_password, salt);
  
      // Create and save the new buddie
      const newBuddie = new Buddie({
        buddie_name, buddie_dob, buddie_gender, buddie_contact, buddie_email,
        buddie_profession, buddie_guardian_name, buddie_emergency_contact,
        buddie_id_proof, buddie_bike_no, buddie_photo, buddie_password, hostel_id, room_no,approved
      });
      const savedBuddie = await newBuddie.save();
  
      res.status(201).json(savedBuddie);
    } catch (error) {
      console.error('Error adding buddie:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Add outside buddies
router.post('/addOutsideBuddie', async (req, res) => {
    const {
      buddie_name, buddie_dob, buddie_gender, buddie_contact, buddie_email,
      buddie_profession, buddie_guardian_name, buddie_emergency_contact,
      buddie_id_proof, buddie_bike_no, buddie_photo, buddie_password, buddie_confirm_password, room_no, hostel_id, buddie_doj,approved = false
    } = req.body;
  
    // Set approved status to false for outside buddies
    // const approved = false;
  
    // Validate passwords
    if (buddie_password !== buddie_confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    // Validate hostel_id
    if (!hostel_id) {
      return res.status(400).json({ message: 'Hostel ID is required' });
    }
  
    try {
      // Check if the hostel exists
      const hostel = await Hostel.findById(hostel_id);
      if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }
  
      // Check if a buddie with the same contact already exists in the specified hostel
      const existingBuddie = await Buddie.findOne({ buddie_contact, hostel_id });
      if (existingBuddie) {
        return res.status(400).json({ message: 'Buddie with this contact number already exists in this hostel' });
      }
  
      // Create and save the new outside buddie (skip room vacancy update)
      const newOutsideBuddie = new Buddie({
        buddie_name, buddie_dob, buddie_gender, buddie_contact, buddie_email,
        buddie_profession, buddie_guardian_name, buddie_emergency_contact,
        buddie_id_proof, buddie_bike_no, buddie_photo, buddie_password, hostel_id, room_no, approved // approved is false
      });
      const savedBuddie = await newOutsideBuddie.save();
  
      res.status(201).json(savedBuddie);
    } catch (error) {
      console.error('Error adding outside buddie:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Update Buddies
router.put('/updateBuddie/:id', verifyToken, async (req, res) => {
    const buddieId = req.params.id;
    const {
      buddie_name, buddie_contact, buddie_email,
      buddie_profession, buddie_emergency_contact,
      buddie_id_proof, buddie_bike_no, buddie_photo, hostel_id,
      room_no
    } = req.body;
  
    try {
      // Check if a buddie with the same contact already exists, excluding the current buddie
      const existingBuddie = await Buddie.findOne({ buddie_contact, _id: { $ne: buddieId }, hostel_id });
      if (existingBuddie) {
        return res.status(400).json({ message: 'Buddie with this contact number already exists in this hostel' });
      }
  
      // Find the current buddie
      const currentBuddie = await Buddie.findById(buddieId);
      if (!currentBuddie) {
        return res.status(404).json({ message: 'Buddie not found' });
      }
  
      // Check if the room has changed
      if (room_no && room_no !== currentBuddie.room_no) {
        // Increment vacancy in the old room
        if (currentBuddie.room_no) {
          await Room.findOneAndUpdate(
            { room_number: currentBuddie.room_no, hostel_id },
            { $inc: { room_vacancy: 1 } }
          );
        }
  
        // Decrement vacancy in the new room
        const newRoom = await Room.findOne({ room_number: room_no, hostel_id });
        if (!newRoom) {
          return res.status(404).json({ message: 'New room not found' });
        }
        if (newRoom.room_vacancy <= 0) {
          return res.status(400).json({ message: 'No vacancies available in the specified room' });
        }
  
        await Room.findOneAndUpdate(
          { room_number: room_no, hostel_id },
          { $inc: { room_vacancy: -1 } }
        );
      }
  
      // Prepare updates
      const updates = {
        buddie_name, buddie_contact, buddie_email,
        buddie_profession, buddie_emergency_contact,
        buddie_id_proof, buddie_bike_no, buddie_photo, hostel_id, room_no
      };
  
      // Perform the update
      const updatedBuddie = await Buddie.findOneAndUpdate(
        { _id: buddieId, hostel_id },
        updates,
        { new: true }
      );
  
      if (!updatedBuddie) {
        return res.status(404).json({ message: 'Buddie not found or hostel_id mismatch' });
      }
  
      res.status(200).json(updatedBuddie);
    } catch (error) {
      console.error('Error updating buddie:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
 // Display buddies all 
// router.get('/buddies', verifyToken, async (req, res) => {
//     // Parse page and limit as integers with default values
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const { hostel_id } = req.query;
  
//     // Calculate the number of documents to skip
//     const skip = (page - 1) * limit;
  
//     try {
//       // Fetch approved buddies with the specified hostel_id, sorted by creation date
//       const buddies = await Buddie.find({ hostel_id, approved: true })
//         .sort({ createdAt: -1 }) // Sort by creation date descending
//         .skip(skip)
//         .limit(limit);
  
//       // Count the total number of approved buddies for this hostel
//       const totalBuddies = await Buddie.countDocuments({ hostel_id, approved: true });
//       const totalPages = Math.ceil(totalBuddies / limit);
  
//       if (!buddies || buddies.length === 0) {
//         return res.status(404).json({ message: 'No approved buddies found' });
//       }
  
//       res.status(200).json({
//         buddies,
//         currentPage: page,
//         totalPages,
//         totalBuddies,
//       });
//     } catch (error) {
//       console.error('Error fetching buddies:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  




// API endpoint to fetch buddies
router.get('/buddies', verifyToken, async (req, res) => {
  const { hostel_id } = req.query; // Get hostel_id from the query parameters

  try {
    // Pagination setup
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = req.query.size ? parseInt(req.query.size) : 10;
    const skip = (page - 1) * size;

    // Total count of approved buddies
    const total = await Buddie.countDocuments({ hostel_id, approved: true });

    // Fetch buddies with only specific fields
    const buddies = await Buddie.find({ hostel_id, approved: true })
      .select('buddie_name buddie_dob buddie_gender buddie_contact buddie_email buddie_profession buddie_guardian_name buddie_emergency_contact buddie_bike_no room_no') // Select only specific fields
      .skip(skip)
      .limit(size);

    // Check if buddies are found
    if (!buddies || buddies.length === 0) {
      return res.status(404).json({ message: 'No approved buddies found' });
    }

    // Send response with records and pagination info
    res.json({
      records: buddies,
      total,
      page,
      size,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});







  // display buddie based on id
router.get('/buddie/:id', verifyToken, async (req, res) => {
    try {
      const buddieId = req.params.id;
  
      // Find the buddie by ID and select all fields needed
      const buddie = await Buddie.findById(buddieId).select(
        'buddie_name buddie_contact room_no buddie_dob buddie_gender buddie_email buddie_profession buddie_guardian_name buddie_emergency_contact buddie_id_proof buddie_bike_no buddie_photo buddie_doj rent_due paid_rents approved'
      ).populate('hostel_id', 'hostel_name') // Populate hostel details (if needed)
       .populate('paid_rents'); // Populate payment details (if needed)
  
      if (!buddie) {
        return res.status(404).json({ message: 'Buddie not found' });
      }
  
      res.status(200).json(buddie);
    } catch (error) {
      console.error('Error fetching buddie details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// delete buddie
  router.delete('/deleteBuddie/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { hostel_id } = req.body;
  
    try {
      // Find the buddie to be deleted
      const buddie = await Buddie.findOne({ _id: id, hostel_id });
  
      if (!buddie) {
        return res.status(404).json({ message: 'Buddie not found or unauthorized' });
      }
  
      // Increase the vacancy count in the associated room
      await Room.findOneAndUpdate(
        { room_number: buddie.room_no, hostel_id },
        { $inc: { room_vacancy: 1 } }
      );
  
      // Delete the buddie
      await Buddie.findOneAndDelete({ _id: id, hostel_id });
  
      res.status(200).json({ message: 'Buddie deleted successfully' });
    } catch (error) {
      console.error('Error deleting Buddie:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// unaproved buddie which are in outside
router.get('/unapprovedBuddies', async (req, res) => {
  try {
      // Fetch buddies with `approved` status set to false
      const unapprovedBuddies = await Buddie.find({ approved: false });

      if (!unapprovedBuddies || unapprovedBuddies.length === 0) {
          return res.status(404).json({ message: 'No unapproved buddies found' });
      }

      res.status(200).json(unapprovedBuddies);
  } catch (error) {
      console.error('Error fetching unapproved buddies:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// approved buddies which are in inside
router.put('/approveBuddie/:buddieId', async (req, res) => {
  const { buddieId } = req.params;

  try {
      // Find the Buddie by ID and set `approved` to true
      const approvedBuddie = await Buddie.findByIdAndUpdate(
          buddieId,
          { approved: true },
          { new: true }
      );

      if (!approvedBuddie) {
          return res.status(404).json({ message: 'Buddie not found' });
      }

      res.status(200).json(approvedBuddie);
  } catch (error) {
      console.error('Error approving buddie:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// delete buddie
router.delete('/deleteBuddie/:buddieId', async (req, res) => {
  const { buddieId } = req.params;

  try {
      // Check if buddie exists
      const buddie = await Buddie.findById(buddieId);
      if (!buddie) {
          return res.status(404).json({ message: 'Buddie not found' });
      }

      // Delete the buddie
      await Buddie.findByIdAndDelete(buddieId);
      return res.json({ message: 'Buddie deleted successfully' });
  } catch (error) {
      console.error('Error deleting buddie:', error);
      return res.status(500).json({ message: 'Server error', error });
  }
});

//search buddie
// router.get('/search-buddie', async (req, res) => {
//   const { query } = req.query; // Get the search query from the request

//   if (!query || query.trim() === '') {
//     return res.status(400).json({ message: 'Query is required' });
//   }

//   try {
//     const buddies = await Buddie.find({
//       $or: [
//         { buddie_name: { $regex: query, $options: 'i' } },  // Case insensitive search for name
//         { room_no: { $regex: query, $options: 'i' } },     // Case insensitive search for room number
//         { buddie_contact: { $regex: query, $options: 'i' } } // Case insensitive search for contact
//       ]
//     }).populate('hostel_id', 'hostel_name'); // Populate hostel info if necessary

//     res.json(buddies);
//   } catch (error) {
//     console.error('Failed to search Buddies:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });
router.get('/search-buddie', async (req, res) => {
  const { query, hostel_id } = req.query; // Get both query and hostel_id from the request

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Query is required' });
  }

  if (!hostel_id) {
    return res.status(400).json({ message: 'Hostel ID is required' });
  }

  try {
    const buddies = await Buddie.find({
      hostel_id, // Only match records with the specified hostel_id
      $or: [
        { buddie_name: { $regex: query, $options: 'i' } },  // Case-insensitive search for name
        { room_no: { $regex: query, $options: 'i' } },      // Case-insensitive search for room number
        { buddie_contact: { $regex: query, $options: 'i' } } // Case-insensitive search for contact
      ]
    }).populate('hostel_id', 'hostel_name'); // Populate hostel info if necessary

    res.json(buddies);
  } catch (error) {
    console.error('Failed to search Buddies:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});






// pending requests from buddies counts
router.get('/pendingRequestsCount/:hostelId', async (req, res) => {
  try {
      const { hostelId } = req.params;

      // Count documents where approved is false and hostel_id matches
      const count = await Buddie.countDocuments({ hostel_id: hostelId, approved: false });
      
      res.json({ count });
  } catch (error) {
      console.error('Error fetching pending requests count:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// buddie name only
router.get('/buddieName/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const buddie = await Buddie.findById(id).select('buddie_name');
    if (!buddie) {
      return res.status(404).json({ error: 'Buddie not found' });
    }

    res.json({ name: buddie.buddie_name });
    // console.log(buddie.buddie_name);
  } catch (error) {
    console.error('Error fetching buddie details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ================================================================= FOOD menu ===============================================

// Add new food menu
router.post('/add-foodMenu', verifyToken, async (req, res) => {
  const { hostel_id, food_menu } = req.body;

  try {
    const newFoodMenu = new FoodMenu({ hostel_id, food_menu });
    await newFoodMenu.save();
    res.status(201).json(newFoodMenu);
  } catch (error) {
    console.error('Error adding food menu:', error);
    res.status(500).json({ message: 'Error adding food menu' });
  }
});

// update food menu
router.put('/update-foodMenu/:id', verifyToken, async (req, res) => {
  const { id } = req.params;  // Ensure this is an ObjectId
  const { food_menu } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid food menu ID' });
  }

  try {
    const updatedFoodMenu = await FoodMenu.findByIdAndUpdate(
      id,
      { food_menu },
      { new: true }  // Return the updated document
    );

    if (!updatedFoodMenu) {
      return res.status(404).json({ message: 'Food menu not found' });
    }

    res.status(200).json(updatedFoodMenu);
  } catch (error) {
    console.error('Error updating food menu:', error);
    res.status(500).json({ message: 'Error updating food menu' });
  }
});


// Delete food menu
router.delete('/delete-foodMenu/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ message: 'Invalid food menu ID' });
  // }

  try {
    const deletedFoodMenu = await FoodMenu.findByIdAndDelete(id);

    if (!deletedFoodMenu) {
      return res.status(404).json({ message: 'Food menu not found' });
    }

    res.status(200).json({ message: 'Food menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting food menu:', error);
    res.status(500).json({ message: 'Error deleting food menu' });
  }
});


// Display Food menu
router.get('/FoodMenu/:hostel_id', async (req, res) => {
  try {
    const { hostel_id } = req.params;
    const foodMenus = await FoodMenu.find({ hostel_id });
    res.status(200).json(foodMenus);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching food menus' });
  }
});

// ========================================================= DASHBOARD ==================================================

// main dashboard
router.get('/dashboard', verifyToken, async (req, res) => {
  const { hostel_id } = req.query;

  if (!hostel_id) {
    return res.status(400).json({ message: 'hostel_id is required' });
  }

  try {
    // Verify if the hostel exists
    const hostel = await Hostel.findById(hostel_id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Count the total number of rooms and buddies for the specified hostel
    const totalRooms = await Room.countDocuments({ hostel_id });
    const totalBuddies = await Buddie.countDocuments({ hostel_id });

    // Fetch all rooms for the specified hostel
    const rooms = await Room.find({ hostel_id });

    // Calculate total vacancies by summing up room vacancies
    const totalVacancies = rooms.reduce((acc, room) => acc + (room.room_vacancy || 0), 0);

    // Initialize counts for sharing types and total capacity
    const sharingCounts = {};
    let totalCapacity = 0;

    // Process rooms to calculate counts for each sharing type and total capacity
    rooms.forEach(room => {
      const shareType = room.sharing_type || 1; // Default to 1 if undefined

      // Accumulate the total capacity based on sharing type (capacity per room)
      totalCapacity += shareType;

      // Count the number of rooms for each sharing type
      if (shareType) {
        if (!sharingCounts[shareType]) {
          sharingCounts[shareType] = 0;
        }
        sharingCounts[shareType] += 1;
      }
    });

    // Calculate total occupied spots (total capacity - total vacancies)
    const totalOccupied = totalCapacity - totalVacancies;

    // Send the response with the dashboard data
    res.status(200).json({
      totalRooms,
      totalBuddies,
      totalVacancies,
      totalCapacity,
      totalOccupied,
      sharingCounts,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// top facilities
router.get('/top-facilities', verifyToken, async (req, res) => {
  const { hostel_id } = req.query;

  if (!hostel_id) {
    return res.status(400).json({ message: 'hostel_id is required' });
  }

  try {
    // Fetch the hostel details
    const hostel = await Hostel.findById(hostel_id);

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Count the frequency of each facility
    const facilityCounts = hostel.hostel_facilities.reduce((acc, facility) => {
      acc[facility] = (acc[facility] || 0) + 1;
      return acc;
    }, {});

    // Sort facilities by count and get top 5
    const topFacilities = Object.entries(facilityCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5);

    const formattedFacilities = topFacilities.map(([facility, count]) => ({
      name: facility,
      count
    }));

    res.json({ topFacilities: formattedFacilities });
  } catch (error) {
    console.error('Error fetching top facilities:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ====================================================== PAYMENTS ===================================
// get payments
router.get('/payments/hostel/:hostelId',verifyToken, async (req, res) => {
  try {
    const { hostelId } = req.params;

    // Fetch payments based on hostelId
    const payments = await Payment.find({ hostel_id: hostelId });

    if (!payments) {
      return res.status(404).json({ message: 'No payments found for this hostel.' });
    }

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// updat payments
router.put('/payments/:paymentId/accept', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).send('Payment not found');
    }

    if (payment.status === 'accepted') {
      return res.status(400).send('Payment already accepted');
    }

    payment.status = 'accepted';
    await payment.save();

    res.send('Payment accepted!');
  } catch (error) {
    console.error('Error accepting payment', error);
    res.status(500).send('Server Error');
  }
});



// updat payments
router.put('/payments/:paymentId/reject', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).send('Payment not found');
    }

    if (payment.status === 'rejected') {
      return res.status(400).send('Payment already rejected');
    }

    payment.status = 'rejected';
    await payment.save();

    res.send('Payment rejected!');
  } catch (error) {
    console.error('Error rejecting payment', error);
    res.status(500).send('Server Error');
  }
});


//delete payments
// router.delete('/payments/:paymentId', async (req, res) => {
//   const { paymentId } = req.params;

//   try {
//     const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    
//     if (!deletedPayment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }
    
//     res.status(200).json({ message: 'Payment deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting payment:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// payments counts
router.get('/payments/hostel/:hostelId/pendingCount', async (req, res) => {
  try {
      const { hostelId } = req.params;
      
      // Count payments with 'pending' status for the specified hostel
      const pendingCount = await Payment.countDocuments({
          hostel_id: hostelId,
          status: 'pending'
      });

      res.json({ count: pendingCount });
  } catch (error) {
      console.error('Error fetching pending payments count:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// =================================================== COMPLAINTS =========================================
// complaints display 
router.get('/complaints/:id', async (req, res) => {
  const { id } = req.params;
// console.log('data',id);
  try {

    const hostel = await Hostel.findById(id);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const complaints = await Complaint.find({ hostel_id: id }).populate('buddie_id');
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// resolved complaints
router.patch('/complaints/:id/resolve', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the complaint ID is valid
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: 'Invalid complaint ID' });
    // }

    // Find the complaint by ID
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Check if the complaint is already resolved
    if (complaint.status === 'resolved') {
      return res.status(400).json({ error: 'Complaint is already resolved' });
    }

    // Mark the complaint as resolved
    complaint.status = 'resolved';
    await complaint.save();

    res.json({ message: 'Complaint resolved successfully' });
  } catch (error) {
    console.error('Error resolving complaint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete complaints

// PATCH request to update the complaint status to "rejected"
router.patch('/:complaintId/reject', verifyToken, async (req, res) => {
  const { complaintId } = req.params;

  try {
    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update the status to "rejected"
    complaint.status = 'rejected';

    // Save the updated complaint
    await complaint.save();

    return res.status(200).json({ message: 'Complaint marked as rejected', complaint });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    return res.status(500).json({ message: 'Error updating complaint status', error });
  }
});

// pending complaints counts
router.get('/complaints/hostel/:hostelId/pendingCount', async (req, res) => {
  try {
      const { hostelId } = req.params;
      
      // Count payments with 'pending' status for the specified hostel
      const pendingCount = await Complaint.countDocuments({
          hostel_id: hostelId,
          status: 'pending'
      });

      res.json({ count: pendingCount });
  } catch (error) {
      console.error('Error fetching pending payments count:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// status counts
router.get('/status-count', async (req, res) => {
  const { hostel_id } = req.query; // Extract hostel_id from query parameters

  if (!hostel_id) {
    return res.status(400).json({ message: 'Hostel ID is required' });
  }

  try {
      // Count pending complaints based on hostel_id
      const pendingComplaintsCount = await Complaint.countDocuments({ 
          status: 'pending', 
          hostel_id: hostel_id // Filter by hostel_id
      });
      
      // Count pending payments based on hostel_id
      const pendingPaymentsCount = await Payment.countDocuments({ 
          status: 'pending', 
          hostel_id: hostel_id // Filter by hostel_id
      });
      
      // Count unapproved buddies based on hostel_id
      const unapprovedBuddiesCount = await Buddie.countDocuments({ 
          approved: false, 
          hostel_id: hostel_id // Filter by hostel_id
      });

      // Send the counts as a response
      res.status(200).json({
          pendingComplaints: pendingComplaintsCount,
          pendingPayments: pendingPaymentsCount,
          unapprovedBuddies: unapprovedBuddiesCount
      });
  } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// phone numbers hostels 
router.get('/hostels/phone', verifyToken,async (req, res) => {
  const { phone } = req.query;

  try {
      // Find all hostels with the given phone number
      const hostels = await Hostel.find({ hostel_phone: phone }).select('hostel_name hostel_city hostel_area');

      if (hostels.length === 0) {
          return res.status(404).json({ message: 'No hostels found for this phone number.' });
      }

      // console.log(hostels);
      res.json(hostels);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
});

// payments statistics
router.get('/payment-statistics', async (req, res) => {
  const { hostel_id } = req.query;

  if (!hostel_id) {
    return res.status(400).json({ message: 'Hostel ID is required' });
  }

  try {
    const statistics = await Payment.aggregate([
      { $match: { hostel_id: new mongoose.Types.ObjectId(hostel_id) } }, // Use new keyword
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, // Group by year and month
          totalPayments: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
          acceptedPayments: {
            $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
          },
          pendingPayments: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } } // Sort by month ascending
    ]);

    res.json(statistics);
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/search-complaint', verifyToken, async (req, res) => {
  const { query, hostel_id } = req.query;

  if (!hostel_id) {
    return res.status(400).json({ message: 'hostel_id is required' });
  }

  try {
    // Define initial search criteria based on hostel_id
    const searchCriteria = { hostel_id };

    if (query && query.trim()) {
      // Use `.*` to match any substring within the fields
      const searchRegex = { $regex: `.*${query.trim()}.*`, $options: 'i' };
      searchCriteria.$or = [
        { complaint_name: searchRegex },
        { room_no: searchRegex },
        { 'buddie_id.buddie_name': searchRegex }, // Search within buddie_name (after population)
      ];
    }

    // Perform the query and populate `buddie_id` to access `buddie_name`
    const complaints = await Complaint.find(searchCriteria)
      .populate({ path: 'buddie_id', select: 'buddie_name room_no' });

    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaint data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});






router.get('/search-payment', async (req, res) => {
  const { query, hostel_id } = req.query;

  // Check if the required parameters are present
  if (!query || !hostel_id) {
    return res.status(400).json({ message: 'Query and hostel_id are required' });
  }

  try {
    // Find payments where the buddy's name matches the query and hostel matches hostel_id
    const payments = await Payment.find({ hostel_id })
      .populate({
        path: 'buddie_id',
        match: { buddie_name: { $regex: query, $options: 'i' } }, // Case-insensitive partial match for buddy's name
        select: 'buddie_name room_no', // Retrieve buddy's name and room number
      })
      .populate({
        path: 'hostel_id',
        select: 'hostel_name hostel_City', // Retrieve hostel name and location
      })
      .exec();

    // Filter out payments where `buddie_id` didn't match the search term
    const filteredPayments = payments.filter(payment => payment.buddie_id);

    // Check if there are any matching results
    if (filteredPayments.length === 0) {
      return res.status(404).json({ message: 'No matching payments found' });
    }

    res.json(filteredPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






// Route to get the current vacancy status of a hostel by hostelId
router.get('/getVacancyStatus/:hostelId', async (req, res) => {
  const { hostelId } = req.params;
  
  try {
      // Find the hostel by ID and return only the vacancy status field
      const hostel = await Hostel.findById(hostelId, 'hostel_vacancy_available');
      
      if (!hostel) {
          return res.status(404).json({ message: 'Hostel not found' });
      }

      res.json({ hostel_vacancy_available: hostel.hostel_vacancy_available });
  } catch (error) {
      console.error('Error fetching vacancy status:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});

// Route to toggle the vacancy status of a hostel by hostelId
router.put('/toggleVacancy/:hostelId', async (req, res) => {
  const { hostelId } = req.params;

  try {
      // Find the hostel by ID and toggle the vacancy status
      const hostel = await Hostel.findById(hostelId);
      if (!hostel) {
          return res.status(404).json({ message: 'Hostel not found' });
      }

      hostel.hostel_vacancy_available = !hostel.hostel_vacancy_available;
      await hostel.save();

      res.json({ hostel_vacancy_available: hostel.hostel_vacancy_available });
  } catch (error) {
      console.error('Error toggling vacancy status:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});








// GET endpoint to fetch the hostel_dobey status
router.get('/hostel/dhobi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hostel = await Hostel.findById(id);
    
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.json({ hostel_dhobi: hostel.hostel_dhobi });
  } catch (error) {
    console.error('Error fetching dobey status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// PUT endpoint to update the hostel_dobey status
router.put('/hostel/dhobi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hostel_dhobi } = req.body;

    const updatedHostel = await Hostel.findByIdAndUpdate(
      id,
      { hostel_dhobi },
      { new: true }
    );

    if (!updatedHostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.json(updatedHostel);
  } catch (error) {
    console.error('Error updating dobey status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Define route to check dhobi availability
router.get('/check-dhobi-service', async (req, res) => {
  const { hostel_id } = req.query;

  if (!hostel_id) {
      return res.status(400).json({ message: 'hostel_id is required' });
  }

  try {
      // Find the hostel by hostel_id
      const hostel = await Hostel.findById(hostel_id);

      if (!hostel) {
          return res.status(404).json({ message: 'Hostel not found' });
      }

      // Return the dhobi availability status
      res.json({ has_dhobi: hostel.hostel_dhobi });

  } catch (error) {
      console.error('Error fetching dhobi service availability:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});



// Endpoint to get all clothes based on hostel_id
// router.get('/get-clothes-by-hostel', async (req, res) => {
//   const { hostel_id } = req.query;

//   if (!hostel_id) {
//       return res.status(400).json({ message: 'hostel_id is required' });
//   }

//   try {
//       // Find all clothing records that match the hostel_id
//       const clothes = await Cloths.find({ hostel_id }).sort({ date: -1 }); // Sort by date in descending order

//       res.json(clothes);
//       console.log(clothes);
//   } catch (error) {
//       console.error('Error fetching clothes by hostel_id:', error);
//       res.status(500).json({ message: 'Server error', error });
//   }
// });



// Endpoint to get paginated clothes based on hostel_id
router.get('/get-clothes-by-hostel', verifyToken, async (req, res) => {
  const { hostel_id } = req.query;

  // Check if hostel_id is provided
  if (!hostel_id) {
      return res.status(400).json({ message: 'hostel_id is required' });
  }

  try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const size = req.query.size ? parseInt(req.query.size) : 10;
      const skip = (page - 1) * size;

      // Validate page and size
      if (page < 1 || size < 1) {
          return res.status(400).json({ message: 'Page and size must be greater than 0' });
      }

      // Count the total number of unique records for the specified hostel
      const total = await Cloths.countDocuments({ hostel_id });

      // Find unique clothing records with pagination
      const clothes = await Cloths.find({ hostel_id })
          .sort({ date: -1 })  // Sort by date in descending order
          .skip(skip)
          .limit(size)
          .lean();  // Optional: Convert Mongoose documents to plain objects

      // Remove duplicates based on a unique field (e.g., _id or another relevant field)
      const uniqueClothes = Array.from(new Map(clothes.map(item => [item._id, item])).values());

      // Respond with paginated data, total count, current page, and size
      res.json({
          records: uniqueClothes,
          total,
          page,
          size
      });
  } catch (error) {
      console.error('Error fetching clothes by hostel_id:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});




// router.get('/unpaid-payments/:hostelId', async (req, res) => {
//   try {
//     const hostelId = req.params.hostelId;

//     // Calculate the date range for the last 3 months
//     const threeMonthsAgo = moment().subtract(3, 'months').startOf('month');
//     const currentDate = moment().endOf('month');

//     // Fetch payments where status is NOT 'accepted' and date is within the last 3 months
//     const payments = await Payment.find({
//       hostel_id: hostelId,   // Filter by hostel_id
//       status: { $ne: 'accepted', $ne: 'rejected' },  // Status is NOT 'accepted' or 'rejected'
//       date: {
//         $gte: threeMonthsAgo.toDate(),  // Payments from 3 months ago onwards
//         $lte: currentDate.toDate()      // Payments up to the current date
//       }
//     })
//       .populate('buddie_id', 'buddie_name room_no buddie_contact')  // Populate buddy details (buddie_name, room_no, buddie_contact)
//       .select('buddie_id status amount date');

//     // Map the data to structure the unpaid buddies information
//     const unpaidBuddies = payments.map(payment => ({
//       buddie_name: payment.buddie_id.buddie_name,  // Get buddie_name from populated buddie_id
//       room_no: payment.buddie_id.room_no,  // Get room_no from populated buddie_id
//       buddie_contact: payment.buddie_id.buddie_contact,  // Get buddie_contact from populated buddie_id
//       status: payment.status,
//       amount: payment.amount,
//       unpaid_month: moment(payment.date).format('MMMM YYYY')  // Show month the payment is unpaid for
//     }));

//     // Respond with the unpaid buddy data in a single list
//     res.json({
//       unpaidBuddies
//     });

//   } catch (error) {
//     console.error('Error fetching unpaid payments:', error);
//     res.status(500).json({ error: 'Failed to fetch unpaid payments' });
//   }
// });



// router.get('/unpaid-payments/:hostelId', async (req, res) => {
//   try {
//     const hostelId = req.params.hostelId;

//     // Calculate the date range for the last 3 months
//     const threeMonthsAgo = moment().subtract(3, 'months').startOf('month');
//     const currentDate = moment().endOf('month');

//     // Fetch payments where status is NOT 'accepted' or 'rejected' and date is within the last 3 months
//     const payments = await Payment.find({
//       hostel_id: hostelId,  // Filter by hostel_id
//       status: { $ne: 'accepted', $ne: 'rejected' },  // Status is NOT 'accepted' or 'rejected'
//       date: {
//         $gte: threeMonthsAgo.toDate(),  // Payments from 3 months ago onwards
//         $lte: currentDate.toDate()      // Payments up to the current date
//       }
//     })
//       .populate('buddie_id', 'buddie_name room_no buddie_contact')  // Populate buddy details (buddie_name, room_no, buddie_contact)
//       .select('buddie_id status amount date')
//       .sort({ date: -1 });  // Sort by date descending to get the latest payment first

//     // Group payments by buddy and get the most recent one
//     const unpaidBuddies = [];

//     const buddyPayments = payments.reduce((acc, payment) => {
//       // Use the buddie_id as the key to group payments
//       const buddieId = payment.buddie_id._id.toString();
//       if (!acc[buddieId]) {
//         // If no payment exists for this buddy, initialize it
//         acc[buddieId] = {
//           buddie_name: payment.buddie_id.buddie_name,
//           room_no: payment.buddie_id.room_no,
//           buddie_contact: payment.buddie_id.buddie_contact,
//           last_payment_date: payment.date,
//           status: payment.status,
//           amount: payment.amount
//         };
//       }
//       return acc;
//     }, {});

//     // Convert the grouped data to an array
//     for (const buddieId in buddyPayments) {
//       const buddy = buddyPayments[buddieId];
//       unpaidBuddies.push({
//         buddie_name: buddy.buddie_name,
//         room_no: buddy.room_no,
//         buddie_contact: buddy.buddie_contact,
//         status: buddy.status,
//         amount: buddy.amount,
//         last_payment_date: buddy.last_payment_date ? moment(buddy.last_payment_date).format('MMMM YYYY') : 'NA'  // Show 'NA' if no last payment
//       });
//     }

//     // Respond with the unique unpaid buddies and their last payment date
//     res.json({
//       unpaidBuddies
//     });

//   } catch (error) {
//     console.error('Error fetching unpaid payments:', error);
//     res.status(500).json({ error: 'Failed to fetch unpaid payments' });
//   }
// });




// Endpoint to fetch Buddies based on hostelId
router.get('/payment-buddies', async (req, res) => {
  const { hostelId } = req.query; // Get hostelId from query parameters
  
  if (!hostelId) {
    return res.status(400).json({ message: 'Hostel ID is required' });
  }

  try {
    // Fetch all buddies associated with the provided hostelId
    const buddies = await Buddie.find({ hostel_id: hostelId }).select('buddie_name'); // Select only the buddie_name

    if (buddies.length === 0) {
      return res.status(404).json({ message: 'No buddies found for this hostel' });
    }

    res.json(buddies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching buddies' });
  }
});





// Endpoint to fetch Buddie details
router.get('/payment-details', async (req, res) => {
  const { buddie_name } = req.query; // Query parameter to get the buddie's name
  
  try {
    const buddie = await Buddie.findOne({ buddie_name }); // Find the buddie by name
    if (!buddie) {
      return res.status(404).json({ message: 'Buddie not found' });
    }

    // Assuming rent_amount is part of the Buddie schema or related data
    const { room_no, rent_amount } = buddie; 
    
    res.json({
      buddie_name: buddie.buddie_name,
      buddie_room: room_no,
      rent_amount: rent_amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching buddie details' });
  }
});


router.post('/payments/add-payment', async (req, res) => {
const { buddie_name, rent_amount, payment_date, hostel_id, month } = req.body;

  try {
    // Find the buddie based on name
    const buddie = await Buddie.findOne({ buddie_name });

    if (!buddie) {
      return res.status(404).json({ message: 'Buddie not found' });
    }

    // Check if hostel ID is valid
    const hostel = await Hostel.findById(hostel_id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Create a new payment record
    const newPayment = new Payment({
      buddie_id: buddie._id,
      hostel_id: hostel._id,
      amount: rent_amount,
      date: new Date(payment_date),
      month: month,
      status: 'accepted', // Set the payment status to 'accepted'

    });

    // Save the payment
    await newPayment.save();

    return res.status(201).json({ message: 'Payment added successfully', payment: newPayment });
  } catch (error) {
    console.error('Error adding payment:', error);
    return res.status(500).json({ message: 'Error adding payment', error: error.message });
  }
});





module.exports = router;
