//Accordian button
const accordion = document.getElementsByClassName("container");

for (x=0; x<accordion.length; x++) {
    accordion[x].addEventListener("click", function () {
    this.classList.toggle("active")
    })
}
