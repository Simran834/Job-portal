import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/router.js';
import cors from 'cors';

import e from 'express';
e 
dotenv.config();


const app = express();
const PORT =process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/apii", router);

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});