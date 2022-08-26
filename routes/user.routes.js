const router = require("express").Router();
const User = require("../models/User.model");

// finds user by username

router.get("/profile/:username", (req, res, next) => {
  const username = req.params;
  console.log(username);

  User.findOne(username)
  .then((response) => console.log(response))
  .catch(err => console.log(err))

/*   const findOneUser = async () => {
    try {
      let response = await User.findOne({'username': {"$ne": 'username'}});
      console.log(response);
      res.json(response);
    } catch (error) {
      res.json(error);
    }
  };
  findOneUser(); */
});

//edit user

router.put("/profile/:username/edit", (req, res, next) => {
  const { username } = req.params;
  const { name, surname, password, email } = req.body;
  const findToUpdate = async () => {
    try {
      let response = await User.findOneAndUpdate(
        username,
        { name, surname, password, email },
        { new: true }
      );
      res.status(201).json(findToUpdate);
    } catch (error) {
      res.json(error);
    }
  };
  findToUpdate();
});

//delete user

router.delete("/profile/:username/delete", (req, res, next) => {
  const { username } = req.params;

  const deleteUser = async () => {
    try {
      let response = await User.findOneAndDelete(username);
      res
        .status(200)
        .json({
          message: `The user with username ${username} was successfully deleted from the database.`,
        });
    } catch (error) {
      res.json(error);
    }
  };
  deleteUser();
});

module.exports = router;
