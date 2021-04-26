//Carousel
var counter=1;
setInterval(function(){
  document.getElementById('radio' + counter).checked=true;
  counter++;
  if(counter>3){
    counter=1;
  }
}, 5000);


// Responsive-TopNav
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

//   $(document).ready(function(){
//     $('li').click(function() {
//     $("li.active").removeClass("active");
//     $(this).addClass('active');
// });

  // $(".nav-item").on("click", function(e) {
  //   $(".nav-item").removeClass("active");
  //   $(this).addClass("active");
  //   // e.preventDefault();
  // });

  $(function() {
    $('topnav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
  });