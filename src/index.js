import './css/index.css';
import { parseCSV, filterAndDisplay, populateFilters } from './filter.js';


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


fetch('./data/projects.csv')
  .then(res => res.text())
  .then(csv => {
    const projects = parseCSV(csv);
    populateFilters(projects);
    setupListeners(projects);
    filterAndDisplay(projects);
  });

function setupListeners(projects) {
  document.querySelectorAll('#filters input[type="checkbox"]').forEach(box =>
    box.addEventListener('change', () => filterAndDisplay(projects))
  );
}
