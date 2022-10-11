const express = require("express");
const path = require("path");
const router = express.Router();
const Post = require("../model/post");

router.get("/search", (req, res) => {
   Post.find({})
      .then((result) => {
         res.render("search.ejs" , {result});
   })
   .catch((err) => {
         console.log(err);
   })
});

module.exports = router;

