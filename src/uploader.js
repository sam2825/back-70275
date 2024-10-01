import multer from 'multer';
import path from 'path';
import config from './config.js';

import fs from 'fs';
if (!fs.existsSync(config.UPLOAD_DIR)) {
    fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIR);
    },

    filename: (req, file, cb) => {
    
        const now = Date.now();
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const originalExtension = path.extname(file.originalname);
        cb(null, `${now}_${originalName}${originalExtension}`);
    }
});


const fileFilter = (req, file, cb) => {
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Tipo de archivo no permitido');
    }
};

export const uploader = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
});
