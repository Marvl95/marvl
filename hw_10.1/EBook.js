import { Book } from './Book.js';

const ALLOWED_FORMATS = ['PDF', 'EPUB', 'MOBI', 'FB2'];

export class EBook extends Book {
  #fileFormat;

  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this.fileFormat = fileFormat;
  }

  static fromBook(book, fileFormat) {
    if (!(book instanceof Book)) {
      throw new Error('Перший аргумент має бути екземпляром класу Book');
    }

    return new EBook(book.title, book.author, book.year, fileFormat);
  }

  get fileFormat() {
    return this.#fileFormat;
  }

  set fileFormat(value) {
    const format = String(value).trim().toUpperCase();

    if (!ALLOWED_FORMATS.includes(format)) {
      throw new Error(`Формат файлу має бути одним із: ${ALLOWED_FORMATS.join(', ')}`);
    }

    this.#fileFormat = format;
  }

  printInfo() {
    console.log(
      `Електронна книга: "${this.title}", автор: ${this.author}, рік видання: ${this.year}, формат файлу: ${this.fileFormat}`,
    );
  }
}
