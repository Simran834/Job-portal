const isJobSeeker = (req, res, next) =>{
    const userRole = req.user.role;

    if(userRole !== 'isJobSeeker'){
        return res.status(403).json({message: "forbidden"});
    }

    next();
}

export {IsJobSeeker}