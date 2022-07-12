userNavRegister = document.getElementById('userNavRegister');
userNavLogin = document.getElementById('userNavLogin');
userNavAvatar = document.getElementById('userNavAvatar');
userFirstname = userNavAvatar.querySelector('span');
userNavLogout = document.getElementById('userNavLogout');

if (localStorage.getItem('loggedInUser')) {
  userFirstname.textContent = JSON.parse(localStorage.getItem('loggedInUser')).firstname;
  userNavRegister.className = 'displayNone';
  userNavLogin.className = 'displayNone';
  userNavAvatar.className = 'displayInlineBlock';
  userNavLogout.className = 'displayInlineBlock';
}

// Event: logout
userNavLogout.addEventListener('click', () => {
  userNavRegister.className = 'displayInlineBlock';
  userNavLogin.className = 'displayInlineBlock';
  userNavAvatar.className = 'displayNone';
  userNavLogout.className = 'displayNone';
  userFirstname.textContent = '';
  localStorage.removeItem('loggedInUser');
});