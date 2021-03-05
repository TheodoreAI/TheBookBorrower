function alertDeletion (){
    var borrowerForm= document.getElementById("updateForm");
    var booleanConfirmTxt;
    var fullNameBorrower = document.getElementById("updateForm").elements[0].value;

    var msg = confirm("Are you sure you want to delete the following borrower? " + borrowerForm.elements[0].value);

    if(msg == true){

        deleteBorrowerQuery();
        booleanConfirmTxt = alert("You Deleted " + fullNameBorrower);
    }else{
        booleanConfirmTxt = alert("Deletion Cancelled!");
    }
}