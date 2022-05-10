import joi from 'joi';
import { archiveBookService, createBookService, editBookService, findBookByIdService, findBookByTitleService, listBooksAdminService, listBooksService } from '../services/books.service';
import { CATEGORY } from 'src/entities/enums/category.enum';

// Interface for expected response
interface IHelperResponse {
  success: boolean;
  status: number;
  data?: { book?: any; };
  error?: string;
  message?: string | null;
}

export const addBookController = async (title: string, author: string, category: CATEGORY, book_cover_url: string, description: string, publication_date: string, archived: boolean): Promise<IHelperResponse> => {
  try {
    const validationSchema = joi.object({
      title: joi.string().required(),
      author: joi.string().required(),
      category: joi.string().required(),
      description: joi.string().required(),
      publication_date: joi.string().required(),
      archived: joi.boolean().required()
    });

    const validationResult = validationSchema.validate({ title, author, category, description, publication_date, archived });
    if (validationResult.error) {
      return {
        success: false,
        status: 400,
        error: validationResult.error.details[0].message,
      };
    }

    // check for existing book
    const existingBook = await findBookByTitleService(title);
    if (existingBook) {
      return {
        success: false,
        status: 400,
        error: 'book has been created already.',
      };
    }
    const book = await createBookService(title, author, category, book_cover_url, description, publication_date, archived);
    return {
      success: true,
      status: 200,
      message: 'Book successfully created',
      data: { book },
    };
  } catch (error) {
    return {
      success: true,
      status: 400,
      message: 'an error occurred',
    };
  }
};

export const editBookController = async (id: number, title: string, author: string, category: CATEGORY, book_cover_url: string, description: string, publication_date: string, archived: boolean): Promise<IHelperResponse> => {
  console.log(id);

  try {
    const validationSchema = joi.object({
      id: joi.string().uuid().required(),
      title: joi.string().required(),
      author: joi.string().required(),
      category: joi.string().required(),
      description: joi.string().required(),
      publication_date: joi.string().required(),
      archived: joi.boolean().required()
    });

    const validationResult = validationSchema.validate({ id, title, author, category, description, publication_date, archived });
    if (validationResult.error) {
      return {
        success: false,
        status: 400,
        error: validationResult.error.details[0].message,
      };
    }

    // check for existing book
    const existingBook = await findBookByIdService(id);
    if (existingBook) {
      const book = await editBookService(id, title, author, category, book_cover_url, description, publication_date, archived);
      return {
        success: true,
        status: 200,
        message: 'Book successfully edited',
        data: { book },
      };
    }
    return {
      success: true,
      status: 200,
      message: 'Bok not found',
    };
  } catch (error) {
    return {
      success: true,
      status: 400,
      message: 'an error occurred',
    };
  }
};

export const archiveBookController = async (id: number, archived: boolean): Promise<IHelperResponse> => {
  try {
    const validationSchema = joi.object({
      id: joi.string().required(),
      archived: joi.boolean().required()
    });

    const validationResult = validationSchema.validate({ id, archived });
    if (validationResult.error) {
      return {
        success: false,
        status: 400,
        error: validationResult.error.details[0].message,
      };
    }

    // check for existing book
    const existingBook = await findBookByIdService(id);
    if (existingBook) {

      const book = await archiveBookService(id, archived);

      //@ts-ignore
      let message = Boolean(archived) ? 'Book successfully archived' : 'Book successfully unarchived';
      return {
        success: true,
        status: 200,
        message,
        data: { book },
      };
    }
    return {
      success: true,
      status: 404,
      message: 'Book not found',
    };
  } catch (error) {
    return {
      success: true,
      status: 400,
      message: 'an error occurred',
    };
  }
};

export const getAllBooksUserController = async () => {
  const books = await listBooksService();
  return books;
};

export const getAllBooksAdminController = async () => {
  const books = await listBooksAdminService();
  return books;
};

