// Get the modal




var modal = document.getElementById("myModal");

// Get the button that opens the modal
var example1 = document.getElementById("openModal1");
var example2 = document.getElementById("openModal2");
var example3 = document.getElementById("openModal3");
var example4 = document.getElementById("openModal4");
var example5 = document.getElementById("openModal5");
var example6 = document.getElementById("openModal6");
var example7 = document.getElementById("openModal7");
var example8 = document.getElementById("openModal8");
var example9 = document.getElementById("status1Button");
var example10 = document.getElementById("status2Button");
var example11 = document.getElementById("status3Button");
var example12 = document.getElementById("status4Button");
var example13 = document.getElementById("status5Button");
var example14 = document.getElementById("openModal9");
var example15 = document.getElementById("openModal10");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



function inputValues() {

  // This function updates the value of the td
  rowdata = document.createElement('td');
  rowData.setAttribute('id', '1');

  values = document.getElementById('input1');
  rowData.innerHTML = values.value;



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





// When the user clicks on the button, open the modal
if (example1) {
  example1.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>The Answer Is... Reflections on My Life</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author(s) </th><td>Alex Trebek</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Nationality of Author(s)</th><td>Canadian</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>297</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Genre(s)</th><td>Non-Fiction, Biography, Autobiography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Publisher </th><td>Simon & Schuster</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrowed? </th><td>Yes</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Check Out Date </th><td>2020/01/30</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrower </th><td>Rhonda Smith</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example2) {
  example2.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>Who is Alex Trebek?: A Biography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author(s) </th><td>Lisa Rogak</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Nationality of Author(s)</th><td>American</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>256</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Genre(s)</th><td>Non-Fiction, Biography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Publisher </th><td>Thomas Dunne Books</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrowed? </th><td>Yes</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Check Out Date </th><td>2020/01/30</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrower </th><td>Mateo Estrada</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example3) {
  example3.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>Portrait of Myself</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author(s) </th><td>Margaret Bourke-White</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Nationality of Author(s)</th><td>American</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>388</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Genre(s)</th><td>Non-Fiction, Biography, Autobiography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Publisher </th><td>Palala Press</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrowed? </th><td>No</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Check Out Date </th><td>None</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrower </th><td>None</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example4) {
  example4.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>The Basketball Diaries</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author(s) </th><td>Jim Carroll</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Nationality of Author(s)</th><td>American</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>224</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Genre(s)</th><td>Non-Fiction, Biography, Autobiography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Publisher </th><td>Penguin Books</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrowed? </th><td>No</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Check Out Date </th><td>None</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrower </th><td>None</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example5) {
  example5.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>A Choice of Weapons</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author(s) </th><td>Gordon Parks</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Nationality of Author(s)</th><td>American</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>192</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Genre(s)</th><td>Non-Fiction, Biography, Autobiography</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Publisher </th><td>Minnesota Historical Society Press</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrowed? </th><td>No</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Check Out Date </th><td>None</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Borrower </th><td>None</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example6) {
  example6.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Name </th><td>Rhonda Smith</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Phone </th><td>123-456-7891</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Email </th><td>rhonda@thebookborrower.com</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Current Borrows </th><td>The Answer Is... Reflections on My Life</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example7) {
  example7.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Name </th><td>Mateo Estrada</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Phone </th><td>987-654-3210</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Email </th><td>mateo@thebookborrower.com</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Current Borrows </th><td>Who is Alex Trebek?: A Biography</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example8) {
  example8.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Name </th><td>Oscar Rascal</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Phone </th><td>123-456-7891</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Email </th><td>rascal@thebookborrower.com</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Current Borrows </th><td>None</td></tr></table>"
    modal.style.display = "block";
  }
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

if (example11) {
  example11.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="Portrait of Myself"
    elem.innerHTML = "<form><label for='borrowers'>Choose a borrower:</label><select name='borrowers'><option value='Rhonda Smith'>Rhonda Smith</option><option value='Mateo Estrada'>Mateo Estrada</option></select><input type='submit' value='Submit'></form>"
    // elem.innerHTML += "<form>"
    // elem.innerHTML += "<label for='borrowers'>Choose a borrower:</label>"
    // elem.innerHTML += "<select name='borrowers'>"
    // elem.innerHTML += "<option value='Rhonda Smith'>Rhonda Smith</option>"
    // elem.innerHTML += "<option value='Mateo Estrada'>Mateo Estrada</option>"
    // elem.innerHTML += "</select>"
    // elem.innerHTML += "<br><br>"
    // elem.innerHTML += "<input type='submit' value='Submit'>"
    // elem.innerHTML += "</form>"
    modal.style.display = "block";
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

if (example13) {
  example13.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="A Choice of Weapons"
    elem.innerHTML = "<form><label for='borrowers'>Choose a borrower:</label><select name='borrowers'><option value='Rhonda Smith'>Rhonda Smith</option><option value='Mateo Estrada'>Mateo Estrada</option></select><input type='submit' value='Submit'></form>"
    modal.style.display = "block";
  }
}

if (example14) {
  example14.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Name </th><td>Barry Allen</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Phone </th><td>415-123-4567</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Email </th><td>barry@thebookborrower.com</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Current Borrows </th><td>None</td></tr></table>"
    modal.style.display = "block";
  }
}

if (example15) {
  example15.onclick = function() {
  elem.innerHTML ="<table><tr><th>Name </th><td>Wally West</td></tr></table>"
  elem.innerHTML +="<table><tr><th>Phone </th><td>562-123-4567</td></tr></table>"
  elem.innerHTML +="<table><tr><th>Email </th><td>Wally@thebookborrower.com</td></tr></table>"
  elem.innerHTML +="<table><tr><th>Current Borrows </th><td>None</td></tr></table>"
  modal.style.display = "block";
  }
}

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
