import express from 'express';

const router = express.Router();


//=========================Error hndling
let posts = [
    {id:1 , title: 'Post One'},
    {id:2 , title: 'Post Two'},
    {id:3 , title: 'Post Three'},
    {id:4 , title: 'Post Four'}
];

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){//here we testing if the value in limit is a number and is greater than 0
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
    

    //now on postman run this (http://localhost:5000/api/posts?limit=4)
    
});

//get posts by id
router.get('/:id', (req, res, next) => {
    console.log(req.params.id)//now we trying to get whatever that is passed on our function(the id only) and display it on the log
    const idNum = parseInt(req.params.id); //now we are storing the value passed in the function to a variable so we can use it 
    //res.json(posts.filter((posts) => posts.id === idNum));//now we want to return the post that has the id that was sent in the function
    const post = posts.find((post) => post.id === idNum);

    if(!post){
      const error = new Error(`A post with id ${idNum} was not found`);
      error.status = 404;
      return next(error);
    }
    res.status(200).json(post);
    console.log(req.body);

    res.status(201).json(posts);
});

//CRUD operations
//create new post
router.post('/', (req, res) =>{
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    };

    if (!newPost.title){
        return res.status(400).json({message: 'Please include a title'});
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

//update post
router.put('/:id', (req, res) => {
    const idNum = parseInt(req.params.id);
    const post = posts.find((post) => post.id === idNum);

    if (!post){
        return res.status(404).json({message: `A post with id ${idNum} was not found`});
    }

    //now we doing the update
    post.title = req.body.title;
    res.status(200).json(posts);
});

//delete post
router.delete('/:id', (req, res) => {
    const idNum = parseInt(req.params.id);
    const post = posts.find((post) => post.id === idNum);

    if (!post){
        return req.status(404).json({message: `A post with id ${idNum} was not found`});
    }

    //now delete the post if it exists
    posts = posts.filter((post) => post.id !== idNum);
    res.status(200).json(posts);
});


//=============================================================================
/*
let posts = [
    {id:1 , title: 'Post One'},
    {id:2 , title: 'Post Two'},
    {id:3 , title: 'Post Three'},
    {id:4 , title: 'Post Four'}
];

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){//here we testing if the value in limit is a number and is greater than 0
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
    

    //now on postman run this (http://localhost:5000/api/posts?limit=4)
    
});

//get posts by id
router.get('/:id', (req, res) => {
    console.log(req.params.id)//now we trying to get whatever that is passed on our function(the id only) and display it on the log
    const idNum = parseInt(req.params.id); //now we are storing the value passed in the function to a variable so we can use it 
    //res.json(posts.filter((posts) => posts.id === idNum));//now we want to return the post that has the id that was sent in the function
    const post = posts.find((post) => post.id === idNum);

    if(!post){
      return  res.status(404).json({message: `A post with id ${idNum} was not found`});
    }
    res.status(200).json(post);
    console.log(req.body);

    res.status(201).json(posts);
});

//CRUD operations
//create new post
router.post('/', (req, res) =>{
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    };

    if (!newPost.title){
        return res.status(400).json({message: 'Please include a title'});
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

//update post
router.put('/:id', (req, res) => {
    const idNum = parseInt(req.params.id);
    const post = posts.find((post) => post.id === idNum);

    if (!post){
        return res.status(404).json({message: `A post with id ${idNum} was not found`});
    }

    //now we doing the update
    post.title = req.body.title;
    res.status(200).json(posts);
});

//delete post
router.delete('/:id', (req, res) => {
    const idNum = parseInt(req.params.id);
    const post = posts.find((post) => post.id === idNum);

    if (!post){
        return req.status(404).json({message: `A post with id ${idNum} was not found`});
    }

    //now delete the post if it exists
    posts = posts.filter((post) => post.id !== idNum);
    res.status(200).json(posts);
});
*/
export default router;