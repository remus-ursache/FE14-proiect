// UI Elements
const banners = document.getElementById('banners');
const banner = document.querySelectorAll('#banners a');
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
          <a href="book.html?id=${book.id}" id="viewDetails">
            Info carte
          </a>
          <a href="" id="addToCart" data-id="${book.id}">
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

// Carousel
let bannerIndex = 0;

const run = () => {
  bannerIndex++;
  changeBanner();
}

const changeBanner = () => {
  if (bannerIndex > banner.length - 1) {
    bannerIndex = 0;
  } else if (bannerIndex < 0) {
    bannerIndex = banner.length - 1;
  }
  banners.style.transform = `translateX(${-bannerIndex * 900}px)`;
}

let carousel = setInterval(run, 5000);

const resetCarousel = () => {
  clearInterval(carousel);
  carousel = setInterval(run, 5000);
}

carouselLeftBtn.addEventListener('click', () => {
  bannerIndex--;
  changeBanner();
  resetCarousel();
});

carouselRightBtn.addEventListener('click', () => {
  bannerIndex++;
  changeBanner();
  resetCarousel();
});

// Books
dbBooks
  .sort((a,b) => b.id - a.id)
  .forEach((book,index) => (index < 9) ? displayBook(book) : null);