const User = require("./models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");


const generateAccesToken = (username, password) => {
return jwt.sign({username, password }, secret, {expiresIn: '24h'})
};


module.exports = {
  registration: async (req, res) => {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        res.status(400).json({ message: "This username already exist" });
        return;
      }
      const hashPassword = bcrypt.hashSync(password, 3);
      const user = new User({username, password: hashPassword});
      await user.save();
      res.status(200).json({message: 'User added'});
      return;
    } catch (e) {
      console.log(e);
      res.status(400).json("error occurred");
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if(!username) return res.status(400).json("empty username");
      const user = await User.findOne({username});
      if(!user) return res.status(400).json("user not found");
      if(!bcrypt.compareSync(password, user.password)) return res.status(400).json("Incorrect password");
      else {
        const token = generateAccesToken(username, user.password);
        res.status(200).json({token, message: 'You are logged in'});
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(400).json("error occurred");
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.find({username: req.user.username});
      const userData = {id: user[0]._id, username: user[0].username}
      res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(400).json("error occurred");
    }
  },
};
