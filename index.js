let bookarr = [];
let authorarr = [];
let qtyarr = [];
let currqtyarr = [];

class Book {
    constructor(name, author, qty) {
        this.name = name;
        this.author = author;
        this.qty = qty;
        this.curr_qty = qty;
    }
}


class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.qty}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2 || book.qty == 0) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);

    }
}


let cnt = 0;

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);




function libraryFormSubmit(e) {

    console.log('Yuu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let qty = document.getElementById('qty').value;

    let book = new Book(name, author, qty);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        let flag = 0;
        let p;

        for (var i = 0; i < bookarr.length; i++) {
            if (bookarr[i] == name) {
                flag = 1;
                p = i;
                console.log('hi');
            }

            if (bookarr[i] == name && authorarr[i] != author) {
                display.show('danger', 'Sorry you cannot add this book');
                flag = 2;
                break;
            }
        }


        if (flag <= 1) {

            display.add(book);
            display.clear();
            display.show('success', 'Your book has been successfully added');

        }

        console.log('j');


        if (flag == 1) {
            console.log('hi');

            let x = qtyarr[p];
            qty = parseInt(qty);
            x = parseInt(x);
            x += qty;
            x = x.toString();

            qtyarr[p] = x;

            x = currqtyarr[p];
            x = parseInt(x);
            x += qty;
            x = x.toString();

            currqtyarr[p] = x;

            localStorage.setItem("qtyar", JSON.stringify(qtyarr));
            localStorage.setItem("currqtyar", JSON.stringify(currqtyarr));
        }

        else if (flag == 0) {

            bookarr.push(name);
            localStorage.setItem("bookar", JSON.stringify(bookarr));

            authorarr.push(author);
            localStorage.setItem("authorar", JSON.stringify(authorarr));

            qtyarr.push(qty);
            localStorage.setItem("qtyar", JSON.stringify(qtyarr));

            currqtyarr.push(qty);
            localStorage.setItem("currqtyar", JSON.stringify(currqtyarr));

        }


    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
