import { Book } from "../entities/books.entity";
import { connectionSource } from "../db/db";
import { CATEGORY, categoryArray } from "../entities/enums/category.enum";

const createBookService = async (title: string, author: string, category: CATEGORY, book_cover_url: string, description: string, publication_date: string, archived: boolean) => {
  const book = connectionSource.getRepository(Book).create({
    title, author, category, book_cover_url, description, publication_date, archived
  });
  const newBook = await connectionSource.getRepository(Book).save(book);
  return newBook;
};

const findBookByIdService = async (id: number) => {
  const book = await connectionSource.getRepository(Book).findOne({ where: { id } });
  return book;
};

const findBookByTitleService = async (title: string) => {
  const book = await connectionSource.getRepository(Book).findOne({ where: { title } });
  return book;
};

const listBooksService = async () => {
  const bookList = [];
  for (let i = 0; i < categoryArray.length; i++) {
    const books = await connectionSource.getRepository(Book).find({
      select: ['title', 'author', 'category', 'book_cover_url', 'description', 'publication_date'],
      order: {
        createdAt: 'DESC',
      }, take: 3, where: { category: categoryArray[i], archived: false, }
    });
    bookList.push({
      category: categoryArray[i],
      books
    });
  }
  return bookList;
};

const listBooksAdminService = async () => {
  const books = await connectionSource.getRepository(Book).find({});
  return books;
};

const editBookService = async (id: number, title: string, author: string, category: CATEGORY, book_cover_url: string, description: string, publication_date: string, archived: boolean) => {
  const book = await connectionSource.getRepository(Book).update({ id: id }, {
    title, author, category, book_cover_url, description, publication_date, archived
  });
  return book;
};

const archiveBookService = async (id: number, archived: boolean) => {
  const book = await connectionSource.getRepository(Book).update({ id }, {
    archived
  });
  return book;
};

export {
  createBookService, findBookByIdService, findBookByTitleService, editBookService, listBooksService, archiveBookService, listBooksAdminService
};