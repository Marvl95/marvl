import { Book } from './Book.js';
import { EBook } from './EBook.js';

const books = [
  new Book('1984', 'George Orwell', 1949),
  new EBook('Clean Code', 'Robert C. Martin', 2008, 'PDF'),
  new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
  new EBook('Moby-Dick', 'Herman Melville', 1851, 'EPUB'),
];

const oldestBook = Book.getOldestBook(books);

console.log('Найдавніша книга:');
oldestBook.printInfo();
