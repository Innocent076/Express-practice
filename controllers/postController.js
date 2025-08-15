let posts = [
    {id:1 , title: 'Post One'},
    {id:2 , title: 'Post Two'},
    {id:3 , title: 'Post Three'},
    {id:4 , title: 'Post Four'}
];



// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){//here we testing if the value in limit is a number and is greater than 0
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
     //now on postman run this (http://localhost:5000/api/posts?limit=4)    
};

// @desc Get single post
// @route GET /api/posts/:id
export const getPost = (req, res, next) => {
    console.log(req.params.id)//now we trying to get whatever that is passed on our function(the id only) and display it on the log
    const idNum = parseInt(req.params.id); //now we are storing the value passed in the function to a variable so we can use it 
    //res.json(posts.filter((posts) => posts.id === idNum));//now we want to return the post that has the id that was sent in the function
    const post = posts.find((post) => post.id === idNum);

    if(!post){
      const error = new Error(`A post with id ${idNum} was not found`);
      //error.status = 404;
      return next(error);
    }
    res.status(200).json(post);
    console.log(req.body);

    res.status(201).json(posts);
};

// @desc create a post
// @route POST /api/posts
export const CreatePost = (req, res, next) =>{
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    };

    if (!newPost.title){
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
};

// @desc update post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
    const idNum = parseInt(req.params.id);
    const post = posts.find((post) => post.id === idNum);

    if (!post){
        const error = new Error(`A post with id ${idNum} was not found`);
        error.status = 404;
        return next(error);
    }

    //now we doing the update
    post.title = req.body.title;
    res.status(200).json(posts);
};

// @desc Delete post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
    const idNum = parseInt(req.params.id);
    const post = posts.find((post) => post.id === idNum);

    if (!post){
        const error = new Error(`A post with id ${idNum} was not found`);
        error.status = 404;
        return next(error);
    }

    //now delete the post if it exists
    posts = posts.filter((post) => post.id !== idNum);
    res.status(200).json(posts);
};