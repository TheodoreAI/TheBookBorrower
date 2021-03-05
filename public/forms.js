// This is where the dynamic elements of the forms will be located.

var formAdd = document.getElementById("bookForm");
var formButton = document.getElementById("submitBook")

var borrowBook = document.getElementById("status");
if (borrowBook){
    if (borrowBook.nodeValue == "Yes"){
        console.log("Who is renting it?")
    }
}

formButton.setAttribute('onclick', "return confirm('Are you sure you want to add this book?');");
// this will change the form to add the author and the genre of the book:




// making the form appear/disappear

document.getElementById("bookFormDiv").setAttribute('style', 'display: None');

document.getElementById("bookAuthorFormDiv").setAttribute('Style', 'display: None');

document.getElementById("authorFormDiv").setAttribute('style', 'display: None');

document.getElementById("genreBookFormDiv").setAttribute('style', 'display: None');

document.getElementById("publisherFormDiv").setAttribute('style', 'display: None');

document.getElementById("nationalityFormDiv").setAttribute('style', 'display: None');

document.getElementById("languageFormDiv").setAttribute('style', 'display: None');

document.getElementById("genreFormDiv").setAttribute('style', 'display: None');




function openForm() {
    document.getElementById("bookFormDiv").style.display = "block";
}

function closeForm() {
    document.getElementById("bookFormDiv").style.display = "none";
}

function openBookAuthorForm() {
    document.getElementById("bookAuthorFormDiv").style.display = "block";
}


function closeBookAuthorForm() {
    document.getElementById("bookAuthorFormDiv").style.display = "none";
}

function openGenreBookForm() {
    document.getElementById("genreBookFormDiv").style.display = "block";

}

function closeGenreBookForm() {
    document.getElementById("genreBookFormDiv").style.display = "none";
}




function openAuthorForm(){
    document.getElementById("authorFormDiv").style.display = "block";
}


function closeAuthorForm(){
    document.getElementById("authorFormDiv").style.display = "none";
}


function openBorrowForm(){
    document.getElementById("borrowFormDiv").style.display = "block";
}

function closeBorrowForm(){
    document.getElementById("borrowFormDiv").style.display = "none";
}

function openPublisherForm(){
    document.getElementById("publisherFormDiv").style.display = "block";
}

function closePublisherForm(){
    document.getElementById("publisherFormDiv").style.display = "none";
}

function openNationalityForm(){
    document.getElementById("nationalityFormDiv").style.display = "block";
}

function closeNationalityForm(){
    document.getElementById("nationalityFormDiv").style.display = "none";
}

function openLanguageForm(){
    document.getElementById("languageFormDiv").style.display = "block";
}

function closeLanguageForm(){
    document.getElementById("languageFormDiv").style.display = "none";
}

function openGenreForm(){
    document.getElementById("genreFormDiv").style.display = "block";
}

function closeGenreForm(){
    document.getElementById("genreFormDiv").style.display = "none";
}
appearBtn.setAttribute("onclick", "closeForm()")
formAdd.appendChild(appearBtn);


// Event handlers for submitting the forms:

function displaySuccessMsg(event){
    window.alert("The Author was successfully Added!");
    location.reload();
}
const form = document.getElementById('authorForm');
form.addEventListener('submit', displaySuccessMsg);


function changeForm() {
    formAdd.setAttribute('style', 'display: None');
}

formAdd.addEventListener("submit", changeForm);
