const express = require("express");
const path = require("path");
const router = express.Router();
const {getAllBlogs,getAllNotice,getAllInterview,getAllContent,getUpvoteBlog} = require('../controllers/postController')
const isAuth = require("../middlewares/isAuth");


router.get("/blog", getAllBlogs);

router.get("/notice", getAllNotice );

router.get("/interview", getAllInterview);

router.get("/content/upvote/:id", isAuth, getUpvoteBlog);

router.get("/content/:id" , getAllContent);

module.exports = router;

