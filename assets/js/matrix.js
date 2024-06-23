document.addEventListener("DOMContentLoaded", function() {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=]['\;/.,";
    
    headings.forEach(heading => {
        heading.addEventListener("mouseover", function(event) {
            const originalText = heading.innerText;
            const textArray = originalText.split("");
            const scrambleDuration = 300;
            let scrambleInterval;

            scrambleInterval = setInterval(() => {
                heading.innerText = textArray.map(char => chars[Math.floor(Math.random() * chars.length)]).join("");
            }, 50);

            setTimeout(() => {
                clearInterval(scrambleInterval);
                heading.innerText = originalText;
            },	scrambleDuration);
        });
    });
});

