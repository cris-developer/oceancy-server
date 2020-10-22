const mongoose = require('mongoose');
const Event = require('../models/Event.model');
const Destination = require('../models/Destination.model');
const User = require('../models/User.model');

require('dotenv').config();

// require database configuration
require('dotenv').config();
require('../config/db.config.js');


const destinations = [
    {
        name: 'Thailand',
        photoUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' 
    },
    {
        name: 'Greece',
        photoUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'  
    },
    {
        name: 'Croatia',
        photoUrl: 'https://images.unsplash.com/photo-1571173729436-98de522c64dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
        name: 'Balearics',
        photoUrl: 'https://images.unsplash.com/photo-1546375982-c22276aa12f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2130&q=80' 
    },
    {
        name: 'Stockholm',
        photoUrl: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
        name: 'Seville',
        photoUrl: 'https://images.unsplash.com/photo-1588328355754-b78ad593d6c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
        name: 'Sydney',
        photoUrl: 'https://images.unsplash.com/photo-1506374322094-6021fc3926f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2212&q=80' 
    },
    {
        name: 'Paris',
        photoUrl: 'https://images.unsplash.com/photo-1541264161754-445bbdd7de52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
    },
    {
        name: 'New York',
        photoUrl: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2360&q=80'
    }
]

Destination.create(destinations)
  .then(destinationsFromDB => {
    console.log(`Created ${destinationsFromDB.length} destinations`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating destinations: ${err}`));
