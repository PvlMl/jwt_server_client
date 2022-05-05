const User = require("./models/users");
const Token = require("./models/tokens")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {accesKey, refreshKey} = require("./config");


const generateAccesToken = (username, id) => {
return jwt.sign({username, id }, accesKey, {expiresIn: 60 * 60})
};

const generateRefreshToken = (username, id) => {
  return jwt.sign({username, id }, refreshKey, {expiresIn: 60 * 60})
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
      if(!username) return res.status(400).json({message:"empty username"});
      const user = await User.findOne({username});
      if(!user) return res.status(400).json({message:"user not found"});
      if(!bcrypt.compareSync(password, user.password)) return res.status(400).json({message:"Incorrect password"});
      else {
        const id = user._id;
        const payload = [username, id];
        const accesToken = generateAccesToken(...payload);
        
        const refreshToken = generateRefreshToken(...payload);
        const tokenData = await Token.findOne({user: id});
        if (tokenData) {
          tokenData.refreshToken = refreshToken;
          return tokenData.save();
         }
         const token = await Token.create({user: id, refreshToken});
         res.cookie('refreshToken', token, {maxAge: 30 * 24 * 60 * 60 * 1000})

        res.status(200).json({accesToken, message: 'You are logged in'});
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
