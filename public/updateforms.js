document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    //Your code to bind event handler

    var bookReturnButton = document.getElementById("returnButton");
    bookReturnButton.setAttribute('onclick', "return confirm('Are you sure you want to return this book?');");

    var updateLanguageButton = document.getElementById("updateLanguageButton");
    updateLanguageButton.setAttribute('onclick', "console.log('hiiiiii')");
});
