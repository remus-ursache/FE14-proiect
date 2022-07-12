const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');

// Functions: validation
const isValidEmail = (email,users) => {
  const userExist = users.find(user => user.email === email.value.trim());
  if (userExist) {
    return showSuccess(email);
  } else {
    return showError(email, 'Adresa de email nu exista in baza de date!');
  }
}

const isValidPassword = (email,password,users) => {
  const userExist = users.find(user => user.email === email.value.trim() && user.password === password.value.trim());
  if (userExist) {
    return showSuccess(password);
  } else {
    return showError(password, 'Parola este incorecta!');
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
  Object.keys(inputs).forEach(key => {
    if (inputs[key].value.trim() === '') {
      isValid = showError(inputs[key], `Campul este obligatoriu!`);
    } else {
      isValid = showSuccess(inputs[key]);
      switch (key) {
        case 'email':
          isValid = isValidEmail(inputs.email,users);
          break;
        case 'password':
          isValid = isValidPassword(inputs.email,inputs.password,users);
          break;
        default:
          break;
      }
    }
  });
  return isValid;
}

// Event: login
loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const inputs = {email,password};
  const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  if (isValidLogin(inputs,users)) {
    const {firstname,id} = users.find(user => user.email === email.value.trim() && user.password === password.value.trim());
    localStorage.setItem('loggedInUser',JSON.stringify({firstname,id}));
    window.location.href = '/'
  }
});

// Event: register
registerBtn.addEventListener('click', () => {
  window.location.href = '/register.html';
});