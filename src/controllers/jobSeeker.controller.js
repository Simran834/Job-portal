import { prisma } from "../utils/prisma-client.js"
import bcrypt from 'bcrypt';
import path from "path";
import {uploadFile} from "../utils/upload.js";

const uploadDir = path.join(process.cwd(), 'upload');

const createJobSeekerProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, address, skills } = req.body;
    const userId = req.user.id;
    // Check if profile already exists for the user
    const existingProfile = await prisma.jobSeekerProfile.findUnique({
      where: { userId }
    });
    if (existingProfile) {
        return res.status(409).json({ error: "Profile already exists for this user" });
        }

        const file = req.files?.profile_image;
        //const file1 = req.files?.resume;
        const fileUri = await uploadFile(file, ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']);
        //const fileUri1 = await uploadFile(file1, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
        console.log("Uploaded file URI:", fileUri);
        //console.log("Uploaded file URI:", fileUri1);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    // Create the job seeker profile
    const newProfile = await prisma.jobSeekerProfile.create({
      data: {
        userId,
        fullName,
        password: hashedPassword,
        profile_image: fileUri,
        //resume: fileUri1,
        phoneNumber,
        address,
        skills,
        createdAt: new Date(),
        },
    });
    res.status(201).json(newProfile);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    }
};

const getJobSeekerProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await prisma.jobSeekerProfile.findUnique({
            where: { userId }
        });
        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }   
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//update profile

const updateProfile = async (req, res) => {
    if(loggedInUser.role !== 'JOB_SEEKER'){
        return res.status(403).json({message: "forbidden"});
    }
    else{

    
    try {
        const userId = req.user.id;
        const { fullName, phoneNumber, address, skills } = req.body;    
        const updatedProfile = await prisma.jobSeekerProfile.update({
            where: { userId },
            data: { fullName, phoneNumber, address, skills },
        });
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
};

};



//delete profile
const deleteProfile = async (req, res) => {
    if(loggedInUser.role !== 'JOB_SEEKER'){
        return res.status(403).json({message: "forbidden"});
    }
    else{
    try {
        const userId = req.user.id;
        const deletedProfile = await prisma.jobSeekerProfile.delete({
            where: { userId },
        });
        res.status(200).json({message: "Profile deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
}

export { createJobSeekerProfile, getJobSeekerProfile, updateProfile, deleteProfile };
