// Functions
const isValidSearch = urlQueryStr => {
  const re = /^\?search\=[a-zA-Z0-9]+[(\%20)\+]?[a-zA-Z0-9\%\+]*$/;
  return re.test(urlQueryStr);
}

const isValidCategory = urlQueryStr => {
  const re = /^\?category\=[a-zA-Z0-9]+[(\%20)\+]?[a-zA-Z0-9\%\+]*$/;
  return re.test(urlQueryStr);
}

const isValidFilter = urlQueryStr => {
  const re = /^\?filter\=(search|category)\/[a-zA-z0-9\s]+(\&(domeniu|subdomeniu|aparitie)\/[a-zA-Z0-9\,\s]+){1,3}\&sortby\/(id|pret)\&sortdir\/[0-1]$/;
  return re.test(decodeURIComponent(urlQueryStr.replace(/\+/g,'%20')));
}

const getBooks = (books,search,filters) => {
  let matches = [];
  if (search) {
    const re = new RegExp(`${search}`, 'gi');
    matches = books.filter(book => {
      return book.domeniu.match(re) || book.subdomeniu.match(re) || book.aparitie.match(re); 
    });
  } else if (filters) {
    matches = books.filter(book => {
      return book.domeniu.match(filters.domeniu) && book.subdomeniu.match(filters.subdomeniu) && book.aparitie.match(filters.aparitie); 
    });
  }
  return matches;
}

const sortBooks = (books,sortBy,sortDirection) => {
  sortDirection ? books.sort((a,b) => b[sortBy] - a[sortBy]) : books.sort((a,b) => a[sortBy] - b[sortBy]);
  return books;
}

const displayBook = book => {
  const bookCard = document.createElement('article');
    bookCard.classList.add('book-card');
    const bookCardContent = `
      <div class="card-header">
        <img src="img/${book.id}.jpg" />
        <div class="card-overlay">
          <a href="" id="viewDetails">
            Info carte
          </a>
          <a href="" id="addToCart">
            Adauga in cos
          </a>
        </div>
      </div>
      <small>${book.domeniu}</small>
      <h4>${book.titlu}</h4>
      <p>${book.autori}</p>
      <h3>${book.pret} Lei</h3>
    `;
    bookCard.innerHTML = bookCardContent;
    booksGrid.appendChild(bookCard);
}

const toogleFilterList = toogleBtn => {
  const filterList = toogleBtn.parentElement.nextElementSibling;
  toogleBtn.classList.contains('fa-circle-chevron-down') ? toogleBtn.classList.replace('fa-circle-chevron-down','fa-circle-chevron-up') : toogleBtn.classList.replace('fa-circle-chevron-up','fa-circle-chevron-down');
  filterList.classList.toggle('displayNone');
}

const getFilters = (books) => {
  const filters = {domeniu: [], subdomeniu: [], aparitie: []};
  books.forEach(book => {
    for (const key in filters) {
      if (!filters[key].includes(book[key].toLowerCase().replace(/\s/g,'_'))) {
        filters[key].push(book[key].toLowerCase().replace(/\s/g,'_'));
      };
    }
  });
  for (const key in filters) {
    filters[key] = (key !== 'aparitie') ? filters[key].sort() : filters[key].sort((a,b) => parseInt(a) - parseInt(b));
  }
  return filters;
}

const displayFilters = (category,filters) => {
  const categoryUl = document.getElementById(category).querySelector('li:last-child ul');
  filters[category].forEach(item => {
    const li = document.createElement('li');
    li.classList.add('displayFlex');
    const liContent = `
      <input type="checkbox" name="${item}" id="${item}" />
      <label for="${item}">${item.charAt(0).toUpperCase() + item.replace(/\_/g,' ').slice(1)}</label>
      <span>(0)</span>
    `;
    li.innerHTML = liContent;
    categoryUl.appendChild(li);
  });
};

const getFiltersCounters = (filters,books,submitedFilters=null) => {
  const filtersCounters = [];
  if (!submitedFilters) {
    for (const key in filters) {
      filters[key].forEach(item => {
        const re = new RegExp(`^${item.charAt(0).toUpperCase() + item.replace(/\_/g,' ').slice(1)}$`);
        const filterCounter = books.filter(book => book[key].match(re)).length;
        filtersCounters.push({id: item, counter: filterCounter});
      });
    }
    return filtersCounters;
  } else {
    const list = {domeniu: new Set(), subdomeniu: new Set(), aparitie: new Set()}
    books.forEach(book => {
      Object.keys(list).forEach(key => list[key].add(book[key]));
    });
    for (const key in list) {
      list[key].forEach(item => {
        const filterCounter = books.filter(book => book[key] === item).length;
        filtersCounters.push({id: item.toLowerCase().replace(/\s/g,'_'), counter: filterCounter});
      })
    }
    return filtersCounters;
  }
}

const updateFiltersCounters = filter => {
  const filterLabel = document.querySelector(`label[for="${filter.id}"]`);
  filterLabel.nextElementSibling.textContent = `(${filter.counter})`;
}

const sortByPrice = (e,books) => {
  const sortDirection = +(e.target.selectedOptions[0].value);
  const sortedBooks = sortBooks(books,'pret',sortDirection);
  booksGrid.innerHTML = '';
  sortedBooks.forEach(book => displayBook(book));
}

const submitFilters = (type,searchValue) => {
  const filtersCategories = ['domeniu', 'subdomeniu', 'aparitie'];
  let filterStr = '';
  const querySearch = (type === 'search') ? `search/${searchValue}` : `category/${searchValue}`;
  filterStr += querySearch;
  filtersCategories.forEach(category => {
    const checkedFilters = [...document.querySelectorAll(`ul#${category} input:checked + label`)]
      .map(checkedFilter => checkedFilter.textContent);
    if (checkedFilters.length) {
      filterStr += `&${category}/${checkedFilters.toString()}`;
    } 
  });
  const querySortBy = (sortByPriceBtn.value !== '') ? 'sortby/pret' : 'sortby/id';
  const querySortDirection = (sortByPriceBtn.value !== '') ? `sortdir/${sortByPriceBtn.value}` : 'sortdir/1';
  filterStr += `&${querySortBy}&${querySortDirection}`;
  filterInput.value = filterStr;
  if (isValidFilter(`?filter=${filterStr}`)) {
    filterForm.submit();
  } else {
    if (type === 'search') {
      searchForm.submit();
    } else {
      window.location.href = `${window.location.pathname}?category=${searchValue}`;
    }
  }
}

const getSubmitedFilters = (urlQueryComponents) => {
  const submitedFilters = {
    txt: {domeniu: [], subdomeniu: [], aparitie: []},
    re: {domeniu: [], subdomeniu: [], aparitie: []}
  };
  for (const key in submitedFilters.txt) {
    if (Object.keys(urlQueryComponents).includes(key)) {
      submitedFilters.txt[key] = urlQueryComponents[key]
        .split(',')
        .map(item => item.toLowerCase().replace(/\s/g,'_'));
      submitedFilters.re[key] = new RegExp(`^(${urlQueryComponents[key].toString().replace(/\,/g,'|')})$`,'gi');
    } else {
      submitedFilters.re[key] = /^[a-zA-Z0-9\s]+$/gi;
    }
  };
  return submitedFilters;
}