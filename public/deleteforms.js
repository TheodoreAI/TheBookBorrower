



// alerts the deletion before it happens
function alertDeletion (){
    var deleteBorrowerForm = document.getElementById("deleteBorrowerForm");

    // gets the full name and the email

    var msg = confirm("Are you sure you want to delete the following borrower " + deleteBorrowerForm.elements[1]);

    // if the Lender still wants to delete then it calls the deleteBorrowerQuery function and confirms
    if(msg == true){

        alert("You will delete", deleteBorrowerForm.elements[1]);
      
    }else{
        booleanConfirmTxt = alert("Deletion Cancelled!");
       

    }
}





