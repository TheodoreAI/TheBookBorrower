// module.exports = function() {
  console.log("hey borrowers")

  function myFunction() {
      var input, filter, ul, li, a, i, textVal;

      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById('myUL');
      li = ul.getElementsByTagName('li');


      // Now I will loop throhgout all the list items, hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          textVal = a.textContent || a.innerText;

          if (textVal.toUpperCase().indexOf(filter) > -1){

              li[i].style.display = "";
          }
          else{
              li[i].style.display = "none";
          }
      }
  }
// }();
