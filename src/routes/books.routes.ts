import { Router } from 'express';
import { protect } from "../middleware/protect.middleware";
import { archiveBook, createBook, editBook, listBookAdmin, listBookUser } from '../Handlers/book.handler';
import multer from 'multer';
const upload = multer({ dest: 'public/' });

const router = Router();
router.post('/add', protect, createBook);
router.put('/edit/:id', protect, editBook);
router.get('/', protect, listBookUser);
router.get('/admin', protect, listBookAdmin);
router.put('/archive/:id', protect, archiveBook);


export default router;