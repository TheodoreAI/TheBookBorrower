
// Get the modal
// These tutorials:
// Modal:
// Events: https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/

document.querySelectorAll('.openBorrowerModal').forEach(item => {
  item.addEventListener('click', event => {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Name </th><td>Wally West</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Phone </th><td>562-123-4567</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Email </th><td>Wally@thebookborrower.com</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Current Borrows </th><td>None</td></tr></table>"
    modal.style.display = "block";
  })
})

document.querySelectorAll('.openBookModal').forEach(item => {
  item.addEventListener('click', event => {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>Who is Alex Trebek?: A Biography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author </th><td>Lisa Rogak</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author Nationality</th><td>American</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>256</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Genre(s)</th><td>Non-Fiction, Biography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Publisher </th><td>Thomas Dunne Books</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrowed? </th><td>Yes</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Check Out Date </th><td>2020/01/30</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrower </th><td>Mateo Estrada</td></tr></table>"
    modal.style.display = "block";
  })
})

var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var modal = document.getElementById("myModal");


function inputValues() {

  // This function updates the value of the td
  rowdata = document.createElement('td');
  rowData.setAttribute('id', '1');

  values = document.getElementById('input1');
  if (values.value == ""){
      alert("You must fill this field!");
  }

  else {
    rowData.innerHTML = values.value;
  }

}


function setValueAsInput() {

  // This function will be used to update the values of the td elements.
  firstRow = document.getElementById("1");
  rowData = document.getElementById("data");
  input1 = document.createElement("input");
  stopOnClick = document.getElementById("updateButton");
  stopOnClick.setAttribute("onclick", 'inputValues()');
  input1.setAttribute("value", "The Answer Is... Reflections on My Life");
  input1.setAttribute("id", "input1");
  firstRow.append(input1);
  firstRow.append(stopOnClick);

}


if (example9) {
  example9.onclick = function() {
    var returnConfirmation = confirm("Are you sure you want to return The Answer Is... Reflections on My Life?")
  }
}

if (example10) {
  example10.onclick = function() {
    var returnConfirmation = confirm("Are you sure you want to return Who is Alex Trebek?: A Biography?")
  }

}


if (example12) {
  example12.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="The Basketball Diaries"
    elem.innerHTML = "<form><label for='borrowers'>Choose a borrower:</label><select name='borrowers'><option value='Rhonda Smith'>Rhonda Smith</option><option value='Mateo Estrada'>Mateo Estrada</option></select><input type='submit' value='Submit'></form>"
    modal.style.display = "block";
  }
}



// changing status buttons
var status1 = document.getElementById("status1").innerHTML;
var status2 = document.getElementById("status2").innerHTML;
var status3 = document.getElementById("status3").innerHTML;
var status4 = document.getElementById("status4").innerHTML;
var status5 = document.getElementById("status5").innerHTML;

var status1Button = document.getElementById("status1Button");
var status2Button = document.getElementById("status2Button");
var status3Button = document.getElementById("status3Button");
var status4Button = document.getElementById("status4Button");
var status5Button = document.getElementById("status5Button");


if (status1) {
  if (status1 == "Yes") {
    status1Button.textContent = "Return"
  } else if (status1 == "No") {
    status1Button.textContent = "Borrow"
  }
}

if (status2) {
  if (status2 == "Yes") {
    status2Button.textContent = "Return"
  } else if (status2 == "No") {
    status2Button.textContent = "Borrow"
  }
}

if (status3) {
  if (status3 == "Yes") {
    status3Button.textContent = "Return"
  } else if (status3 == "No") {
    status3Button.textContent = "Borrow"
  }
}

if (status4) {
  if (status4 == "Yes") {
    status4Button.textContent = "Return"
  } else if (status4 == "No") {
    status4Button.textContent = "Borrow"
  }
}

if (status5) {
  if (status5 == "Yes") {
    status5Button.textContent = "Return"
  } else if (status5 == "No") {
    status5Button.textContent = "Borrow"
  }
}
