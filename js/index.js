// UI Elements
const banners = document.getElementById('banners');
const banner = document.querySelectorAll('#banners img');
const carouselLeftBtn = document.getElementById('carouselLeftBtn');
const carouselRightBtn = document.getElementById('carouselRightBtn');
const booksGrid = document.getElementById('booksHomeGrid');

// Functions
const displayBook = book => {
  const bookCard = document.createElement('article');
    bookCard.classList.add('book-card');
    const bookCardContent = `
      <div class="card-header">
        <img src="img/${book.id}.jpg" />
        <div class="card-overlay">
          <a href="" id="viewDetails">
            Info carte
          </a>
          <a href="" id="addToCart">
            Adauga in cos
          </a>
        </div>
      </div>
      <small>${book.domeniu}</small>
      <h4>${book.titlu}</h4>
      <p>${book.autori}</p>
      <h3>${book.pret} Lei</h3>
    `;
    bookCard.innerHTML = bookCardContent;
    booksGrid.appendChild(bookCard);
}

// Display main content
let carouselIndex = 0;
let slideInterval = setInterval(run, 5000);

function run() {
  carouselIndex++;
  changeBanner();
}

function changeBanner() {
  if (carouselIndex > banner.length - 1) {
    carouselIndex = 0;
  } else if (carouselIndex < 0) {
    carouselIndex = banner.length - 1;
  }
  banners.style.transform = `translateX(${-carouselIndex * 900}px)`;
}

const resetInterval = () => {
  clearInterval(slideInterval);
  slideInterval = setInterval(run, 5000);
}

carouselLeftBtn.addEventListener('click', () => {
  carouselIndex--;
  changeBanner();
  resetInterval();
});

carouselRightBtn.addEventListener('click', () => {
  carouselIndex++;
  changeBanner();
  resetInterval();
});

dbBooks
  .sort((a,b) => b.id - a.id)
  .forEach((book,index) => (index < 9) ? displayBook(book) : null);