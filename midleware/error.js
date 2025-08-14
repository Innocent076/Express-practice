const errorHandler = (err, req, res, next) =>{

    if (err.status){
        req.status(err.status).json({message: err.message});
    }else{
        res.status(500).json({message: err.message});
    }
    
};

export default errorHandler;