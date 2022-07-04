const cartState = document.getElementById('cartState');
const products = document.getElementById('products');
const productTotal = document.getElementById('productTotal');
const autofillInputs = [...document.querySelectorAll('#infoBuyer input, #infoShipment input')];


const displayCartProduct = item => {
  const li = document.createElement('li');
  const liContent = `
    <span id="productName">${item.titlu}</span>
      <div>
        <span id="productQuantity">&times; ${item.cantitate}</span>
        <span id="productTotal">${item.cantitate * item.pret} Lei</span>
      </div>
  `;
  li.innerHTML = liContent;
  products.append(li);
}

const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
let cartTotal = 0;
const cartShipment = 20;
let cartVAT = 0;
let orderTotal = 0;

if (cart) {
  const testUser = {
    name: 'Remus Ursache',
    email: 'remus@test.ro',
    phone: '0712345678',
    address: 'Pinului 1A',
    postalCode: '712734',
    city: 'Iasi',
    county: 'Iasi'
  }
  cartTotal = cart
    .map(item => item.cantitate * item.pret)
    .reduce((acc,curr) => acc + curr, 0);
  cartVAT = cartTotal * 0.09;
  orderTotal = cartTotal + cartShipment;

  autofillInputs.forEach(input => input.value = testUser[input.id]);
  
  products.classList.replace('displayNone','displayBlock');
  cartState.classList.replace('checkout-subtitle-empty-cart','checkout-subtitle');
  cartState.textContent = 'Sumar comanda';
  cart.forEach(item => displayCartProduct(item));
  document.getElementById('cartTotal').textContent = `${cartTotal} Lei`;
  document.getElementById('cartShipment').textContent = `${cartShipment} Lei`;
  document.getElementById('cartVAT').textContent = `${cartVAT} Lei`;
  document.getElementById('orderTotal').textContent = `${orderTotal} Lei`;
}