//Carousel
var counter = 1;
setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 3) {
        counter = 1;
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

// $(".nav-item").click(function() {
//     $(".nav-item").removeClass("active");
//     $(this).addClass("active");
//     // localStorage.ClassName = "working";
// });

// $(document).ready(function() {
//     SetClass();
// });

// function SetClass() {
//     //before assigning class check local storage if it has any value
//     $("#themecolors li a").addClass(localStorage.ClassName);
// }


// $(".nav-item").on("click", function(e) {
//     $(".nav-item").removeClass("active");
//     $(this).addClass("active");
// });

// $(function() {
//   $('topnav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
// });