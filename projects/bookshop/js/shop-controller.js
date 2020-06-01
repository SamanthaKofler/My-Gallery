'use strict';

function onInit() {
    createBooks();
    renderBooks();
    renderPageBtns();
}

function renderBooks() {
    var books = getBooks();
    renderPageBtns();
    var strHTMLs = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td><button class="read-button" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update-button" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="delete-button" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>`
    });
    document.querySelector('.books-container').innerHTML = strHTMLs.join('');
}

function renderPageBtns() {
    var numOfPages = getNumOfPages();
    var strHTML = `<button onclick="onGetPageNum('previous')">&#171</button>`;
    for (var i = 0; i < numOfPages; i++) {
        strHTML += `<button onclick="onGetPageNum(${i})">${i + 1}</button>`;
    }
    strHTML += `<button onclick="onGetPageNum('next')">&#187</button>`;
    document.querySelector('.switch-page').innerHTML = strHTML;
}

function onGetPageNum(pageStatus) {
    if(getPageNum(pageStatus)) renderBooks();
}

function onAddBook() {
    var elTitle = document.querySelector('[name=book-name-input]');
    var elPrice = document.querySelector('[name=book-price-input]');
    var title = elTitle.value
    var price = +elPrice.value;
    if(!title || price <= 0) return;
    addBook(title, price);
    elTitle.value = '';
    elPrice.value = '';
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    document.querySelector('.book-title').innerText = book.name;
    document.querySelector('img').src = book.imgURL;
    document.querySelector('.details').innerText = book.desc;
    document.querySelector('.book-rating').innerHTML = `Rating:
    <button onclick="onUpdateRating('${book.id}', -1)">-</button>
    <span>${book.rate}</span><button onclick="onUpdateRating('${book.id}', 1)">+</button>`;
    elModal.hidden = false;
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Price?');
    if(newPrice < 0) return;
    updateBook(bookId, newPrice);
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onUpdateRating(bookId, diff) {
    updateRating(bookId,diff);
    onReadBook(bookId);
}

function onSortByName() {
    sortByName();
    renderBooks();
}

function onSortByPrice() {
    sortByPrice();
    renderBooks();

}