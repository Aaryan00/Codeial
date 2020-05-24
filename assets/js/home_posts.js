{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostform = $('#new-post-form');

        newPostform.submit(function(e){
            e.preventDefault(); //prevent to submit form directly i.e. without using ajax

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostform.serialize(),
                success: function(data){
                        let newPost = newPostDOM(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost);
                        deletePost($(' .delete-post-button', newPost));

                        new Noty({
                            theme: 'relax',
                            text: "Post created using ajax",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM

    let newPostDOM = function(post){
        return $(`
                    <li id="post-${post._id}">
                         <p>
                     <!--  delete button will only show to user who created post -->
                                  <small>
                                       <a class= "delete-post-button" href="/posts/destroy/${post._id}">x</a>
                                  </small>
                                        ${ post.content }
                                  <small>
                                        ${post.user.name}
                                  </small>
                              </p>
                                <div class="post-comments">

                     <!-- show the comment form if user is logged in -->
                    
                                        <form action="/comments/create" method="POST">
                                            <input type="text" name="content" placeholder="Type here to add comment..."required>
                                            <input type="hidden" name="post" value='${post._id}'>
                                            <input type="submit" value="Add Comment">
                                        </form>
                            
                                <div class="post-comments-list">
                                    <ul id="post-comments-${post._id}">

                                    </ul>
                                </div>

                            </div>
                    </li>
        `)
    }

// method to delete post from dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted using ajax",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


        // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
        let convertPostsToAjax = function(){
            $('#posts-list-container>ul>li').each(function(){
                let self = $(this);
                let deleteButton = $(' .delete-post-button', self);
                deletePost(deleteButton);
    
                // get the post's id by splitting the id attribute
                let postId = self.prop('id').split("-")[1]
                new PostComments(postId);
            });
        }

    createPost();
    convertPostsToAjax();
}