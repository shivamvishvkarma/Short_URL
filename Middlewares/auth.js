const { redirect } = require("express/lib/response");
const {getUser} = require("../Services/auth");

//     authorization video .....
function checkForAuthentication(req, res, next){
    const tokenCookie  = req.cookies?.token;
    req.user = null;

if(!tokenCookie)return next();

 const token = tokenCookie;
 const user  = getUser(token); 

 req.user = user;
 return next();
};

function restrictTo (roles = []){
return function (req, res, next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
};

}
module.exports = {
checkForAuthentication,
restrictTo,
};


// jwt cookie and authentication video
// async function restrictToLoggedinUserOnly(req, res, next) {
//     // const UserId  = req.cookies?.uid;    // cookies method

//     const UserId  = req.headers["authorization"];  // response method

//     // if(!UserId) return res.redirect("/login");
//     //  const user = getUser(UserId);             // cookies method
    
//     if(!UserId) return res.redirect("/login");    
//     const token = UserId.split("Bearer ")[1]; // "Bearer [56734jsdgjdskfd]"" // response method
//     const user = getUser(token);    



//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();

// }

// async function checkAuth(req, res, next) {
//     // const UserId  = req.cookies?.uid;          // cookies 
//     // const user = getUser(UserId);

//      const UserId  = req.headers["authorization"];
//      const token = UserId.split("Bearer ")[1];
//      const user = getUser(token);


//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedinUserOnly,
//     checkAuth,
// };