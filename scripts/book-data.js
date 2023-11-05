/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {number} year
 * @property {boolean} isComplete
 * @property {boolean} isEditing
 */

/** @type {Array<Book>}*/
let books = JSON.parse(localStorage.getItem("books") ?? "[]");

const saveBooks = () => {
  localStorage.setItem("books", JSON.stringify(books));
};

/**
 * @param {string} title
 * @param {string} author
 * @param {string} year
 * @param {boolean} isComplete
 * */
export const createBook = (title, author, year, isComplete) => {
  /** @type {Book} */
  const hasExists = books.some(book => book.title === title);

  if (!hasExists) {
    books.push({
      id: crypto.randomUUID(),
      author,
      isComplete,
      title,
      year,
      isEditing: false,
    });

    saveBooks();
  }

  return !hasExists;
};

/**
 * @param {string} id
 */
export const enterEditMode = id => {
  books.forEach(book => {
    if (book.id === id) {
      book.isEditing = true;
    }
  });
};

/**
 * @param {Book} newBook
 */
export const saveBookEdits = newBook => {
  books.forEach((book, i) => {
    if (book.id === newBook.id) {
      books[i] = { ...newBook, isEditing: false };
    }
  });

  saveBooks();
};

/**
 *
 * @param {string} id
 * @param {boolean} isComplete
 */
export const invertBookStatus = id => {
  books.some(book => {
    if (book.id === id) {
      book.isComplete = !book.isComplete;
    }
  });

  saveBooks();
};

/**
 * @param {string} bookId
 * @param {boolean} isDeleted
 */
export const deletebook = bookId => {
  const prevLength = books.length;
  books = books.filter(book => book.id !== bookId);
  saveBooks();

  return !prevLength === books.length;
};

/**
 * @param {string} keyword
 * @returns {Array<Book>}
 */
export const getBooks = keyword => {
  if (!keyword) {
    return [...books];
  }

  const trimmedKeyword = keyword.trim();
  const trimmedKeywordAsNumber = parseInt(trimmedKeyword);

  return books.filter(book => {
    return (
      book.title.includes(trimmedKeyword) ||
      book.author.includes(trimmedKeyword) ||
      book.year === trimmedKeywordAsNumber
    );
  });
};
