// UI Elements
const booksGrid = document.getElementById('booksListGrid');
const searchInput = document.getElementById('searchInput');
const booksCounter = document.getElementById('booksCounter');
const sortByPriceBtn = document.getElementById('sortByPrice');
const filtersList = document.getElementById('leftCol');
const filtersContainer = document.getElementById('filters');
const filterInput = document.getElementById('filterInput');

// Display main content
const filtersCategories = ['domeniu','subdomeniu','aparitie'];
const filters = getFilters(dbBooks);
filtersCategories.forEach(category => displayFilters(category,filters));

const urlQuery = window.location.search.trim();
if (isValidSearch(urlQuery) || isValidCategory(urlQuery)) {
  let searchValue = '';
  const type = isValidSearch(urlQuery) ? 'search' : 'category';
  if (type === 'search') {
    searchValue = urlQuery.slice(8).replace(/\%20|\+/g,' ');
    searchInput.value = searchValue;
  } else {
    searchValue = urlQuery.slice(10).replace(/\%20|\+/g,' ');
    searchInput.value = '';
  }
  
  const booksBySearch = getBooks(dbBooks,searchValue,0);
  if (booksBySearch) {
    const filtersCounters = getFiltersCounters(filters,booksBySearch);
    filtersCounters.forEach(filter => updateFiltersCounters(filter));
    const sortedBooks = sortBooks(booksBySearch,'id',1);
    sortedBooks.forEach(book => displayBook(book));

    // Event: sort selected books (from search/filter) by price asc/desc
    sortByPriceBtn.addEventListener('change', e => sortByPrice(e,sortedBooks));
  }

  if (type === 'search') {
    booksCounter.innerHTML = `${booksBySearch.length} rezultate pentru <span>${searchValue}</span>`;
  } else {
    booksCounter.innerHTML = `<span>${searchValue.charAt(0).toUpperCase() + searchValue.replace(/\_/g,' ').slice(1)}</span>`;
  }

  // Event: submit filters
  filtersContainer.addEventListener('change', () => submitFilters(type,searchValue));

} else if (isValidFilter(urlQuery)) {

  const urlQueryComponents = {};
  const urlQueryArr = decodeURIComponent(urlQuery)
    .replace(/\+/g,' ')
    .slice(8)
    .split('&');
  urlQueryArr.forEach(component => {
    const componentArr = component.split('/');
    urlQueryComponents[componentArr[0]] = componentArr[1];
  });

  const type = (urlQueryComponents.search !== undefined) ? 'search' : 'category';
  const searchValue = urlQueryComponents.search ?? urlQueryComponents.category;
  searchInput.value = (urlQueryComponents.search !== undefined) ? searchValue : '';
  
  const submitedFilters = getSubmitedFilters(urlQueryComponents);
  for (const key in submitedFilters.txt) {
    if (submitedFilters.txt[key].length) {
      submitedFilters.txt[key].forEach(item => document.getElementById(item).checked = true);
    }
  }
  
  const booksBySearch = getBooks(dbBooks,searchValue,0);
  if (booksBySearch) {
    const booksByFilters = getBooks(booksBySearch,0,submitedFilters.re);
    if (booksByFilters) {
      let countingBooks = booksBySearch;
      for (const key in submitedFilters.re) {
        let matches = countingBooks.filter(book => book[key].match(submitedFilters.re[key]));
        const filtersCounters = getFiltersCounters(filters,matches,submitedFilters.re);
        filtersCounters.forEach(filter => updateFiltersCounters(filter));
        countingBooks = matches;
      }
      
      const sortBy = urlQueryComponents.sortby;
      const sortDirection = +(urlQueryComponents.sortdir);
      if ( sortBy === 'pret' ) {
        sortByPriceBtn.value = `${sortDirection }`;
      }
      const sortedBooks = sortBooks(booksByFilters,sortBy,sortDirection);
      sortedBooks.forEach(book => displayBook(book));

      if (type === 'search') {
        booksCounter.innerHTML = `${countingBooks.length} rezultate pentru <span>${searchValue}</span>`;
      } else {
        booksCounter.innerHTML = `<span>${searchValue.charAt(0).toUpperCase() + searchValue.replace(/\_/g,' ').slice(1)}</span>`;
      }

      // Event: sort selected books (from search/filter) by price asc/desc
      sortByPriceBtn.addEventListener('change', e => sortByPrice(e,sortedBooks));
    }
  }

  // Event: submit filters
  filtersContainer.addEventListener('change', () => submitFilters(type,searchValue));
  
} else {

  booksCounter.innerHTML = `Cautarea este invalida!`;

}

// Event: toggle show/hide filter list
filtersList.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    toogleFilterList(e.target);
  }
});
