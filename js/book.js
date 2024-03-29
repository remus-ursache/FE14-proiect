// UI Elemnts
const fullImg = document.getElementById('fullImg');
const thumbnails = [...document.querySelectorAll('ul#thumbnails li img')];
const tagsContainer = document.getElementById('tags');
const bookTitle = document.getElementById('bookTitle');
const bookAuthors = document.getElementById('bookAuthors');
const bookPrice = document.getElementById('bookPrice');
const bookQuantity = document.getElementById('bookQuantity');
const quantityMinus = document.getElementById('quantityMinus');
const quantityPlus = document.getElementById('quantityPlus');
const infoTitle = document.getElementById('infoTitle');
const infoDetails = document.getElementById('infoDetails');

// Functions
const isValidId = urlQueryStr => {
  const re = /^\?id\=[0-9]+$/;
  return re.test(urlQueryStr);
}

const displayTag = tag => {
  const i = document.createElement('i');
  i.className = 'fa-solid fa-tag fa-sm';
  const a = document.createElement('a');
  a.setAttribute('href',`book-list.html?category=${tag.toLowerCase().replace(/\s/g,'+')}`);
  a.textContent = tag;
  tagsContainer.append(i);
  tagsContainer.append(a);
}

const getBook = (books,id) => books.filter(book => book.id === id);

// Display main content
fetchBooks().then(books => {
  const urlQuery = window.location.search.trim();

  if (isValidId(urlQuery)) {
    const bookId = +urlQuery.slice(4);
    const book = getBook(books,bookId)[0];

    const {domeniu, subdomeniu, aparitie} = book;
    [domeniu,subdomeniu,aparitie].forEach(tag => displayTag(tag));

    document.querySelector('title').textContent = `${book.titlu} - Editura UAIC`;
    fullImg.setAttribute('src',`img/${book.id}.jpg`);

    thumbnails.forEach(thumbnail => thumbnail.setAttribute('src', `img/${book.id}.jpg`));

    bookTitle.textContent = book.titlu;
    bookAuthors.textContent = book.autori;
    bookPrice.textContent = `${book.pret} Lei`;
    infoDetails.textContent = book.info;
    addToCart.setAttribute('data-id',book.id);

    // Event: decrease quantity
    quantityMinus.addEventListener('click', () => {
      let quantity = +bookQuantity.textContent;
      if (quantity > 1) {bookQuantity.textContent = --quantity}
    });

    // Event: increase quantity
    quantityPlus.addEventListener('click', () => {
      let quantity = +bookQuantity.textContent;
      if (quantity < 5) {bookQuantity.textContent = ++quantity}
    });
  } else {
    // 404 Page
  }
});
