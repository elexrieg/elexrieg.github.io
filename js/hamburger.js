document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menu = document.querySelector(".on-this-page");

    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("open");
    });
});