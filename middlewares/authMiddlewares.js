// Import Depandencies...
const passport = require("passport")
require("../services/passport")(passport);

// Middleware for Protecting routes...
const requireAuth = (req, res, next) => {
    if(req.user) {
        console.log(req.user);
        next();
    } else {
        res.redirect("/auth/facebook");
    }
}

module.exports = { requireAuth };