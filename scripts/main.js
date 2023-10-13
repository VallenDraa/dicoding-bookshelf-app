import { createBook, getBooks, searchBooks } from "./book-data.js";
import { renderBook } from "./book-element.js";
import { qs } from "./utils.js";

const bookInputForm = qs("#form-input-buku");
const titleInput = qs("#input-judul");
const authorInput = qs("#input-penulis");
const yearInput = qs("#input-tahun");
const isCompleteInput = qs("#input-selesai-dibaca");

export const unreadList = qs("#list-belum-dibaca");
export const readList = qs("#list-sudah-dibaca");

const searchBooksForm = qs("#form-search-buku");
const searchBar = qs("#input-cari-buku");

renderBook(getBooks(), readList, unreadList);

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
      renderBook(getBooks(), readList, unreadList);

      titleInput.value = "";
      authorInput.value = "";
      yearInput.value = "";
    }
  }
});

// handle submit event untuk searching buku
searchBooksForm.addEventListener("submit", e => {
  e.preventDefault();

  const keyword = searchBar.value.trim();
  renderBook(searchBooks(keyword), readList, unreadList);
});
