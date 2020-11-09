// routes/task.route.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity.model");

// require fileUploader
const fileUploader = require("../config/db.cloudinary.js");


//require date-fns
const { format, compareAsc } = require("date-fns");



//DISPLAY  LIST OF ACTIVITIES (tours) ///////////////////////

router.get("/", (req, res, next) => {
  console.log ('Displaying ALL activities')
   Activity.find()
    .then((activities) => {
      res.status(200).json(activities);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: error,
      });
    });
});

// DISPLAY AN ACTIVITY

router.get("/:id", (req, res, next) => {
  console.log ('Displaying ONE SINGLE activity')

  const {id} = req.params;

  Activity.findById(id)
   .then((activities) => {
    res.status(200).send(activities);
   })
   .catch((error) => {
     res.status(500).json({
       errorMessage: error,
     });
   });
});


// UPLOAD IMAGE WHEN CREATING ACTIVITY

router.post("/upload", fileUploader.single("image"), (req, res) => {
    console.log('file is: ', req.file.path)
    console.log ('where is the file?:',req.file)
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({path : req.file.path});
  });


//  CREATE A NEW ACTIVITY (tour) //////////////////////////////

 router.post("/create", (req, res, next) => {
    console.log ('Creating activities')
    //return res.json(true)
  const { name,description, startDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
  console.log ('req.body:',req.body);

  // let photoUrl;
  // if (req.file) {
  //   photoUrl = req.file.path;
  // } else {
  //   photoUrl = req.body.existingImage;
  // }   // console.log('file is: ', req.file)
 
  
  Activity.create({ 
      name, 
      type,
      destination,
      description,
      startDate,
      endDate,
      duration,
      price,
      address,
      photoUrl })

    .then((activity) => {
      res.status(200).send(activity);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        errorMessage: error,
      });
    });
});

//  DELETE ACTIVITY (tour) //////////////////////////////
  
router.delete("/delete/:id", (req, res, next) => {
  console.log ('Deleting activities')
  const { id } = req.params;
  Activity.findByIdAndDelete({ _id: id })
    .then(() => res.status(200).send())
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    })
});


// UPDATE AND EDIT ACTIVITY (tour)
router.post("/update/:id", (req, res, next) => {
   console.log ('I AM UPDATING DATA FROM SERVER')
    const {id } = req.params;
    const { name,type,destination, description, startDate,endDate,duration,price, address,photoUrl } = req.body;
    console.log ('req.params:' ,req.params)
    console.log ('req.body:',req.body)
    Activity.findByIdAndUpdate({
         _id: id }, 
         { name: name, 
           type :type, 
           destination:destination, 
           description: description,
           startDate : startDate,
           endDate: endDate, 
           duration:duration, 
           price:price, 
           address: address, 
           photoUrl: photoUrl },
           { new: true })
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        res.status(400).json({
          errorMessage: error,
        });
      });
  })


// ATTEND AND ACTIVITY


// router.post("/:id", (req, res) => {
//   const { id } = req.params;

//   //const userId = req.session.currentUser._id;

//   Activity.findByIdAndUpdate(
//     id,
//     { $addToSet: { attendees: [req.body.accessToken] } },
//     { new: true }
//   )
//     .then((updatedEvent) => {

//       res.status(200).send();
//       // User.findByIdAndUpdate(
//       //   userId,
//       //   { $addToSet: { activitiesAttending: updatedEvent._id } },
//       //   { new: true }
//       // ).then((updatedUser) => {
//       //   req.session.currentUser = updatedUser;
//       //   res.redirect(`/events/${id}`);
//       //   //console.log("Updated activity: ", updatedActivity);
//       //   //console.log("Updated activity: ", updatedUser);
//       // });
//     })

//     .catch((error) => {
//       console.log("Error while updating activity: ", error);
//       res.status(400).json({
//         errorMessage: error,
//       });
//     });
// });

//SEARCH PAGES //////////////////////////////////

router.post('/search', (req, res) => {
    console.log ('I AM THE SEARCHING ON THE CLIENT SIDE', 'req.body:', req.body)
    const {destination,startDate,endDate,type} = req.body;
    console.log('destination:', destination);

    /*Adding conditional statements in order one, two or 3 parameters had passed, retrieved always a result
      If ony destination is passed        Activity.find({ destination : destination })
      If destination and type is passed   Activity.find({ destination : destination, type : type })
    */

    const findParams = {};

    if (destination !== '') {
      findParams.destination = destination;
    }
    if (type !== '') {
      findParams.type = type;
    }
    // if (startDate !== '') {
    //   findParams.startDate = startDate;
    // }
    // if (endDate !== '') {
    //   findParams.endDate = endDate;
    // }
    
    
    Activity.find(findParams)
      .then((activitiesFromDB) => {
        console.log ('activitiesFromDB:',activitiesFromDB)
        res.status(200).send(activitiesFromDB);
      }) .catch((error) => {
        console.log("Error while searching activities: ", error);
        res.status(400).json({
          errorMessage: error,
        });
        });
      })

module.exports = router;
