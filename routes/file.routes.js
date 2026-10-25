import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { uploadFile } from '../controller/file.controller.js';
import { authmiddleware } from '../middleware/auth.middleware.js';
import { extractContent } from '../controller/extraction.controller.js';



const router = express.Router();

router.post("/upload", authmiddleware, upload.single("file"), uploadFile);
router.post("/extract", authmiddleware, upload.single("screenshot"), extractContent);
export default router;