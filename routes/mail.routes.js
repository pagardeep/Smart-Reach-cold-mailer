import express from 'express';
import { deleteEmail, generateEmails, getEmailById, getMyEmails, sendMail, updateEmail } from '../controller/mail.controller.js'
import { authmiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/generate', authmiddleware, generateEmails);
router.get('/send', authmiddleware, getMyEmails);
router.get('/:id', authmiddleware, getEmailById);
router.get('/:id', authmiddleware, updateEmail);
router.get('/:id', authmiddleware, deleteEmail);
router.post('/send', authmiddleware, sendMail);
export default router;