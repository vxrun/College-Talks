const Post = require("../model/post");

exports.getInputForm =(req, res) => {
    res.render("create-post.ejs");
}



exports.createPost = async (req, res) => {
    let category = req.body.gridRadios;
    let {content,title} =req.body;
    let username =req.session.user.username;
    let arr=content.split(" ");
    let hashTags =arr.filter((value, index, array)=>{
        return value[0]=='#'
    });
    
    try {
        const post = await Post.create({
            title,
            content,
            type: category,
            author:username,
            date: new Date(),
            upvote: [],
            hashTags: hashTags
        })
        const posts = await Post.find({});
        //res.render("posts.ejs", {posts: posts});
        if(category =="Blog"){
            res.redirect("/blog");
        }
        else if(category =="Interview"){
            res.redirect("/interview");
        }
        else  res.redirect("/notice"); 
    } catch (err) {
        console.log(err)
    }
}
