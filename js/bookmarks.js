const urlTitle = document.querySelector('.url-title')
const urlLink = document.querySelector('.url-link')
const urlSubmit = document.querySelector('.url-submit')
const urlSearch = document.querySelector('.url-search')
const output = document.querySelector('.bookmarks-output')
const filter = document.querySelector('.filter')
const removeAll = document.querySelector('.remove-all')
const loadDemo = document.querySelector('.load-demo')

function loadEvents() {
  document.addEventListener('DOMContentLoaded', getBookmarks)
  urlSubmit.addEventListener('click', addBookmark)
  filter.addEventListener('keyup', filterBookmarks)
}

loadEvents()

const defaultBookmarks = [
  ['Ioan Zaharia', 'https://www.ioanzaharia.com/'],
  ['google', 'https://www.google.com'],
  ['stackoverflow', 'https://www.stackoverflow.com'],
  [
    'branch name in git',
    'https://www.stackoverflow.com/questions/6245570/how-to-get-the-current-branch-name-in-git',
  ],
  ['caniuse', 'https://www.caniuse.com'],
]

loadDemo.addEventListener('click', () => {
  if (localStorage.getItem('bookmarks') === null) {
    bookmarks = defaultBookmarks
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    getBookmarks()
  } else {
    if (confirm('All Bookmarks will de deleted and demo content will load!')) {
      bookmarks = defaultBookmarks
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      output.innerHTML = ''
      getBookmarks()
    }
  }
})

function getBookmarks() {
  let bookmarks

  if (localStorage.getItem('bookmarks') === null) {
    bookmarks = []
  } else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  }

  bookmarks.forEach(function (bookmark) {
    const ul = document.createElement('ul')
    const liTitle = document.createElement('li')
    const liLink = document.createElement('li')
    const liUrl = document.createElement('a')
    const removeItem = document.createElement('a')

    liTitle.classList.add('bookmark-title')
    liLink.classList.add('bookmark-link')

    liTitle.appendChild(document.createTextNode(bookmark[0]))
    liUrl.innerHTML = bookmark[1].slice(12)
    liUrl.href = bookmark[1]
    liUrl.setAttribute('target', '_blank')
    liLink.appendChild(liUrl)
    liUrl.classList.add('link-target')

    removeItem.className = 'detele-item'
    removeItem.innerHTML = '<i class="far fa-trash-alt"></i>'
    removeItem.addEventListener('click', function () {
      liUrl.classList.toggle('remove-toggler')
    })
    removeItem.addEventListener('click', removeBookmark)
    ul.appendChild(liTitle)
    ul.appendChild(liLink)
    ul.appendChild(removeItem)
    ul.classList.add('bookmark-item')
    output.appendChild(ul)
  })
}

function addBookmark(e) {
  if (urlTitle.value === '' && urlLink.value === '') {
    alert('Add a title and a link')
    e.preventDefault()
    return
  } else if (urlTitle.value === '') {
    alert('Title is missing')
    e.preventDefault()
    return
  } else if (urlLink.value === '') {
    alert('Add a link for your bookmark')
    e.preventDefault()
    return
  }

  const ul = document.createElement('ul')
  const liTitle = document.createElement('li')
  const liLink = document.createElement('li')
  const liUrl = document.createElement('a')
  const removeItem = document.createElement('a')

  liTitle.classList.add('bookmark-title')
  liLink.classList.add('bookmark-link')

  const inputLink = urlLink.value.toLowerCase()
  const linkPrefix = 'https://www.'
  let outputLink = ''

  if (inputLink.startsWith('www.')) {
    outputLink = linkPrefix.concat(inputLink.slice(4))
  } else if (inputLink.startsWith('https://')) {
    outputLink = linkPrefix.concat(inputLink.slice(8))
  } else if (inputLink.startsWith('http://')) {
    outputLink = linkPrefix.concat(inputLink.slice(7))
  } else if (inputLink.startsWith('http://www.')) {
    outputLink = linkPrefix.concat(inputLink.slice(11))
  } else if (inputLink.startsWith('https://www.')) {
    outputLink = linkPrefix.concat(inputLink.slice(12))
  } else {
    outputLink = linkPrefix.concat(inputLink)
  }

  liTitle.appendChild(document.createTextNode(urlTitle.value))
  liUrl.innerHTML = outputLink.slice(12)
  liUrl.href = outputLink
  liUrl.setAttribute('target', '_blank')
  liLink.appendChild(liUrl)
  liUrl.classList.add('link-target')

  removeItem.className = 'detele-item'
  removeItem.innerHTML = '<i class="far fa-trash-alt"></i>'
  removeItem.addEventListener('click', function () {
    liUrl.classList.toggle('remove-toggler')
  })
  removeItem.addEventListener('click', removeBookmark)
  ul.appendChild(liTitle)
  ul.appendChild(liLink)
  ul.appendChild(removeItem)
  ul.classList.add('bookmark-item')
  output.appendChild(ul)

  storeBookmark(urlTitle.value, outputLink)

  urlTitle.value = ''
  urlLink.value = ''

  e.preventDefault()
}

function storeBookmark(title, url) {
  let bookmarks

  if (localStorage.getItem('bookmarks') === null) {
    bookmarks = []
  } else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  }

  bookmarks.push([title, url])
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

function removeBookmark(e) {
  let bookmarks
  if (localStorage.getItem('bookmarks') === null) {
    bookmarks = []
  } else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  }

  const target = document.querySelector('.remove-toggler')

  bookmarks.forEach(function (bookmark, index) {
    if (bookmark[1].slice(12) === target.innerHTML) {
      if (confirm(`Confirm to remove - ${bookmark[0]}`)) {
        e.target.parentElement.parentElement.remove()

        bookmarks.splice(index, 1)

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      }
    }
  })
}

function filterBookmarks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.bookmark-item').forEach(function (bookmark) {
    const itemTitle = bookmark.firstChild.textContent
    const itemLink = bookmark.children[1].textContent
    if (
      itemTitle.toLowerCase().indexOf(text) != -1 ||
      itemLink.toLowerCase().indexOf(text) != -1
    ) {
      bookmark.style.display = 'flex'
    } else {
      bookmark.style.display = 'none'
    }
  })
}

removeAll.addEventListener('click', () => {
  if (confirm('Are you sure you want to remove all bookmarks?')) {
    localStorage.removeItem('bookmarks')
    output.innerHTML = ''
  }
})
