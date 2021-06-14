var hamburger = document.querySelector('.hamburger');
var menuActive = false;

hamburger.addEventListener("click", function() {
    hamburger.classList.toggle('is-active');
    ToggleMenu();
});

function ToggleMenu() {
    var menu = document.querySelector('.menu');
    if (menu.style.display === 'inline') {
        menu.style.display = "none";
    }
    else 
    {
        menu.style.display = 'inline';
    }
}

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});