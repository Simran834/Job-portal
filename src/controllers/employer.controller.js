import {prisma} from "../utils/prisma-client.js"
import bcrypt from 'bcrypt';
import path from "path";
import {uploadFile} from "../utils/upload.js";

const uploadDir = path.join(process.cwd(), 'upload');

const createEmployer = async(req, res) =>{
    try{
        const {name, email, password, companyName, companyWebsite} = req.body;
        const userId = req.user.id;

        // Check if profile already exists for the user
        const existingProfile = await prisma.employerProfile.findUnique({
            where: {userId}
        }); 
        if(existingProfile){
            return res.status(409).json({error: "Profile already exists for this user"});
        }

        const file = req.files?.companylogo;
        const fileUri = await uploadFile(file, ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']);
        console.log("Uploaded file URI:", fileUri);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the employer profile
        const newProfile = await prisma.employerProfile.create({
            data:{
                userId,
                name,
                email,  
                password : hashedPassword,
                companylogo: fileUri,
                companyName,
                companyWebsite,
                createdAt: new Date(),
            },
        });
        res.status(201).json(newProfile);
    } catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};
const getEmployerProfile = async(req, res) =>{
    try{
        const userId = req.user.id;
        const profile = await prisma.employerProfile.findUnique({
            where: {userId}
        });
        if(!profile){
            return res.status(404).json({error: "Profile not found"});
        }
        res.status(200).json(profile);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

//update profile
const updateProfile = async(req, res) =>{
    try{
        const userId = req.user.id;
        const {name, email, password, companyName, companyWebsite} = req.body;
        const updatedProfile = await prisma.employerProfile.update({
            where: {userId},
            data: {

                name,
                email,
                password,
                companylogo,
                companyName,
                companyWebsite,
            },
        });
        res.status(200).json(updatedProfile);
    } catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

//delete profile
const deleteProfile = async(req, res) =>{
    try{
        const userId = req.user.id;
        const deletedProfile = await prisma.employerProfile.delete({
            where: {userId},
        });
        res.status(200).json({message: "Profile deleted successfully"});
    } catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }   
};


export {createEmployer, getEmployerProfile, updateProfile, deleteProfile};