const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes/router.js');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api", router);

//serve static files from public folders
app.use(express.static('public'));
//serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});