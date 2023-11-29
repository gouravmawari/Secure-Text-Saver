const express = require("express");
const Routes = express.Router();
const { authrequire } = require("../middleware/JWT.js")
const { registration, updateText, totalUserData, login } = require("../controller/controller.js");


Routes.route("/registration").post(registration);
Routes.route("/update_Text").put(authrequire, updateText);
Routes.route("/total_user").get(authrequire, totalUserData);
Routes.route("/login").post(login);

module.exports = Routes; 