export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

export function populateFilters(projects) {
  const languageSet = new Set();
  const classSet = new Set();

  projects.forEach(p => {
    p.language.split(';').forEach(lang => languageSet.add(lang.trim()));
    classSet.add(p.class.trim());
  });

  const langContainer = document.getElementById('languageFilterContainer');
  [...languageSet].forEach((lang, i) => {
    const id = `lang-${i}`;
    langContainer.innerHTML += `
      <input type="checkbox" name="language" value="${lang}" id="${id}" />
      <label for="${id}">${lang}</label>
    `;
  });

  const classContainer = document.getElementById('classFilterContainer');
  [...classSet].forEach((cls, i) => {
    const id = `class-${i}`;
    classContainer.innerHTML += `
      <input type="checkbox" name="class" value="${cls}" id="${id}" />
      <label for="${id}">${cls}</label>
    `;
  });
}


export function filterAndDisplay(projects) {
  const selectedLanguages = [...document.querySelectorAll('input[name="language"]:checked')].map(i => i.value);
  const selectedClasses = [...document.querySelectorAll('input[name="class"]:checked')].map(i => i.value);

  const filtered = projects.filter(p => {
    const langs = p.language.split(';').map(s => s.trim());
    const classMatch = selectedClasses.length === 0 || selectedClasses.includes(p.class.trim());
    const langMatch = selectedLanguages.length === 0 || selectedLanguages.some(sel => langs.includes(sel));
    return langMatch && classMatch;
  });

  const list = document.getElementById('projectList');
  list.innerHTML = filtered.map(p => `
    <div class="project">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><strong>Language:</strong> ${p.language}</p>
      <p><strong>Class:</strong> ${p.class}</p>
      <a href="${p.link}" target="_blank">View</a>
    </div>
  `).join('');
}
