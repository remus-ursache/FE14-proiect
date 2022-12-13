// LocalStorage: load/update DB
// const loadDbToLocal = async () => {
//   const res = await fetch('../json/db.json');
//   return await res.json().then(resData => localStorage.setItem('books',JSON.stringify(resData)));
// }
// loadDbToLocal();

// get DB from LocalStorage
// const dbBooks = JSON.parse(localStorage.getItem('books'));


const fetchBooks = async () => {
  const res = await fetch('../json/db.json');
  const data = await res.json();
  return data;
}