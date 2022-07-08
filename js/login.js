const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');

// Functions: validation
const isValidEmail = (input,users) => {
  const userExist = users.find(user => user.email === input.value.trim());
  if (userExist) {
    return showSuccess(input);
  } else {
    return showError(input, 'Adresa de email nu exista in baza de date!');
  }
}

const isValidPassword = (input,users) => {
  const userExist = users.find(user => user.password === input.value.trim());
  if (userExist) {
    return showSuccess(input);
  } else {
    return showError(input, 'Parola este incorecta!');
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

const isValidLogin = (inputs,users) => {
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
          isValid = isValidPassword(input,users);
          break;
        default:
          break;
      }
    }
  });
  return isValid;
}

// Event: register
loginBtn.addEventListener('click', () => {
  const inputs = [...loginForm.querySelectorAll('input:not(input[type=button])')];
  const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  if (isValidLogin(inputs,users)) {
    window.location.href = '/'
  }
});