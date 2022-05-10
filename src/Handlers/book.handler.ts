import { RequestHandler } from 'express';
import { ROLES } from '../entities/enums/category.enum';
import { addBookController, editBookController, archiveBookController, getAllBooksAdminController, getAllBooksUserController } from '../controllers/books.controller';
import upload from '../utils/imageUpload';
import logger from '../utils/logger';


export const createBook: RequestHandler = async (req, res) => {
  try {
    //@ts-ignore
    if (req.user.role !== ROLES.OWNER) {
      return res.status(401).json({ message: 'insufficient rights' });
    }
    upload(req, res, async (err) => {
      const title = req.body.title;
      const author = req.body.author;
      const category = req.body.category;
      const description = req.body.description;
      const publication_date = req.body.publication_date;
      const archived = req.body.archived;
      const book_cover_url = req.file?.filename;
      if (err) {
        console.log(err);

        return res.status(400).json({ success: 'false', error: 'an error occurred' });
      }

      if (req.file == undefined) {
        return res.status(400).json({ success: 'false', error: 'an error occurred' });
      }
      console.log(category);

      // @ts-ignore
      const { success, error, status, data, message } = await addBookController(title, author, category, book_cover_url, description, publication_date, archived);

      if (!success) {
        return res.status(status).json({ success, error });
      }
      return res.status(status).json({ success, data, message });
    });
  } catch (error) {
    logger.error(error);
    console.log(error);

    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const editBook: RequestHandler = async (req, res) => {
  try {
    //@ts-ignore
    if (req.user.role !== ROLES.OWNER) {
      return res.status(401).json({ message: 'insufficient rights' });
    }
    upload(req, res, async (err) => {
      const title = req.params.id;
      const author = req.body.author;
      const category = req.body.category;
      const description = req.body.description;
      const publication_date = req.body.publication_date;
      const archived = req.body.archived;
      const book_cover_url = req.file?.filename;
      if (err) {
        console.log(err);

        return res.status(400).json({ success: 'false', error: 'an error occurred' });
      }

      if (req.file == undefined) {
        return res.status(400).json({ success: 'false', error: 'an error occurred' });
      }
      console.log(category);

      // @ts-ignore
      const { success, error, status, data, message } = await editBookController(req.params.id, title, author, category, book_cover_url, description, publication_date, archived);

      if (!success) {
        return res.status(status).json({ success, error });
      }
      return res.status(status).json({ success, message, data });
    });
  } catch (error) {
    logger.error(error);
    console.log(error);

    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const archiveBook: RequestHandler = async (req, res) => {
  try {
    //@ts-ignore

    const { archived } = req.body;
    // @ts-ignore
    const { success, error, status, data, message } = await archiveBookController(req.params.id, archived);

    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, message });
  } catch (error) {
    logger.error(error);
    console.log(error);

    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const listBookUser: RequestHandler = async (req, res) => {
  try {
    const books = await getAllBooksUserController();
    if (!books) {
      res.status(404).json([]);
    }
    res.status(200).json(books);
  } catch (error) {
    logger.error(error);
    console.log(error);

    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const listBookAdmin: RequestHandler = async (req, res) => {
  try {
    const books = await getAllBooksAdminController();
    if (!books) {
      res.status(404).json([]);
    }
    res.status(200).json(books);
  } catch (error) {
    logger.error(error);
    console.log(error);

    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

