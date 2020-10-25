// routes/task.route.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity.model");

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


//  CREATE A NEW ACTIVITY (tour) //////////////////////////////

router.post("/create", (req, res, next) => {
    console.log ('Creating activities')
    //return res.json(true)
  const { name, startDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
  console.log ('req.body:',req.body);
 Activity.create({ 
      name, 
      //startDate,
     // endDate,
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
router.delete("/:id", (req, res, next) => {
  console.log ('Deleting activities')
  const { activityId } = req.params;
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
           startDate: endDate, 
           duration:duration, 
           destination :destination, 
           price:price, 
           type :type, 
           address: address, 
           photoUrl: photoUrl })
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


router.post("/:id", (req, res) => {
  const { id } = req.params;

  const userId = req.session.currentUser._id;

  Activity.findByIdAndUpdate(
    id,
    { $addToSet: { attendees: [userId] } },
    { new: true }
  )
    .then((updatedEvent) => {

      res.status(200).send();
      // User.findByIdAndUpdate(
      //   userId,
      //   { $addToSet: { activitiesAttending: updatedEvent._id } },
      //   { new: true }
      // ).then((updatedUser) => {
      //   req.session.currentUser = updatedUser;
      //   res.redirect(`/events/${id}`);
      //   //console.log("Updated activity: ", updatedActivity);
      //   //console.log("Updated activity: ", updatedUser);
      // });
    })

    .catch((error) => {
      console.log("Error while updating activity: ", error);
      res.status(400).json({
        errorMessage: error,
      });
    });
});

// FILTERED PAGES //////////////////////////////////

// router.get("/filter/:type", (req, res) => {
//     const { type } = req.params;
  
//     Event.find({ type: type })
//       .then((eventsFromDB) => {
//         res.render("events/events-filtered-list", {
//           events: eventsFromDB,
//           type: type,
//         });
//       })
//       .catch((error) => console.log("Error retrieving filtered events: ", error));
//   });


module.exports = router;
