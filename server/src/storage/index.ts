import { mkdirSync } from "fs";
import multer from "multer";
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

export default multer({storage: fileStorage});