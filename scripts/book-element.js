import {
  deletebook,
  enterEditMode,
  getBooks,
  invertBookStatus,
  saveBookEdits,
} from "./book-data.js";
import { bookList } from "./main.js";
import { getKeyword, getSelectedListType } from "./search-feature.js";
import { el } from "./utils.js";

/**
 * @param {import("./book-data").Book} book
 * @returns {HTMLElement}
 */
const createBookElement = book => {
  const { author, id, isComplete, isEditing, title, year } = book;

  const titleInputElement = el("h2", {
    textContent: title,
    contentEditable: isEditing,
    className: "title-buku",
  });
  const authorInputElement = el("span", {
    textContent: author,
    contentEditable: isEditing,
    className: "penulis-buku",
  });
  const yearInputElement = el("span", {
    type: "number",
    textContent: year,
    contentEditable: isEditing,
    className: "tahun-terbit-buku",
  });

  const changeStatusbutton = el("button", {
    title: "Ganti Status Buku",
    className: isComplete ? "buku-selesai" : undefined,
    children: [
      el("i", {
        className: `fa-regular fa-lg ${
          isComplete ? "fa-square-check" : "fa-square"
        }`,
      }),
    ],
  });
  changeStatusbutton.addEventListener(
    "click",
    () => {
      invertBookStatus(id);
      renderBook(getBooks(getKeyword()), bookList, getSelectedListType());
    },
    { once: true },
  );

  const deleteButton = el("button", {
    title: "Hapus Buku",
    children: [
      el("i", {
        className: "fa-regular fa-trash-can fa-lg",
      }),
    ],
  });
  deleteButton.addEventListener(
    "click",
    () => {
      deletebook(id);
      renderBook(getBooks(getKeyword()), bookList, getSelectedListType());
    },
    { once: true },
  );

  const editButton = el("button", {
    title: "Edit Buku",
    children: [
      el("i", {
        className: `fa-regular fa-lg ${
          book.isEditing ? "fa-floppy-disk" : "fa-pen-to-square"
        }`,
      }),
    ],
  });
  editButton.addEventListener(
    "click",
    () => {
      if (!book.isEditing) {
        enterEditMode(book.id);
      } else {
        const year = parseInt(yearInputElement.textContent);

        console.log(year);
        if (isNaN(year) || year < 0) {
          return;
        }

        saveBookEdits({
          ...book,
          title: titleInputElement.textContent,
          author: authorInputElement.textContent,
          year,
        });
      }

      renderBook(getBooks(getKeyword()), bookList, getSelectedListType());
    },
    { once: true },
  );

  return el("li", {
    className: "buku",
    children: [
      el("div", {
        children: [
          titleInputElement,
          el("div", {
            className: "data-buku",
            children: [
              el("p", {
                className: "subtitle-buku",
                children: [
                  "Ditulis oleh: ",
                  authorInputElement,
                  " - Terbit: ",
                  yearInputElement,
                ],
              }),
              el("div", {
                id,
                className: "opsi-buku",
                children: [editButton, changeStatusbutton, deleteButton],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

/**
 *
 * @param {Array<import("./book-data").Book>} books
 * @param {HTMLUListElement} bookList
 * @param {"semua" | "dibaca" | "belum-dibaca"} selectedList
 */
export const renderBook = (books, bookList, selectedList) => {
  bookList.innerHTML = "";

  const filteredBooks = [];

  for (const book of books) {
    if (selectedList === "dibaca" && !book.isComplete) {
      continue;
    }

    if (selectedList === "belum-dibaca" && book.isComplete) {
      continue;
    }

    filteredBooks.push(book);
  }

  if (filteredBooks.length === 0) {
    bookList.innerHTML =
      "<p style='margin-block: calc(var(--spacing) * 3); color: var(--secondary-text-color);'>Belum ada buku!</p>";
  } else {
    for (const book of filteredBooks) {
      const bookElement = createBookElement(book);
      bookList.appendChild(bookElement);
    }
  }
};
