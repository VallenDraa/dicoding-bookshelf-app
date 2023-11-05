import { getBooks } from "./book-data.js";
import { renderBook } from "./book-element.js";
import { bookList } from "./main.js";
import { qs } from "./utils.js";

let keyword = "";

/** @type {"semua" | "dibaca" | "belum-dibaca"}*/
let selectedListType = "semua";

export const searchFeatureInit = () => {
  const searchBar = qs("#input-cari-buku");
  const bookListOption = qs("#opsi-list-buku");

  // handle submit event untuk searching buku
  searchBar.addEventListener("keyup", e => {
    keyword = searchBar.value.trim();
    renderBook(getBooks(keyword), bookList, selectedListType);
  });

  // update list ketika tipe buku yang terpilih berubah
  bookListOption.addEventListener("change", () => {
    selectedListType = bookListOption.value;
    renderBook(getBooks(keyword), bookList, selectedListType);
  });
};

export const getKeyword = () => keyword;
export const getSelectedListType = () => selectedListType;
