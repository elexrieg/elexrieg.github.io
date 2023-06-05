// Scroll back to top
let mybutton = document.getElementById("my-button");
window.onscroll = function() {buttonPresence()};

function buttonPresence() {
    if (document.body.scrollTop >= 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrollBackToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}