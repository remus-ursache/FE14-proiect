const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const registerForm = document.getElementById('registerForm');
const alert = document.getElementById('alert');

// Functions: validation
const isValidEmail = (input,users) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.trim())) {
    return showError(input, 'Adresa de email invalida!');
  } else {
    const userExist = users.find(user => user.email === input.value.trim());
    if (userExist) {
      return showError(input, 'Adresa de email exista in baza de date!');
    } else {
      return showSuccess(input);
    }
  }
}

const isValidPassword = input => {
  const re = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,15}))$/;
  if (re.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Parola invalida!');
  }
}

const isValidPasswordsConfirm = (input1, input2) => {
  if (input1.value.trim() === input2.value.trim()) {
    return showSuccess(input2);
  } else {
    showError(input2, 'Parolele nu sunt identice!')
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

const isValidRegister = (inputs,users) => {
  let isValid = true;
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      isValid = showError(input, `Campul este obligatoriu!`);
    } else {
      isValid = showSuccess(input);
      switch (input.id) {
        case 'email':
          isValid = isValidEmail(input,users);
          break;
        case 'password':
          isValid = isValidPassword(input);
          break;
        case 'password2':
          isValid = isValidPasswordsConfirm(password,input);
          break;
        case 'postalCode':
        isValid = isValidPostalCode(input);
        break;
        default:
          break;
      }
    }
  });
  return isValid;
}

let users = [];
const user = {
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  address: '',
  city: '',
  county: '',
  postalCode: ''
}

// Event: register
registerBtn.addEventListener('click', () => {
  const inputs = [...registerForm.querySelectorAll('input:not(input[type=button])')];
  const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  if (isValidRegister(inputs,users)) {
    Object.keys(user).forEach(key => user[key] = document.getElementById(key).value.trim());
    user.id = users.length + 1;
    users.push(user);
    localStorage.setItem('users',JSON.stringify(users));
    inputs.forEach(input => input.value = '');
    alert.textContent = 'Contul tau a fost creat. Acum te poti autentifica.';
    alert.className = 'alert alert-success';
  }
});

// Event: hide alert
registerForm.addEventListener('keyup', () => alert.className = 'alert');

// Event: login
loginBtn.addEventListener('click', () => {
  window.location.href = '/login.html';
});