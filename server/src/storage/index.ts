import { Request } from "express";
import { mkdirSync } from "fs";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const fileStorage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname)
    },
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "uploads/");

        mkdirSync(destinationPath, { recursive: true});
        callback(null, destinationPath);
    },
});

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if(file.mimetype === "application/pdf"){
        callback(null, true);
    }

    callback(null, false);
}

const limits = {
    fileSize: 1048576 //10 MB,
}


export default multer({storage: fileStorage, fileFilter, limits});