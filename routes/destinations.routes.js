// routes/task.route.js
const { Router } = require("express");
const router = new Router();
//const express = require("express");
//const router = express.Router();
const Destination = require("../models/Destination.model");

// DISPLAY DESTINATION LIST ///////////////
router.get("/", (req, res, next) => {
  console.log ('STEP 1');
  Destination.find()
    .then((destinations) => {
      res.status.json(destinations);
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    });
});

// FUTURE ADMON PERMISSIONS
// router.post("/", (req, res, next) => {
//   const { title, body } = req.body;
//    Destination.create({ title, body })
//     .then((destination) => {
//       res.status(200).send(destination);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         errorMessage: error,
//       });
//     });
// });
// router.delete("/:destinationId", (req, res, next) => {
//   const { taskId } = req.params;
//   Destination.findByIdAndDelete({ _id: destinationId })
//     .then(() => res.status(200).send())
//     .catch((error) => {
//       res.status(500).json({
//         errorMessage: error,
//       });
//     });
// });

// router.put("/:taskId", (req, res, next) => {
//     const { taskId } = req.params;
//     const { title, body } = req.body;
//     Destination.findByIdAndUpdate({ _id: taskId }, { title: title, body: body })
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
