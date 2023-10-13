import {
  deletebook,
  enterEditMode,
  getBooks,
  invertBookStatus,
  saveBookEdits,
} from "./book-data.js";
import { readList, unreadList } from "./main.js";
import { el, qs } from "./utils.js";

/**
 * @param {import("./book-data").Book} book
 * @returns {HTMLElement}
 */
const createBookElement = book => {
  const { author, id, isComplete, isEditing, title, year } = book;

  const changeStatusbutton = el("button", {
    textContent: isComplete ? "Belum selesai dibaca" : "Selesai dibaca",
  });
  changeStatusbutton.addEventListener(
    "click",
    () => {
      invertBookStatus(id);
      renderBook(getBooks(), readList, unreadList);
    },
    { once: true },
  );

  const deleteButton = el("button", { textContent: "Hapus Buku" });
  deleteButton.addEventListener(
    "click",
    () => {
      deletebook(id);
      renderBook(getBooks(), readList, unreadList);
    },
    { once: true },
  );

  const editButton = el("button", { textContent: "Edit Buku" });
  editButton.addEventListener(
    "click",
    () => {
      if (!book.isEditing) {
        enterEditMode();
        renderBook(getBooks(), readList, unreadList);
      } else {
        saveBookEdits({
          ...book,
          title: qs(`#title-${book.id}`).value,
          author: qs(`#author-${book.id}`).value,
          year: qs(`#year-${book.id}`).valueAsNumber,
        });
      }
    },
    { once: true },
  );

  return el("li", {
    className: isComplete ? "buku-selesai" : "buku-belum-selesai",
    children: [
      el("input", {
        id: `title-${book.id}`,
        value: title,
        className: "title-buku",
      }),
      el("input", {
        id: `author-${book.id}`,
        value: author,
        className: "penulis-buku",
      }),
      el("input", {
        id: `year-${book.id}`,
        value: year,
        className: "tahun-terbit-buku",
      }),
      el("div", {
        id,
        className: "opsi-buku",
        children: [changeStatusbutton, editButton, deleteButton],
      }),
    ],
  });
};

/**
 *
 * @param {Array<import("./book-data").Book>} books
 * @param {HTMLUListElement} readList
 * @param {HTMLUListElement} unreadList
 */
export const renderBook = (books, readList, unreadList) => {
  readList.innerHTML = "";
  unreadList.innerHTML = "";

  for (const book of books) {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      readList.appendChild(bookElement);
    } else {
      unreadList.appendChild(bookElement);
    }
  }
};
