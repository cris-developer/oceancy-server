// routes/task.route.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity.model");

// DISPLAY  LIST OF ACTIVITIES (tours) ///////////////////////

// router.get("/activities", (req, res, next) => {
//    Activity.find()
//     .then((activities) => {
//       res.status.json(activities);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         errorMessage: error,
//       });
//     });
// });

// //  CREATE A NEW ACTIVITY (tour) //////////////////////////////

// router.post("/activities", (req, res, next) => {
//   const { name, starDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;

//   Activity.create({ name, starDate,endDate,duration,destination,price,type, address,photoUrl })
//     .then((activity) => {
//       res.status(200).send(activity);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         errorMessage: error,
//       });
//     });
// });

// //  DELETE ACTIVITY (tour) //////////////////////////////
// router.delete("/actvities/:activitiesId", (req, res, next) => {
//   const { activityId } = req.params;
//   Activity.findByIdAndDelete({ _id: activityId })
//     .then(() => res.status(200).send())
//     .catch((error) => {
//       res.status(500).json({
//         errorMessage: error,
//       });
//     });
// });
// // UPDATE AND EDIT ACTIVITY (tour)
// router.put("/actvities/:activityId", (req, res, next) => {
//     const { activityId } = req.params;
//     const { name, starDate,endDate,duration,destination,price,type, address,photoUrl } = req.body;
//     Activity.findByIdAndUpdate({ _id: activityId }, { name: name, starDate: endDate, duration:duration, destination :destination, price:price, type :type, address: address, photoUrl: photoUrl })
//       .then(() => {
//         res.status(200).send();
//       })
//       .catch((error) => {
//         res.status(400).json({
//           errorMessage: error,
//         });
//       });
//   })

module.exports = router;
