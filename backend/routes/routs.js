// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const Hostel = require('../models/adminModels/Hostel'); // Assuming your model is in the models folder
const Rating = require('../models/adminModels/Rating');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Make sure to provide the correct path
const FoodMenu = require('../models/adminModels/FoodMenu');



// Get items with pagination based on city
router.get('/hostels', async (req, res) => {
  const { city } = req.query; // Get city from the query parameters


  // Check if city is provided
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = req.query.size ? parseInt(req.query.size) : 10;
    const skip = (page - 1) * size;

    // Fetch total count of documents with the specified city
    const total = await Hostel.countDocuments({ hostel_city: city });

    // Fetch hostels based on city, with pagination
    const hostels = await Hostel.find({ hostel_city: city }).skip(skip).limit(size);

    // Check if no hostels were found
    if (hostels.length === 0) {
      return res.status(404).json({ message: 'No hostels found' });
    }

    if (!hostels.length) {
      return res.status(404).json({ message: 'No hostels found' });
    }

    // Return the hostels and pagination information
    // console.log(hostels);
    res.json({
      records: hostels,
      total,
      page,
      size
    });

  } catch (error) {
    // console.error('Error fetching hostels:', error);
    console.log('Error Fetchig Hostels.')
    res.status(500).json({ message: 'Server error', error });
  }
});




// Fetch available areas (for filter options)
router.get('/areas', async (req, res) => {
    try {
        const areas = await Hostel.distinct('hostel_area'); // Assuming 'hostel_area' is the field in your model
        res.json({ areas: areas.map(area => ({ _id: area, name: area })) });
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




// Route to get hostel details by ID
router.get('/hostel/:id', async (req, res) => {
    try {
        const hostelId = req.params.id;
        const hostel = await Hostel.findById(hostelId);

        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }

        res.status(200).json(hostel);
        // console.log(hostel);
    
    } catch (error) {
        console.error('Error fetching hostel details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Get overall rating for a specific hostel
router.get('/hostel-rating/:hostelId', async (req, res) => {
    const { hostelId } = req.params;

    try {
        // Fetch all ratings for the given hostel
        const ratings = await Rating.find({ hostel_id: hostelId });

        if (ratings.length === 0) {
            return res.status(404).json({ message: 'No ratings found for this hostel' });
        }

        // Calculate averages for each category
        const averages = {
            security: 0,
            food: 0,
            facilities: 0,
            value_for_money: 0,
            cleanliness: 0,
        };

        ratings.forEach(rating => {
            averages.security += rating.security;
            averages.food += rating.food;
            averages.facilities += rating.facilities;
            averages.value_for_money += rating.value_for_money;
            averages.cleanliness += rating.cleanliness;
        });

        const totalRatings = ratings.length;
        for (let key in averages) {
            averages[key] = (averages[key] / totalRatings).toFixed(1); // Average for each category
        }

        // Calculate the overall average rating
        const overallRating = (
            (parseFloat(averages.security) +
                parseFloat(averages.food) +
                parseFloat(averages.facilities) +
                parseFloat(averages.value_for_money) +
                parseFloat(averages.cleanliness)) / 5
        ).toFixed(1);

        res.json({ averages, overallRating });
    } catch (error) {
        console.error('Error fetching hostel ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/search-hostel', async (req, res) => {
    const { query } = req.query; // Retrieve query and optional hostel_type from the request
  
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      const hostels = await Hostel.find({
        $or: [
          { hostel_name: { $regex: query, $options: 'i' } },  // Case-insensitive search for hostel name
          { hostel_city: { $regex: query, $options: 'i' } },   // Case-insensitive search for city
          { hostel_area: { $regex: query, $options: 'i' } }    // Case-insensitive search for area
        ]
      });
  
      res.json(hostels);
    } catch (error) {
      console.error('Failed to search hostels:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

  


  router.get('/hostels/filter', async (req, res) => {
    try {
      const { minPrice, maxPrice, type, amenities } = req.query;
      // console.log("Query parameters received:", req.query);  // Log received query params

      const filter = {};
  
      // Price range filter
      if (minPrice || maxPrice) {
        filter.sharing_prices = {
          $elemMatch: {
            ...(minPrice ? { price: { $gte: Number(minPrice) } } : {}),
            ...(maxPrice ? { price: { $lte: Number(maxPrice) } } : {})
          }
        };
      }
  
      if (type) filter.hostel_type = type;
      // if (area) filter.hostel_area = area;
  
      // Amenities filter (split into array if it's a comma-separated string)
      if (amenities) {
        const amenitiesArray = amenities.split(',').map(a => a.trim()).filter(a => a);
        if (amenitiesArray.length > 0) {
          filter.hostel_facilities = { $in: amenitiesArray };
        }
      }
  
      const hostels = await Hostel.find(filter);
      // console.log(`Number of hostels found: ${hostels.length}`);
      res.json({ success: true, data: hostels });
    } catch (error) {
      console.error('Error fetching hostels:', error);
      res.status(500).json({ message: 'Error fetching hostels', error });
    }
  });
  
  


  // Get comments for a specific hostel
router.get('/hostel-comments/:hostelId', async (req, res) => {
  const { hostelId } = req.params;

  try {
      // Fetch all ratings for the given hostel and retrieve only the comments
      const ratings = await Rating.find({ hostel_id: hostelId }, 'comment createdAt');

      if (ratings.length === 0) {
          return res.status(404).json({ message: 'No comments found for this hostel' });
      }

      // Extract comments with additional information if needed
      const comments = ratings
          .filter(rating => rating.comment && rating.comment.trim()) // Only include non-empty comments
          .map(rating => ({
              comment: rating.comment,
              createdAt: rating.createdAt,
          }));

      if (comments.length === 0) {
          return res.status(404).json({ message: 'No comments found for this hostel' });
      }

      res.json({ comments });
  } catch (error) {
      console.error('Error fetching hostel comments:', error);
      res.status(500).json({ message: 'Server error' });
  }
});







router.get('/FoodMenu/:hostel_id', async (req, res) => {
  try {
    const { hostel_id } = req.params;
    const foodMenu = await FoodMenu.findOne({ hostel_id }, 'food_menu'); // Retrieve only the food_menu field

    if (!foodMenu) {
      return res.status(404).json({ message: 'No food menu available for this hostel' });
    }

    res.status(200).json(foodMenu.food_menu); // Return only the image data
    // console.log(foodMenu.food_menu)
  } catch (error) {
    console.error('Error fetching food menu:', error);
    res.status(500).json({ error: 'Error fetching food menu' });
  }
});




module.exports = router;
