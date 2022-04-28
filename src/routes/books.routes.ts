import { Router } from 'express';
import { protect } from "../middleware/protect.middleware";
import { archiveBook, createBook, editBook, listBookAdmin, listBookUser } from '../Handlers/book.handler';
import multer from 'multer';
const upload = multer({ dest: 'public/' });

const router = Router();
router.post('/add', protect, createBook);
router.post('/edit', protect, editBook);
router.get('/users', listBookUser)
router.get('/admin', protect, listBookAdmin)
router.post('/archive', protect, archiveBook)


export default router;