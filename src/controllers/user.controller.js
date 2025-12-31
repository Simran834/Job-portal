// import { create } from "domain";
import { prisma } from "../utils/prisma-client.js";
import { generateToken } from "../utils/json.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        role: role || 'USER',
        password: hashedPassword,
        is_verified: false,
        createdAt: new Date(),
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({          
        select: {       
            id: true,
            name: true,
            email: true,
            role: true,
            is_verified: true,
            createdAt: true,

        }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        }); 
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = generateToken(user);
        res.status(200).json({ 
            message: "Login successful", 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,  
                role: user.role,
                is_verified: user.is_verified,
                createdAt: user.createdAt,
            }

         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//update user

const updateUser = async (req, res) => {
    try {
        if(loggedInUser.role !== id ){
        const userId = parseInt(req.params.id);
        const { name, email, role, is_verified } = req.body;        
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email, role, is_verified },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                is_verified: true,
                createdAt: true,
            }
        });
        if(!loggedInUser){
            return res.status(404).json({message: "user not found"});

        }
        res.status(200).json(updatedUser);
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//delete user       
const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);     
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        if(!deletedUser){
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "user deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
};




export { createUser, getUsers, loginUser, updateUser, deleteUser };