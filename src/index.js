import './css/index.css';
import './images/';


document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            navbar.classList.add("visible");
        } else {
            navbar.classList.remove("visible");
        }
    });
});
