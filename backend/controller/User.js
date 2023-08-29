const userRouter = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// add a new user
userRouter.post("/", async (req, res) => {
  const saltRounds = 10;
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
      username,
      hashedPassword: hash,
    });
    const newUserEntry = await newUser.save();
    res.status(201).send(newUserEntry);
  });
  res.status(400).send("Error encountered when adding new user");
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // find that user from the DB
  const user = await User.findOne({ username });
  const match = await bcrypt.compare(password, user.hashedPassword);

  if (match) {
    res.status(200).send(match);
  } else {
    res.status(400).send(match);
  }
});

module.exports = userRouter;
