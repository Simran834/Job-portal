// check role
const isEmployer = (req, res, next) =>{
    const userRole = req.user.role;

    if(userRole !== 'EMPLOYER'){
        return res.status(403).json({message: "forbidden"});
    }

    next();
}

export {isEmployer}