import { Book } from './Book.js';
import { EBook } from './EBook.js';

const book = new Book('1984', 'George Orwell', 1949);

console.log('Book — отримання через геттери:');
console.log('title:', book.title);
console.log('author:', book.author);
console.log('year:', book.year);

console.log('\nBook — зміна через сеттери:');
book.title = 'Animal Farm';
book.author = 'George Orwell';
book.year = 1945;

book.printInfo();

const ebook = new EBook('Clean Code', 'Robert C. Martin', 2008, 'pdf');

console.log('\nEBook — fileFormat через геттер:', ebook.fileFormat);

console.log('\nEBook — зміна fileFormat через сеттер:');
ebook.fileFormat = 'epub';
ebook.title = 'The Clean Coder';
ebook.year = 2011;

ebook.printInfo();
