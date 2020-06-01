'use strict';

var gBooks = [];
var PAGE_SIZE = 3;
var gPageIdx = 0;


function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function getNumOfPages() {
    return Math.ceil(gBooks.length / PAGE_SIZE);
}

function getPageNum(pageStatus) {
    if (pageStatus === 'previous') {
        if (gPageIdx === 0) return false;
        gPageIdx--;
    }
    else if (pageStatus === 'next') {
        if (gPageIdx >= getNumOfPages() - 1) return false;
        gPageIdx++;
    }
    else gPageIdx = pageStatus;
    return true;
}

function addBook(title, price) {
    var book = _createBook(title, price);
    gBooks.unshift(book);
    _saveBookstoStorage();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex( book =>  book.id === bookId)
    if(bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    _saveBookstoStorage();
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId);
    book.price = newPrice;
    _saveBookstoStorage();
}

function updateRating(bookId, diff) {
    var book = getBookById(bookId);
    if(book.rate === 10 && diff === 1 || book.rate === 0 && diff === -1) return;
    book.rate += diff;
    _saveBookstoStorage();
}

function sortByName() {
    gBooks.sort((book1, book2) => {
        var bookName1 = book1.name.toUpperCase();
        var bookName2 = book2.name.toUpperCase();
        if (bookName1 < bookName2) return -1;
        else if (bookName1 > bookName2) return 1;
        else return 0
    });
}

function sortByPrice() {
    gBooks.sort((book1, book2) => book1.price - book2.price);
}



// function getBookById(bookId) {
//     var book = gBooks.find(function (book) {
//         return book.id === bookId;
//     })
//     return book;
// }

function getBookById(bookId) {
    return gBooks.find( book => book.id === bookId)
}

function _createBook(name, price, imgURL) {
    return {
        id: makeId(3),
        name: name,
        price: price,
        imgURL: imgURL,
        desc: makeLorem(),
        rate: 0
    }
}

function createBooks() {
    var books = loadFromStorage('books');
    if (!books || !books.length) {
        gBooks.push(_createBook('Zur Genealogie der Moral', 14.75, 'img/book1.jpg'));
        gBooks.push(_createBook('An Enquiry Concerning Human Understanding', 12.25, 'img/book2.jpg'));
        gBooks.push(_createBook('Meditationes de prima philosophia', 11.99, 'img/book3.jpg'));
        gBooks.push(_createBook('Ethica', 18.89, 'img/book4.jpg'));
        gBooks.push(_createBook('Utalitarianism', 14.99, 'img/book5.jpg'));
        gBooks.push(_createBook('Philosophische Untersuchungen', 17.89, 'img/book6.jpg'));
        gBooks.push(_createBook('A Treatise Concerning the Principles of Human Knowledge', 16.99, 'img/book7.jpg'));
        gBooks.push(_createBook('The Origins of Totalitarianism', 15.49, 'img/book8.jpg'));
    } else {
        gBooks = books;
    }
    _saveBookstoStorage();
}

function _saveBookstoStorage() {
    saveToStorage('books', gBooks);
}