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

// ¿ha de ser esa ruta o activity?
router.post("/upload", fileUploader.single("image"), (req, res) => {
    console.log('file is: ', req.file.secure_url)
    
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({securle_url: req.file.secure_url});
    

     // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    //res.json({ secure_url: req.file.secure_url });
    //res.json({securle_url: req.file.secure_url}); // o res.json (req.file.path)
});

 // console.log('file is: ', req.file)

//  CREATE A NEW ACTIVITY (tour) //////////////////////////////

router.post("/create", (req, res, next) => {
    console.log ('Creating activities')
    //return res.json(true)
  const { name, startDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
  console.log ('req.body:',req.body);

  // let photoUrl;
  // if (req.file) {
  //   photoUrl = req.file.path;
  // } else {
  //   photoUrl = req.body.existingImage;
  // }   // console.log('file is: ', req.file)
 
      console.log ('photoUrl:', photoUrl)
    
  Activity.create({ 
      name, 
      startDate,
       endDate,
      duration,
      destination,
      price,
      type,
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
    });
});
// UPDATE AND EDIT ACTIVITY (tour)
router.post("/update/:id", (req, res, next) => {
   console.log ('I AM UPDATING DATA FROM SERVER')
    const {id } = req.params;
    const { name, startDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
    console.log ('req.params:' ,req.params)
    console.log ('req.body:',req.body)
    Activity.findByIdAndUpdate({
         _id: id }, 
         { name: name, 
           startDate : startDate,
           endDate: endDate, 
           duration:duration, 
           destination :destination, 
           price:price, 
           type :type, 
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
    const {destinations,startDate,endDate,type} = req.body;
    console.log('destinations:', destinations);
    
    Activity.find({ destination:destinations,type:type,startDate: startDate,endDate:endDate})
    // startDate:startDate,endDate:endDate,type: type 
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
