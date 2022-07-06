const secondaryNavMenuContainer = document.querySelector('#secondaryNav ul.menu');

const secondaryNav = [
  { header: 'Economie', items: null },
  { header: 'Istorie', items: null },
  { header: 'Stiinte sociale', items: null },
  { header: 'Anul aparitiei', items: null, flag: 'aparitie' }
];

const getSecondaryNavMenuItems = (menu,books) => {
  let items = null;
  if (Object.keys(menu).includes('flag')) {
    items = new Set(
      books.map(book => book[menu.flag])
    );
  } else {
    items = new Set(
      books.filter(book => book.domeniu === menu.header).map(book => book.subdomeniu)
    );
    items.add('Tot domeniul');
  }
  return items;
}

const displaySecondaryNavMenu = menu => {
  const menuLi = document.createElement('li');
  const headerLink = `<a href="#">${menu.header}</a>`;
  menuLi.innerHTML = headerLink;
  const itemsUl = displaySecondaryNavMenuItems(menu);
  menuLi.append(itemsUl);
  secondaryNavMenuContainer.append(menuLi);
}

const displaySecondaryNavMenuItems = menu => {
  menu.items = getSecondaryNavMenuItems(menu,dbBooks);
  const itemsUl = document.createElement('ul');
  itemsUl.classList.add('submenu');
  menu.items.forEach(item => {
    const itemLi = document.createElement('li');
    let itemLink = ``;
    if (item === 'Tot domeniul') {
      itemLink = `<a href="book-list.html?category=${menu.header.toLowerCase().replace(/\s/g,'+')}">${item}</a>`;
      itemLi.classList.add('submenu-last-item');
    } else {
      itemLink = `<a href="book-list.html?category=${item.toLowerCase().replace(/\s/g,'+')}">${item}</a>`;
    }
    itemLi.innerHTML = itemLink;
    itemsUl.append(itemLi);
  });
  return itemsUl;
}

secondaryNav.forEach(menu => displaySecondaryNavMenu(menu));

const secondaryNavLinks = [...document.querySelectorAll('#secondaryNav a')];
const selectedLink = secondaryNavLinks.filter(link => this.location.href === link.href);
if (selectedLink.length) {
  if (selectedLink[0].closest('ul.submenu') === null) {
    selectedLink[0].style.color = 'var(--success-100)';
  } else {
    selectedLink[0].closest('ul.submenu').previousElementSibling.style.color = 'var(--success-100)';
  }
} else {
  if (window.location.pathname === '/book.html' && window.location.search) {
    const re = /^\?id\=\d{4}$/;
    if (re.test(window.location.search)) {
      const id = +window.location.search.split('=')[1];
      const { domeniu } = dbBooks.find(book => book.id === id);
      secondaryNavLinks.find(link => link.textContent === domeniu).style.color = 'var(--success-100)';
    }
  }
}

// Display cart
if (localStorage.getItem('cart') && document.getElementById('cartBadge').classList.contains('displayNone')) {
  cartItemsNr.textContent = JSON.parse(localStorage.getItem('cart')).length;
  cartBadge.classList.replace('displayNone','displayFlex');
}
