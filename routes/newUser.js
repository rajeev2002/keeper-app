const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const newUser = new User({});

    const data = await newUser.save();

    res.status(200).json(data._id);
  } catch (err) {
    res.status(404).send("Error occured while creating new user.");
  }
});

module.exports = router;
