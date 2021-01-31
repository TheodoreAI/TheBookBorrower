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

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
if (example1) {
  example1.onclick = function() {
    var elem = document.querySelector('.modal-text')
    elem.innerHTML ="<table><tr><th>Title </th><td>The Answer Is... Reflections on My Life</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Author </th><td>Alex Trebek</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>297</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
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
    elem.innerHTML +="<table><tr><th>Author </th><td>Lisa Rogan</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>256</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
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
    elem.innerHTML +="<table><tr><th>Author </th><td>Margaret Bourke-White</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>388</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
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
    elem.innerHTML +="<table><tr><th>Author </th><td>Jim Carroll</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>224</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
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
    elem.innerHTML +="<table><tr><th>Author </th><td>Gordon Parks</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Pages </th><td>192</td></tr></table>"
    elem.innerHTML +="<table><tr><th>Language </th><td>English</td></tr></table>"
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
