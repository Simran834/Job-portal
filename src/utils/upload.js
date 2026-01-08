const path = require('path');
const fs = require('fs');
const uploadDir = path.join(process.cwd(), 'upload');

const uploadFile = async(file,allowedMimeTypes) =>{
  if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }


    
    if(!file){
      return req.status(400).json({message: "File not received"});
    }

    //check mime type of the files
    if(!allowedMimeTypes.includes(file.mimetype)){
      return res.status(400).json({message: "Invalid file type"});
    }

     const fileName = `${Date.now()}_${file.name}`;

     const fullFilePath = path.join(uploadDir, fileName);

    const fileUri = `/upload/${fileName}`;

    

    
    //save file into given directory
     
    fs.writeFileSync(fullFilePath, file.data);
     return fileUri
}
module.exports = { uploadFile };

