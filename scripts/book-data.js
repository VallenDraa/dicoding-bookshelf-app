/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {number} year
 * @property {boolean} isComplete
 */

/** @type {Array<Book>}*/
const books = [];

/**
 * @param {string} title
 * @param {string} author
 * @param {string} year
 */
export const createBook = (title, author, year) => {};

/**
 * @param {string} bookId
 */
export const deletebook = bookId => {};

export const getBooks = () => books;
