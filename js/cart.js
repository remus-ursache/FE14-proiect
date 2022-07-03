// Add to cart
let cart = [];

document.body.addEventListener('click', e => {
  if (e.target.id === 'addToCart') {
    e.preventDefault();
    const addToCart = e.target;
    const cantitate = 1;
    const id = +addToCart.dataset.id;
    const { titlu, pret } = dbBooks.find(book => book.id === id);
    const product = { id, titlu, cantitate, pret };
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (!cart.find(product => product.id === id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    console.log(JSON.parse(localStorage.getItem('cart')));
  }
});