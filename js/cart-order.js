const cartState = document.getElementById('cartState');
const products = document.getElementById('products');
const productTotal = document.getElementById('productTotal');
const inputs = [...document.querySelectorAll('#infoBuyer input, #infoShipment input')];
const payOrderBtn = document.getElementById('payOrderBtn');


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

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Check required fields
function checkRequired(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `Campul ${getFieldName(input)} este obligatoriu!`);
    } else {
      // showSuccess(input);
    }
  });
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

  // Autofill checkout inputs
  inputs.forEach(input => input.value = testUser[input.id]);
  
  products.classList.replace('displayNone','displayBlock');
  cartState.classList.replace('checkout-subtitle-empty-cart','checkout-subtitle');
  cartState.textContent = 'Sumar comanda';
  cart.forEach(item => displayCartProduct(item));
  document.getElementById('cartTotal').textContent = `${cartTotal} Lei`;
  document.getElementById('cartShipment').textContent = `${cartShipment} Lei`;
  document.getElementById('cartVAT').textContent = `${cartVAT} Lei`;
  document.getElementById('orderTotal').textContent = `${orderTotal} Lei`;

  // Event: order submit
  payOrderBtn.addEventListener('click', () => {
    checkRequired(inputs);
    // checkEmail(email);
    // checkCardNumber(cardNumber);
    // checkCardExpire(cardExpire);
    // checkcardCSV(cardCSV);
  });
}