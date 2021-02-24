// // The following code was made possible thansk to this:
// // 2/19/2021
// // https://medium.com/javascript-in-plain-english/creating-a-dynamic-html-table-through-javascript-f554fba376cf


// // load the modal content from the main.js page with this eventListener
// document.addEventListener("DOMContentLoaded", modal);

// const tableDiv = document.querySelector("div.DataTable");

// // the table headers for the dynamically built table
// let tableHeaders = ["Title", "Author", "Borrowed", "Current Borrower?", "Action"];


// const createBooksTable = () => {

//     document.addEventListener("DOMContentLoaded", modal);

//     while (tableDiv.firstChild)
//         tableDiv.removeChild(tableDiv.firstChild) // remove any children from the books table

//     let booksTable = document.createElement("table");
//     booksTable.className = "booksTable";

//     let booksTableHead = document.createElement('thead');
//     booksTableHead.className = "booksTableHead";

//     let booksTableHeaderRow = document.createElement('tr');
//     booksTableHeaderRow.className = "booksTableHeaderRow";

//     tableHeaders.forEach(header => {
//         let bookHeader = document.createElement('th');
//         bookHeader.innerHTML = header;
//         booksTableHeaderRow.append(bookHeader);

//     })

//     booksTableHead.append(booksTableHeaderRow);

//     booksTable.append(booksTableHead);

//     let booksTableBody = document.createElement("tbody");

//     booksTableBody.className = "booksTableBody";

//     booksTable.append(booksTableBody);
//     // adding the table:
//     tableDiv.append(booksTable);
// }

// const appendRows = () => {

//     // this function is used to build the title column
//        // get the body of the table
//     const booksTableBody = document.querySelector('.booksTable');
   
//     titles = ["The Answer Is...Reflections on My Life ", "Who is Alex Trebek: A Biography? ",
//          "Portrait of Myself ", "The Basketball Diaries ",
//          "A Choice of Weapons"]
//     authors = ["Alex Trebek ", "Lisa Rogak", "Margaret Bourke-White ", " Jim Carroll ", "Gordon Parks "]


//     borrowed = ["Yes", "Yes", "No", "No", "No"]
//     currentBorrower = ["Rhonda Smith", "Mateo Estrada", " ", " ", " "]
//     action = ["Return", "Return", "Borrow", "Borrow", "Borrow"]



//     for(var i = 0; i< titles.length; i++) {

//         // make the row
//         let booksTableBodyRow = document.createElement('tr');
//         // make the data 
//         let bookTitle = document.createElement('td');

//         //make the anchor
//         let bookTitleAnchor = document.createElement("a");

//         // give the anchor a class name
//         bookTitleAnchor.className = "moreInfo";

//         // insert info into the anchor and data for title

//         bookTitleAnchor.id = "openModal"+(i+1);
//         bookTitleAnchor.innerHTML = titles[i];
//         bookTitleAnchor.setAttribute("href", "#");
//         bookTitle.appendChild(bookTitleAnchor);

//         let bookAuthor = document.createElement('td');
//         bookAuthor.innerHTML = authors[i];

//         let bookBorrower = document.createElement('td');
//         bookBorrower.id = "status"+(1+i);
//         bookBorrower.innerHTML = borrowed[i];


//         let bookCurrentBorrower = document.createElement('td');
//         bookCurrentBorrower.innerHTML = currentBorrower[i];


//         let bookAction = document.createElement('td');
//         let bookActionButton = document.createElement('button');
//         bookActionButton.innerHTML = action[i]; // this is where the boolean will go

//         bookActionButton.className= "Action";
//         bookActionButton.id = "status"+(i+1)+"Button";
//         bookAction.appendChild(bookActionButton);



//         booksTableBodyRow.append(bookTitle, bookAuthor, bookBorrower, 
//             bookCurrentBorrower, bookAction);

//         booksTableBody.append(booksTableBodyRow);
//     };

//     tableDiv.append(booksTableBody);

// }; 





// // load the table
// document.addEventListener("DOMContentLoaded", createBooksTable());
// document.addEventListener("DOMContentLoaded", appendRows());

// // document.addEventListener("DOMContentLoaded", appendBooks());
