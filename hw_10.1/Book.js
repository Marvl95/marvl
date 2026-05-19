export class Book {
  #title;
  #author;
  #year;

  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Назва книги має бути непорожнім рядком');
    }
    this.#title = value.trim();
  }

  get author() {
    return this.#author;
  }

  set author(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Автор має бути непорожнім рядком');
    }
    this.#author = value.trim();
  }

  get year() {
    return this.#year;
  }

  set year(value) {
    const year = Number(value);

    if (!Number.isInteger(year) || year < 0 || year > new Date().getFullYear() + 1) {
      throw new Error(
        `Рік видання має бути цілим числом від 0 до ${new Date().getFullYear() + 1}`,
      );
    }

    this.#year = year;
  }

  static getOldestBook(books) {
    if (!Array.isArray(books) || books.length === 0) {
      throw new Error('Потрібен непорожній масив книг');
    }

    let oldest = books[0];

    for (const book of books) {
      if (!(book instanceof Book)) {
        throw new Error('У масиві мають бути лише екземпляри Book або EBook');
      }

      if (book.year < oldest.year) {
        oldest = book;
      }
    }

    return oldest;
  }

  printInfo() {
    console.log(`Книга: "${this.title}", автор: ${this.author}, рік видання: ${this.year}`);
  }
}
