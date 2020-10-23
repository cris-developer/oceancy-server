// routes/task.route.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity.model");

//DISPLAY  LIST OF ACTIVITIES (tours) ///////////////////////

router.get("/", (req, res, next) => {
   Activity.find()
    .then((activities) => {
      res.status.json(activities);
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    });
});

// DISPLAY AN EVENT





//  CREATE A NEW ACTIVITY (tour) //////////////////////////////

router.post("/create", (req, res, next) => {
    console.log ('Creating activities')
  const { name, starDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
  
  const id = req.session.currentUser._id;
  
  Activity.create({ 
      name, 
      starDate,
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
      res.status(500).json({
        errorMessage: error,
      });
    });
});

//  DELETE ACTIVITY (tour) //////////////////////////////
router.delete("/:id", (req, res, next) => {
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
router.put("/:id", (req, res, next) => {
    const { activityId } = req.params;
    const { name, starDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
    Activity.findByIdAndUpdate({
         _id: id }, 
         { name: name, 
           starDate: endDate, 
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
