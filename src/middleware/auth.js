// authentication middleware'
import { verifyToken} from "../utils/json.js"
import {prisma} from "../utils/prisma-client.js"
const auth = async(req, res, next) => {

     const authHeader = req.headers.authorization;
     const token = authHeader && authHeader.split(" ")[1];
     if(!token){
        return res.status(401).json({message:"Unauthorized"});
     }

     try{
        console.log("Received token:", token);
        const payload = await verifyToken(token);
        console.log("Decoded payload:", payload);
        const user =await prisma.user.findUnique({
        where:{
            id:payload.id
        }
       });
       
       if(!user) {
        return res.status(401).json ({message: "Unauthorized"})
       }
       delete user.password;

       req.user = user;
       console.log("Authenticated user:", user);
    
        // fetch user from the database with given payload id
        next();
     } catch(error){
        console.log(error)
        res.status(401).json({message:"unauthorized"});
     }
};

export{auth};


// is admin vanera middle ware banauda,,, req, res, next.... hamlai req.user not equal to admin ho vane error faldine...
// aarko role thapna ko lagi aarko middleware banaunee....