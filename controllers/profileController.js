const Post = require("../model/post");
const User = require("../model/user");
const bcrypt =require("bcrypt");

exports.getAllProfilePost = async (req, res) => {
    try {
        const blogs = await Post.find({});
        const profilePost = await Post.find({author:req.session.user.username});
        res.render("profile.ejs", {profilePost , blogs});
    } catch (err) {
        console.log(err);
    }
};

exports.getEditProfile = async (req, res) => {
    try {
        // const blogs = await Post.find({});
        // const profilePost = await Post.find({author:req.session.User.username});
        
        const message= await req.consumeFlash('message');
        res.render("edit-profile.ejs", {message:message[0]});
    } catch (err) {
        console.log(err);
    }
};

exports.postEditProfile = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            let password=req.body.password, hashedPassword=user.password;
            const result = await bcrypt.compare(password,hashedPassword);
            if(result){
                let newPassword = req.body.newPassword;
                let newHashedPassword = await bcrypt.hash(newPassword,12);
                await User.updateOne
                (
                    {
                        password : hashedPassword ,
                    },
                    {
                        password : newHashedPassword
                    }
                )
                res.redirect("/");
            }
            else{
                await req.flash('message',"Invalid password");
                res.redirect("/edit-profile");
            }
        }
        else{
            await req.flash('message',"Invalid email or password");
            res.redirect("/edit-profile");
        }
    } catch(err){
        console.log(err);
    }
}