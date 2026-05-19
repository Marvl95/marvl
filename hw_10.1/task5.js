import { Book } from './Book.js';
import { EBook } from './EBook.js';

const book = new Book('1984', 'George Orwell', 1949);

const ebook = EBook.fromBook(book, 'epub');

console.log('Звичайна книга:');
book.printInfo();

console.log('\nEBook, створений з Book через статичний метод:');
ebook.printInfo();
