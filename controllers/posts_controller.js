const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function(req,res){
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // },function(err,post){
    //     if(err){
    //         console.log('Error in creating a post'); 
    //         return;
    //     }
    //     return res.redirect('back');
    // });
    
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        return
    }
}

module.exports.destroy = async function(req,res){
//     Post.findById(req.params.id,function(err,post){
//   // .id means converting objectid into string
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({
//                 post: req.params.id
//             },function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({ post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error",err);
    }
}