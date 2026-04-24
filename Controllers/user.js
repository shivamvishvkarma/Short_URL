const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../Services/auth");

const User = require('../models/user');

async function handleUserSignup (req, res) {
   const {name, email, Passward} = req.body;
   await User.create({
    name,
    email,
    Passward,
   });
   //return res.render("home");
   // or
  return res.redirect("/login");   // for best practice
}
async function handleUserLogin (req, res) {
   const {email, Passward} = req.body;
   const user = await User.findOne({ email, Passward });
   if(!user)
   return res.render("login", {
error: "Invalid Username or Password",
});

// const sessionId = uuidv4();     // non Jwt -> statefull
// setUser(sessionId, user);
// res.cookie("uid", sessionId);
// return res.redirect("/");

 
const token = setUser(user);  // jwt 
 res.cookie("token", token);    // cookies
return res.redirect("/");

//return res.json({ token });

}
module.exports = {
    handleUserSignup,
    handleUserLogin,
};