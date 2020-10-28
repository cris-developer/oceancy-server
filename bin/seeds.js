const mongoose = require('mongoose');
const Destination = require('../models/Destination.model');
const Activity = require('../models/Activity.model');
const User = require('../models/User.model');

//require('dotenv').config();

// require database configuration
//require('dotenv').config();
require('../config/db.config.js');

//FEEDING DESTINATIONS
  const destinations = [
    {
      "name": "Australia",
      "photoUrl": "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3367&q=80",
      "id": "11731993-0604-4bee-80d5-67ad845d0a38"
    },
    {
      "name": "Thailand",
      "photoUrl": "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
      "id": "7dad00f7-3949-477d-a7e2-1467fd2cfc06"
    },
    {
      "name": "Indonesia",
      "photoUrl": "https://images.unsplash.com/photo-1555302549-9695323adeb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1826&q=80",
      "id": "0ad5e441-3084-47a1-9e9b-b917539bba71"
    },
    {
      "name": "Micronesia",
      "photoUrl": "https://images.unsplash.com/photo-1545605583-36e41fbdd27f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80",
      "id": "b497e3c4-50bb-4ae2-912f-eb36802c5bc2"
    },
    {
      "name": "Phillipines",
      "photoUrl": "https://images.unsplash.com/photo-1551776315-d69681c7701f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
      "id": "0067ae32-97b6-4431-898e-eb1c10150abb"
    },
    {
      "name": "Malaysia",
      "photoUrl": "https://images.unsplash.com/photo-1595144593798-8f7e34c157aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2688&q=80",
      "id": "fd998a8f-1c9f-4ad8-8a03-45f93b630aa1"
    },
    {
      "name": "Maldives",
      "photoUrl": "https://images.unsplash.com/photo-1592393379989-875c10e36d27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
      "id": "0df01b3e-9cb9-498a-91c2-25435fa3bfed"
    },
    {
      "name": "Egypt",
      "photoUrl": "https://image.tmdb.org/t/p/w500/uQYUfGvOZkB5x25Z19UeyLABHmr.jpg",
      "id": "09178713-ca9d-4657-a570-51d6f6459f57"
    },
    {
      "name": "Brazil",
      "photoUrl": "https://images.unsplash.com/photo-1585904136675-bb3ef60e134d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
      "id": "48094f0e-1d16-4825-aae6-4888c065c6d7"
    },
    {
      "name": "Belize",
      "photoUrl": "https://images.unsplash.com/photo-1585540036061-a57122a5aa3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3634&q=80",
      "id": "56792412-8fda-4e10-b5ec-9cade83b167d"
    },
    {
      "name": "Greece",
      "photoUrl": "https://image.tmdb.org/t/p/w500/ygzDi7DIY6fHHxAcxvS7Z5kMFHe.jpg",
      "id": "b6e09d8d-b58e-48fe-9e07-1460b1e1d22b"
    },
    {
      "name": "Croatia",
      "photoUrl": "https://image.tmdb.org/t/p/w500/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg",
      "id": "32ec545d-4939-403a-acd7-dd4bca6e94dd"
    },
    {
      "name": "Balearics",
      "photoUrl": "https://image.tmdb.org/t/p/w500/cPuPt6mYJ83DjvO3hbjNGug6Fbi.jpg",
      "id": "1599707e-5f49-4529-b920-db3831419b04"
    },
    {
      "name": "Galicia",
      "photoUrl": "https://image.tmdb.org/t/p/w500/oPIfGm3mf4lbmO5pWwMvfTt5BM1.jpg",
      "id": "fef2ac16-36df-486d-8d69-41f1bafa8101"
    },
    {
      "name": "Seychelles",
      "photoUrl": "https://image.tmdb.org/t/p/w500/cke0NNZP4lHRtOethRy2XGSOp3E.jpg",
      "id": "5133d421-dc81-4e3a-81fa-57816da7ce60"
    },
    {
      "name": "French Rivera",
      "photoUrl": "https://image.tmdb.org/t/p/w500/oOqun0BhA1rLXOi7Q1WdvXAkmW.jpg",
      "id": "1144413a-4d60-45e4-a51e-ec9ad321d835"
    },
    {
      "name": "New Zealand",
      "photoUrl": "https://image.tmdb.org/t/p/w500/hCe4MEgugU33IdvDtDkJ6E5siqx.jpg",
      "id": "711c69fe-4f64-453d-853a-05f40d004302"
    },
    {
      "name": "Annapolis",
      "photoUrl": "https://image.tmdb.org/t/p/w500/wNcm8RiMYlWvneAkqQepkqI6r7L.jpg",
      "id": "da6a1201-e933-47dd-87aa-997ce69ff273"
    },
    {
      "name": "Hawaii",
      "photoUrl": "https://image.tmdb.org/t/p/w500/h8bn6ybR5Hu58UGJGwb66nrOagV.jpg",
      "id": "13872be0-b664-4e7b-a774-acdf0d713860"
    },
    {
      "name": "Tarifa",
      "photoUrl": "https://image.tmdb.org/t/p/w500/tlkDiLn2G75Xr7m1ybK8QFzZBso.jpg",
      "id": "39c8bc64-6b0b-4473-8781-a9ea1c1f51d9"
    }
    
    
]

