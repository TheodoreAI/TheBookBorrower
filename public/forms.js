// This is where the dynamic elements of the forms will be located.

var formAdd = document.getElementById("bookForm");
var formButton = document.getElementById("submitBook")

var borrowBook = document.getElementById("status");
if (borrowBook){
    if (borrowBook.nodeValue == "Yes"){
        console.log("WHo is renting it?")
    }
}

formButton.setAttribute('onclick', "return confirm('Are you sure you want to add this book?');");


// making the form appear/disappear

document.getElementById("bookFormDiv").setAttribute('style', 'display: None');

function openForm() {
    document.getElementById("bookFormDiv").style.display = "block";
}

function closeForm() {
    document.getElementById("bookFormDiv").style.display = "none";
}


function openAuthorForm(){
    document.getElementById("authorForm").style.display = "block";
}


function closeAuthorForm(){
    document.getElementById("authorForm").style.display = "none";
}


function openBorrowForm(){
    document.getElementById("borrowForm").style.display = "block";
}

function closeBorrowForm(){
    document.getElementById("borrowForm").style.display = "none";
}
// appearBtn.setAttribute("onclick", "closeForm()")
// formAdd.appendChild(appearBtn);


