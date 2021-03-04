var individualBorrowerInfo = document.getElementById("individualBorrowerInfo")
var borrowerForm = document.getElementById("singleBorrowerUpdate")
var borrowerUpdateButton = document.getElementById("borrowerUpdateButton")
var borrowerUpdateCloser = document.getElementById("borrowerUpdateCloser")
var borrowerDeleter = document.getElementById("borrowerDeleteButton")


function showUpdateForm() {
  individualBorrowerInfo.style.display = "none";
  borrowerUpdateButton.style.display = "none";
  borrowerForm.style.display = "block";
  borrowerUpdateCloser.style.display = "block";
  borrowerDeleter.style.display = "none";
}


function closeUpdateForm() {
  individualBorrowerInfo.style.display = "block";
  borrowerForm.style.display = "none";
  borrowerUpdateCloser.style.display = "none";
  borrowerUpdateButton.style.display = "block";
  borrowerDeleter.style.display = "block";

}
