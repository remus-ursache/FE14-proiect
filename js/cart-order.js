//UI Elements
const cartState = document.getElementById('cartState');
const products = document.getElementById('products');
const productTotal = document.getElementById('productTotal');
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
const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Adresa de email invalida!');
  }
}

const checkPhone = input => {
  const re = /^0\d{9}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Numar de telefon invalid!');
  }
}

const checkPostalCode = input => {
  const re = /^\d{6}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Cod postal invalid!');
  }
}

const checkCardNumber = input => {
  const re = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Numar card invalid!');
  }
}

const checkCardExpire = input => {
  const re = /^(0[1-9]|1[1-2])\/(2[2-9]|[3-9][0-9])$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Data expirare invalida!');
  }
}

const checkCardCSV = input => {
  const re = /^\d{3}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'CSV invalid!');
  }
}

const showError = (input,msg) => {
  const li = input.parentElement;
  console.log(input);
  li.classList.add('error');
  const small = input.nextElementSibling;
  small.textContent = msg;
}

const showSuccess = input => {
  if (input.parentElement.classList.contains('error')) {
    input.parentElement.classList.remove('error');
  }
}

const checkRequired = inputs => {
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `Campul este obligatoriu!`);
    } else {
      showSuccess(input);
      switch (input.id) {
        case 'email':
          checkEmail(input);
          break;
        case 'phone':
          checkPhone(input);
          break;
        case 'postalCode':
          checkPostalCode(input);
          break;
        case 'cardNumber':
        checkCardNumber(input);
          break;
        case 'cardExpire':
          checkCardExpire(input);
          break;
        case 'cardCSV':
          checkCardCSV(input);
          break;
        default:
          break;
      }
    }
  });
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
    console.log(loggedInUser);
    [...inputsBuyer, ...inputsShipment].forEach(input => input.value = testUser[input.id]);
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
    checkRequired(inputs);
  });
}