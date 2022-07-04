// Add to cart
const cartBadge = document.getElementById('cartBadge');
const cartItemsNr = document.getElementById('cartItemsNr');

let cart = [];

document.body.addEventListener('click', e => {
  if (e.target.id === 'addToCart') {
    e.preventDefault();
    const addToCart = e.target;
    const cantitate = document.getElementById('bookQuantity') ? bookQuantity.textContent : 1;
    const id = +addToCart.dataset.id;
    const { titlu, pret } = dbBooks.find(book => book.id === id);
    const product = { id, titlu, cantitate, pret };
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (!cart.find(product => product.id === id)) {
      cart.push(product);
      cartItemsNr.textContent = cart.length;
      if (cartBadge.classList.contains('displayNone')) {
        cartBadge.classList.replace('displayNone','displayFlex');
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
});