Destination.create(destinations)
  .then(destinationsFromDB => {
    console.log(`Created ${destinationsFromDB.length} destinations`);
    //smongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating destinations: ${err}`));

// FEEDING ACTIVITIES
  const activities = [
    {
      "name": "Diving in Maldives",
      "photoUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
      "description": "Enjoy diving in the Maldives",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Diving",
      "address":"Elm Street",
      "destination":"Maldives",
      
    },
    {
      "name": "Sailing in San Francisco",
      "photoUrl": "https://images.unsplash.com/photo-1584306685839-fae268b3b648?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1948&q=80",
      "description": "Enjoy sailing  in the Pacific",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"60 $",
      "type":"Sailing",
      "address":"98 Beach Rd, Belvedere Tiburon, CA 94920,USA",
      "destination":"San Francisco",
      
    },
      {"name": "Surfing in Hawai",
      "photoUrl": "https://images.unsplash.com/photo-1476574898132-040f50db0a01?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "description": "Enjoy surfing in Hawai",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"40 $",
      "type":"Surfing",
      "address":"Waikiki Beach",
      "destination":"Hawai",
      
    },
    { "name": "Kite Surf in Tarifa",
      "photoUrl": "https://images.unsplash.com/photo-1578060124065-41f863eb9ebe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "description": "Enjoy kite surfing in Hawaii",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Kite Surfing",
      "address":"Av. Fuerza Armadas, s/n, 11380 Tarifa, Cádiz",
      "destination":"Tarifa",
      
    },
    { "name": "Sailing Maldives",
      "photoUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
      "description": "Enjoy diving in the Maldives",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Sailing",
      "address":"Elm Street",
      "destination":"Maldives",
      
    },
    { "name": "Sailing Maldives",
      "photoUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
      "description": "Enjoy diving in the Maldives",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Sailing",
      "address":"Elm Street",
      "destination":"Maldives",
     
    },
    { "name": "Sailing Maldives",
      "photoUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
      "description": "Enjoy diving in the Maldives",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Sailing",
      "address":"Elm Street",
      "destination":"Maldives",
      
    },
    {
      "name": "Kite Surfing in South Africa",
      "photoUrl": "https://images.unsplash.com/photo-1564499504739-bc4fc2ae8cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2690&q=80",
      "description": "",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Kite Surfing",
      "address":"Elm Street",
      "destination":"South Africa",
      
    },
    {
      
      "name": "Sailing Maldives",
      "photoUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
      "description": "Enjoy diving in the Maldives",
      "startDate":"2020-02-13T18:58:56.267Z",
      "endDate":"2020-02-13T18:58:56.267Z",
      "duration": "180 min",
      "price":"30 €",
      "type":"Sailing",
      "address":"Elm Street",
      "destination":"Maldives",
      
    },
    
    
]

Activity.create(activities)
  .then(activitiesFromDB => {
    console.log(`Created ${activitiesFromDB.length} activities`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating activities: ${err}`));
