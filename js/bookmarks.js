const urlTitle = document.querySelector(".url-title");
const urlLink = document.querySelector(".url-link");
const urlSubmit = document.querySelector(".url-submit");
const urlSearch = document.querySelector(".url-search");
const output = document.querySelector(".bookmarks-output");
const filter = document.querySelector(".filter");

function loadEvents() {
  document.addEventListener("DOMContentLoaded", getBookmarks);
  urlSubmit.addEventListener("click", addBookmark);
  filter.addEventListener("keyup", filterBookmarks);
}

loadEvents();

// Debug, remove all
// localStorage.removeItem("bookmarks");

function getBookmarks() {
  let bookmarks;
  if (localStorage.getItem("bookmarks") === null) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }

  bookmarks.forEach(function (bookmark) {
    const ul = document.createElement("ul");
    const liTitle = document.createElement("li");
    const liLink = document.createElement("li");
    const removeItem = document.createElement("a");

    liTitle.appendChild(document.createTextNode(bookmark[0]));
    liLink.appendChild(document.createTextNode(bookmark[1]));
    liLink.classList.add("link-targer");

    removeItem.className = "detele-item";
    removeItem.innerHTML = '<i class="far fa-trash-alt"></i>';
    removeItem.addEventListener("click", removeBookmark);
    ul.appendChild(liTitle);
    ul.appendChild(liLink);
    ul.appendChild(removeItem);
    ul.classList.add("bookmark-item");
    output.appendChild(ul);
  });
}

function addBookmark(e) {
  if (urlTitle.value === "" && urlLink.value === "") {
    alert("Add a title and a link");
  } else if (urlTitle.value === "") {
    alert("Title is missing");
  } else if (urlLink.value === "") {
    alert("Add a link for your bookmark");
  }

  const ul = document.createElement("ul");
  const liTitle = document.createElement("li");
  const liLink = document.createElement("li");
  const removeItem = document.createElement("a");

  liTitle.appendChild(document.createTextNode(urlTitle.value));
  liTitle.classList.add("title-targer");
  liLink.appendChild(document.createTextNode(urlLink.value));
  liLink.classList.add("link-targer");
  removeItem.className = "detele-item";
  removeItem.innerHTML = '<i class="far fa-trash-alt"></i>';
  removeItem.addEventListener("click", removeBookmark);
  ul.appendChild(liTitle);
  ul.appendChild(liLink);
  ul.appendChild(removeItem);
  ul.classList.add("bookmark-item");
  output.appendChild(ul);

  storeBookmark(urlTitle.value, urlLink.value);

  urlTitle.value = "";
  urlLink.value = "";

  e.preventDefault();
}

function storeBookmark(title, url) {
  let bookmarks;
  if (localStorage.getItem("bookmarks") === null) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }

  bookmarks.push([title, url]);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function removeBookmark(e) {
  let bookmarks;
  if (localStorage.getItem("bookmarks") === null) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }

  const target = document.querySelector(".link-targer");

  bookmarks.forEach(function (bookmark, index) {
    if (bookmark[1] === target.innerHTML) {
      if (confirm(`Confirm to remove - ${bookmark[0]}`)) {
        e.target.parentElement.parentElement.remove();

        bookmarks.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      }
    }
  });
}

function filterBookmarks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".bookmark-item").forEach(function (bookmark) {
    const itemTitle = bookmark.firstChild.textContent;
    const itemLink = bookmark.children[1].textContent;
    if (
      itemTitle.toLowerCase().indexOf(text) != -1 ||
      itemLink.toLowerCase().indexOf(text) != -1
    ) {
      bookmark.style.display = "block";
    } else {
      bookmark.style.display = "none";
    }
  });
}
