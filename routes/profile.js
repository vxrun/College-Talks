const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const {getAllProfilePost , getEditProfile , postEditProfile}=  require("../controllers/profileController");

router.get("/profile",isAuth ,getAllProfilePost);

router.get("/edit-profile",isAuth , getEditProfile);

router.post("/edit-profile",isAuth , postEditProfile);

module.exports = router;
