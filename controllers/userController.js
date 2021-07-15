// Functions
// Signup, Login , Details
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // 1.Data fetch From body
    const { name, email, password } = req.body;

    // 2.Verify User if Exists or Not
    var user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "User Already Exists" });
    }

    // 3.Creating the new User
    // password =vedant1723
    user = new User({ name, email, password });

    //user.password=vedant1723
    // 4.Password Hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    //user.password=saifj328d1y3n9dny1322d7319t

    //Save the User to DB
    await user.save();

    // 5.Token Generation
    // token = 150 characters random string =>
    // id => token => pass=> Limited time .. isko store krke rkhega
    // token => 1st step => payload
    const payload = {
      user: {
        id: user.id,
      },
    };
    // token => 2nd step => Generating Token
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 36000000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          msg: "User Created!",
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

//signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    var user = await User.findOne({ email });
    if (user) {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.json({ msg: "Incorrect password" });
      } else {
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          process.env.jwtSecret,
          {
            expiresIn: 36000000000,
          },
          (err, token) => {
            if (err) throw err;
            return res.json({
              msg: "User Logged in!",
              user: user,
              token: token,
            });
          }
        );
      }
    } else {
      return res.json({ msg: "User Does not Exists" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
