import { Book } from './Book.js';

const book1 = new Book('Clean Code', 'Robert C. Martin', 2008);
const book2 = new Book('1984', 'George Orwell', 1949);
const book3 = new Book('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 1999);

book1.printInfo();
book2.printInfo();
book3.printInfo();
