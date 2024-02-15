"use strict";

const express = require("express");
const {asyncHandler} = require("../../auth/checkAuth")
const AccessController = require("../../controllers/access.controller");

const router = express.Router();

router.post("/shop/signup", asyncHandler(AccessController.signUp));
module.exports = router;
