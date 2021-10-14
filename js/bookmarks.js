const urlTitle = document.querySelector(".url-title");
const urlLink = document.querySelector(".url-link");
const urlSubmit = document.querySelector(".url-submit");
const urlSearch = document.querySelector(".url-search");
const output = document.querySelector(".bookmarks-output");
const bookmarkList = document.querySelector(".collection");

urlSubmit.addEventListener("click", addBookmark);

function loadEvents() {
  document.addEventListener("DOMContentLoaded", getBookmarks);
}

loadEvents();

function getBookmarks() {
  let bookmarks;
  if (localStorage.getItem("bookmarks") === null) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }

  // What I do with the bookmarks here
  console.log(bookmarks);
}

function addBookmark(e) {
  e.preventDefault();

  if (urlTitle.value === "") {
    alert("Add a title for your bookmark");
  }

  if (urlLink.value === "") {
    alert("Add a link for your bookmark");
  }
}
