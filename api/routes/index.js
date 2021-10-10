const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth");
const Favs = require("../models/Favs");
const S = require("sequelize");

// Register
router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { full_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && full_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where:{email} });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      full_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user.id, email },
      // process.env.TOKEN_KEY,
      "cualquiera",
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

  
  // Login
router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where:{email} });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        "cualquiera",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});


router.get("/welcome", auth,  (req, res) => {
  res.status(200).send(`Welcome ${req.user.user_id}` );
});


router.get("/favourites", auth, (req,res)=>{
  Favs.findAll({where:{userId: req.user.user_id}})
  .then(favourites=>res.status(200).json(favourites))
})

router.post("/favourites", auth,(req,res)=>{
  Favs.create({
    userId: req.user.user_id,
    movieId: req.body.movieId
  }).then(function () {
    return res.status(200).json({ message: "added to favourites" });
  }).catch(S.ValidationError, function (msg) {
    return res.status(400).json( msg );
  }).catch(function (err) {
    return res.status(422).send(err.errors);
  })
})



module.exports = router;