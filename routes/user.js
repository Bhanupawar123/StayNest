const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const users = require("../controllers/user.js");

router
  .route("/signup")
  .get(users.renderSignupForm)
  .post(wrapAsync(users.register));

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;