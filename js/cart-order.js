//UI Elements
const cartState = document.getElementById('cartState');
const products = document.getElementById('products');
const productTotal = document.getElementById('productTotal');
const buyerName = document.getElementById('name');
const buyerEmail = document.getElementById('email');
const inputsBuyer = [...document.querySelectorAll('#infoBuyer input')];
const inputsShipment = [...document.querySelectorAll('#infoShipment input')];
const inputsPayment = [...document.querySelectorAll('#infoPayment input')];
const payOrderBtn = document.getElementById('payOrderBtn');

// Functions
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

// Functions: validation
const isValidEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Adresa de email invalida!');
  }
}

const isValidPhone = input => {
  const re = /^0\d{9}$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Numar de telefon invalid!');
  }
}

const isValidPostalCode = input => {
  const re = /^\d{6}$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Cod postal invalid!');
  }
}

const isValidCardNumber = input => {
  const re = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Numar card invalid!');
  }
}

const isValidCardExpire = input => {
  const re = /^(0[1-9]|1[1-2])\/(2[2-9]|[3-9][0-9])$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Data expirare invalida!');
  }
}

const isValidCardCSV = input => {
  const re = /^\d{3}$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'CSV invalid!');
  }
}

const showError = (input,msg) => {
  const li = input.parentElement;
  li.classList.add('error');
  const small = input.nextElementSibling;
  small.textContent = msg;
  return false;
}

const showSuccess = input => {
  if (input.parentElement.classList.contains('error')) {
    input.parentElement.classList.remove('error');
  }
  return true;
}

const isValidOrder = inputs => {
  let isValid = true;
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      isValid = showError(input, `Campul este obligatoriu!`);
    } else {
      isValid = showSuccess(input);
      switch (input.id) {
        case 'email':
          isValid = isValidEmail(input);
          break;
        case 'phone':
          isValid = isValidPhone(input);
          break;
        case 'postalCode':
          isValid = isValidPostalCode(input);
          break;
        case 'cardNumber':
          isValid = isValidCardNumber(input);
          break;
        case 'cardExpire':
          isValid = isValidCardExpire(input);
          break;
        case 'cardCSV':
          isValid = isValidCardCSV(input);
          break;
        default:
          break;
      }
    }
  });
  return isValid;
}

// Display cart
const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
const loggedInUser = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : null;
let cartTotal = 0;
const cartShipment = 20;
let cartVAT = 0;
let orderTotal = 0;

if (cart) {
  cartTotal = cart
    .map(item => item.cantitate * item.pret)
    .reduce((acc,curr) => acc + curr, 0);
  cartVAT = cartTotal * 0.09;
  orderTotal = cartTotal + cartShipment;

  if (loggedInUser) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.id === loggedInUser.id);
    const autofillInputs = [...document.querySelectorAll('#infoBuyer input, #infoShipment input:not(input[id="phone"])')];
    autofillInputs.forEach(input => {
      input.value = (input.id === 'name') ? `${user.lastname} ${user.firstname}` : input.value = user[input.id];
    });
  }
  
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
    const inputs = [...inputsBuyer, ...inputsShipment, ...inputsPayment];
    if (isValidOrder(inputs)) {
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    };
  });
}