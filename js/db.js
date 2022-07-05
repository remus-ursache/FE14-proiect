// LocalStorage: load/update DB
const loadDbToLocal = async () => {
  const res = await fetch('../json/db.json');
  return await res.json().then(resData => localStorage.setItem('books',JSON.stringify(resData)));
}
loadDbToLocal();

// get DB from LocalStorage
const dbBooks = JSON.parse(localStorage.getItem('books'));

// loggedInUser
const testUser = {
  name: 'Remus Ursache',
  email: 'remus@test.ro',
  phone: '0712345678',
  address: 'Pinului 1A',
  postalCode: '712734',
  city: 'Iasi',
  county: 'Iasi'
}
localStorage.setItem('loggedInUser',JSON.stringify(testUser));