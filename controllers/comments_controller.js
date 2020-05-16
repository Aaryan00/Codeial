const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req,res){
    // Post.findById(req.body.post,function(err,post){
        
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         },function(err,comment){
    //             if(err){
    //                 console.log(`Error in creating Comment: ${err}`);
    //             }
    //             post.comments.push(comment);
    //             post.save();

    //             res.redirect('/');
    //         });
    //     }
    // })

    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await  Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            if(req.xhr){
                 // Similar for comments to fetch the user's id!
                 comment = await comment.populate('user', 'name').execPopulate();

                 return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }

            req.flash("success","Comment added");
            res.redirect('/');
   
        }
    }catch(err){
        // console.log("Error",err);
        req.flash("error",err);
        return res.redirect('back');
    }

}

module.exports.destroy = async function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user == req.user.id){
// //saving postid of the deleted comment , so that we can delete that comment also from the comment array inside the post in database
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, { 
//                 $pull: {
//                     comments: req.params.id
//                  }}, function(err,post){
//                      return res.redirect('back');
//                  })
//         }else{
//             return res.redirect('back');
//         }
//     });

    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            let post =  Post.findByIdAndUpdate(postId, { 
                $pull: {
                    comments: req.params.id
                 }});

            // send the comment id which was deleted back to the views
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }

                 req.flash("success","Comment Deleted");
                 return res.redirect('back');
        }else{
            req.flash("error","You cannot delete Comment ");
            return res.redirect('back');
        }
    }catch(err){
        // console.log("Error",err);
        req.flash("error",err);
        return
    }
}