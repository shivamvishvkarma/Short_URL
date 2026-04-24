//const sessionIdToUserMap = new Map();   /*It is statefull to maintain state  but in jwt no need to maintain stete.*/ 
                                          
const jwt = require("jsonwebtoken");

const secret = "Shivam@123#"

// ------------- This code is for statefull--------------------

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user)
// }

// function getUser(id, user) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// };

//----------------------This is jwt code no need to maintain state - stateless----------------

function setUser(user) {
    return jwt.sign({
        _id:  user._id,
        email:  user.email,
        role: user.role,
    },
     secret
    );
};

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } 
    catch (error) {
        return null;
    }
    
};

module.exports = {
  setUser,
  getUser,
};
