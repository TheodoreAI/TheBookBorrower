
// this function exports the fullName

const deleteBorrowerQuery = () => {
    var fullNameBorrower = document.getElementById("updateForm").elements[0].value;
    console.log(fullNameBorrower, "Does this work?")
    return fullNameBorrower;
}


// alerts the deletion before it happens
function alertDeletion (){
    var borrowerForm= document.getElementById("updateForm");
    var booleanConfirmTxt;
    

    var msg = confirm("Are you sure you want to delete the following borrower? " + borrowerForm.elements[0].value);

    // if the Lender still wants to delete then it calls the deleteBorrowerQuery function and confirms
    if(msg == true){

        // first promise to get the full name from the first function
        const confirmPromise = deleteBorrowerQuery().then(function(returnedFullName) {
            return returnedFullName
        }).then(function displayMessage(returnedFullName) {
              booleanConfirmTxt = alert("You Deleted " + returnedFullName);
        }).catch(function(error) {
            console.log("Error with the Promsise to Delete", error.message);
        })
      
    }else{
        booleanConfirmTxt = alert("Deletion Cancelled!");
    }
}




module.exports = {
    deleteBorrowerQuery
}