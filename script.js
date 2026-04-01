let originalFilms = [];
let currentFilms = [];
let sortDirections = { release_year: 'none', box_office: 'none' };

async function loadData() {
    const response = await fetch('films_data.json');
    const data = await response.json();
    originalFilms = [...data];
    currentFilms = [...data];
    render(currentFilms);
}

function render(data) {
    const container = document.getElementById('filmContainer');
    container.innerHTML = data.map(f => `
        <div class="film-card">
            <h3>${f.title}</h3>
            <p>Year: ${f.release_year}</p>
            <p><strong>$${(f.box_office / 1e9).toFixed(2)}B</strong></p>
        </div>
    `).join('');
}

function toggleSort(key) {
    const otherKey = key === 'release_year' ? 'box_office' : 'release_year';
    sortDirections[otherKey] = 'none';
    document.getElementById(otherKey === 'release_year' ? 'yearBtn' : 'boxBtn').innerText = 
        (otherKey === 'release_year' ? 'Year' : 'Revenue') + " ↕";

    if (sortDirections[key] === 'desc') {
        sortDirections[key] = 'asc';
        currentFilms.sort((a, b) => a[key] - b[key]);
        updateBtn(key, "▲");
    } else {
        sortDirections[key] = 'desc';
        currentFilms.sort((a, b) => b[key] - a[key]);
        updateBtn(key, "▼");
    }
    render(currentFilms);
}

function updateBtn(key, symbol) {
    const id = key === 'release_year' ? 'yearBtn' : 'boxBtn';
    const label = key === 'release_year' ? 'Year' : 'Revenue';
    document.getElementById(id).innerText = `${label} ${symbol}`;
}

function resetSort() {
    currentFilms = [...originalFilms];
    sortDirections = { release_year: 'none', box_office: 'none' };
    document.getElementById('yearBtn').innerText = "Year ↕";
    document.getElementById('boxBtn').innerText = "Revenue ↕";
    render(currentFilms);
}

loadData();
