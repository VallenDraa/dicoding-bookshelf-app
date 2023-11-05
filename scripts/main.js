import { createBook, getBooks } from "./book-data.js";
import { renderBook } from "./book-element.js";
import {
  getKeyword,
  getSelectedListType,
  searchFeatureInit,
} from "./search-feature.js";
import { qs } from "./utils.js";

const bookInputForm = qs("#form-input-buku");
const titleInput = qs("#input-judul");
const authorInput = qs("#input-penulis");
const yearInput = qs("#input-tahun");
const isCompleteInput = qs("#input-selesai-dibaca");

export const bookList = qs("#list-buku");

renderBook(getBooks(getKeyword()), bookList, getSelectedListType());

// handle submit event untuk form input buku
bookInputForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const year = yearInput.valueAsNumber;
  const isComplete = isCompleteInput.checked;

  // stop pembuatan buku ketika ada atribut yang kosong
  if (title !== "" && author !== "" && year > 0) {
    const isCreated = createBook(title, author, year, isComplete);

    if (isCreated) {
      renderBook(getBooks(getKeyword()), bookList, getSelectedListType());

      titleInput.value = "";
      authorInput.value = "";
      yearInput.value = "";
    }
  }
});

searchFeatureInit();
