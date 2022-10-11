const Post = require("../model/post");

exports.getUpvoteBlog = async (req,res) =>{
    try{
       
        const id = req.params.id.toString().trim();

       const blog = await Post.findById({_id: id});

       const userid = req.session.user._id;
       const newupvote = [];

       blog.upvote.map( id =>{
           if(userid.toString()!= id)
           {
               newupvote.push(id);
           }     
       });
      
       if(blog.upvote.length == newupvote.length)
       {
           blog.upvote.push(userid.toString());
       }
        else{
           blog.upvote = newupvote;
       }
      const updatedblog = await blog.save();
       
       let data = await JSON.stringify({upvote:blog.upvote.length});
       res.send(data);
       
       //let data = JSON.stringify({upvote: updatedblog.upvote})
    } catch (err){
       console.log(err);
    }
};




exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({type: 'Blog'});

        res.render("blog.ejs", {blogs});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllNotice = async (req, res) => {
    try {
        const notice = await Post.find({type: 'Notice'});
        res.render("notice.ejs", {notice});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllInterview = async (req, res) => {
    try {
        const Interview = await Post.find({type: 'Interview'});
        res.render("interview.ejs", {Interview});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllContent = async (req, res) => {
    try {

        var today = new Date();
        const id = req.params.id;
        const blog = await Post.findById({_id: id})
    


        res.render("content.ejs", {
            blog ,
            today
        });


    } catch (err) {
        console.log(err);
    }
};

