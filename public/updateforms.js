var individualBorrowerInfo = document.getElementById("individualBorrowerInfo")
var borrowerUpdateForm = document.getElementById("singleBorrowerUpdate")

var individualBookInfo = document.getElementById("individualBookInfo")
var bookUpdateForm = document.getElementById("singleBookUpdate")
var returnOrBorrowButton = document.getElementById("returnOrBorrow")

var updateButton = document.getElementById("updateButton")
var updateCloser = document.getElementById("updateCloser")
var deleter = document.getElementById("deleteButton")

function showBorrowerUpdateForm() {
  individualBorrowerInfo.style.display = "none";
  updateButton.style.display = "none";
  borrowerUpdateForm.style.display = "block";
  updateCloser.style.display = "block";
  deleter.style.display = "none";
}

function closeBorrowerUpdateForm() {
  individualBorrowerInfo.style.display = "block";
  borrowerUpdateForm.style.display = "none";
  updateCloser.style.display = "none";
  updateButton.style.display = "block";
  deleter.style.display = "block";
}

function showBookUpdateForm() {
  individualBookInfo.style.display = "none";
  updateButton.style.display = "none";
  bookUpdateForm.style.display = "block";
  updateCloser.style.display = "block";
  deleter.style.display = "none";
  returnOrBorrowButton.style.display = "none";
}

function closeBookUpdateForm() {
  individualBookInfo.style.display = "block";
  bookUpdateForm.style.display = "none";
  updateCloser.style.display = "none";
  updateButton.style.display = "block";
  deleter.style.display = "block";
  returnOrBorrowButton.style.display = "block";

}
