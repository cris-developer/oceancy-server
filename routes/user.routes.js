// routes/auth.routes.js

const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");

// require fileUploader
const fileUploader = require("../config/db.cloudinary.js");

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() route ==> to process form data
router.post("/signup", (req, res, next) => {
  //const {!fullName || !email || !password || favorite Activity || experience)}
  const { fullName, email, password } = req.body;
  // !fullName || !email || !password || favorite Activity || experience)
  if (!fullName || !email || !password) {
    res.status(200).json({
      errorMessage:
        "All fields are mandatory. Please provide your full name, email and password.",
    });
    return;
  }

  // make sure passwords are strong:

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(200).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        // fullName: fullName
        fullName,
        email,
        // password => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword,
      });
    })
    .then((user) => {
      Session.create({
        userId: user._id,
        createdAt: Date.now(),
      }).then((session) => {
        res.status(200).json({ accessToken: session._id, user });
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(200).json({ errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(200).json({
          errorMessage:
            "Username and email need to be unique. Either full name or email is already used.",
        });
      } else {
        res.status(500).json({ errorMessage: error });
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() login route ==> to process form data
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(500).json({
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(200).json({
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        Session.create({
          userId: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(200).json({ accessToken: session._id, user });
        });
      } else {
        res.status(200).json({ errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => res.status(500).json({ errorMessage: err }));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("/logout", (req, res) => {
  Session.deleteOne({
    userId: req.body.accessToken,
  })
    .then((session) => {
      res.status(200).json({ success: "User was logged out" });
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
});

router.get("/session/:accessToken", (req, res) => {
  const { accessToken } = req.params;
  Session.findById({ _id: accessToken }).populate("userId").then((session) => {
    if (!session) {
      res.status(200).json({
        errorMessage: "Session does not exist",
      });
    } else {
      res.status(200).json({
        session
      });
    }
  })
  .catch(err => res.status(500).json({errorMessage: err}))
});


// GET USER PROFILE/////


router.get("/profile/:accessToken", (req, res, next) => {
  console.log ('Displaying ONE profile')
  //const accessToken = session._id;
  // const user = user._id
  const {accessToken} = req.params;

  Session
  .findById({ _id: accessToken })
  .then((session) => {
        User.findById(session.userId) //getting the user from the session
        .then((userFromDB) => {
        res.status(200).json(userFromDB);
        })
        .catch((error) => {
          res.status(500).json({
            errorMessage: error,
          });
        });
    })
  })



// EDIT USER PROFILE //

router.post("/profile/edit/:id", (req, res, next) => {

    console.log ('I AM UPDATING MY PROFILE FROM SERVER SIDE')
  const { fullName, email,password,favoriteActivity,level,photoUrl } = req.body;
    console.log ('req.body:',req.body)
  const {id} = req.params;
    console.log ('id:',id)
  
  Session
    .findById({ _id: id })
    .then((session) => {
      console.log ('IAM THE SESSION ON THE UPDATE ID:',session)

      User
        .findByIdAndUpdate(
          {
            _id: session.userId }, 
          {
            fullName: fullName, 
            email : email,
            password: password, 
            favoriteActivity:favoriteActivity, 
            level: level,
            photoUrl: photoUrl
          },
          { new: true }
        )
        .then((userFromDB) => {
          console.log ('userFromDB:',userFromDB)
          res.status(200).json(userFromDB);
        })
        .catch((error) => {
          res.status(500).json({
            errorMessage: error,
          });
        });
        
    }) 
    
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    });
});


 //UPLOADING IMAGE WHEN  EDITING A PROFILE

 router.post("/upload", fileUploader.single("image"), (req, res) => {
  console.log('file is: ', req.file.path)
  console.log ('where is the file?:',req.file)
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({path : req.file.path});
});

 
// DELETE PROFILE //

router.delete("/delete/:id/profile", (req, res, next) => {
  console.log ('Deleting my profile')
  const { id } = req.params;
  User.findByIdAndDelete({ _id: id })
    .then(() => res.status(200).send())
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    });
});


  module.exports = router;