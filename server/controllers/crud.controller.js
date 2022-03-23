const User = require("../models/crudSchema");

// POST METHOD | Crate user

const createPost = async (req, res) => {
  // console.log(req.body);
  const { name, email, age, mobile, work, address, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !address || !desc) {
    res.status(404).json("Please fill the field");
  }

  try {
    const preUser = await User.findOne({ email: email });
    // console.log(preUser);

    if (preUser) {
      res.status(404).json("Email already exist");
    } else {
      const addUser = new User({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      });
      // save user
      await addUser.save();
      res.status(201).json("User Register Successful");
      // console.log(addUser);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

// get all user | for client home page

const getUser = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
    console.log(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

// get individual data

const individualData = async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const singleUser = await User.findById({ _id: id });
    console.log(singleUser);
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    console.log(deletedUser);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// export
module.exports = {
  getUser,
  createPost,
  individualData,
  updateData,
  deleteUser,
};
