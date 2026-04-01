let films = [];

// Загрузка данных [cite: 58]
async function loadFilms() {
    try {
        const response = await fetch('films_data.json');
        films = await response.json();
        displayFilms(films);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function displayFilms(data) {
    const container = document.getElementById('filmContainer');
    container.innerHTML = data.map(film => `
        <div class="film-card">
            <h3>${film.title}</h3>
            <p><strong>Year:</strong> ${film.release_year}</p>
            <p><strong>Director:</strong> ${film.director}</p>
            <p class="revenue">$${film.box_office.toLocaleString()}</p>
            <p><small>Country: ${film.country}</small></p>
        </div>
    `).join('');
}

// Сортировка [cite: 54, 81]
function sortData(key) {
    const sorted = [...films].sort((a, b) => b[key] - a[key]);
    displayFilms(sorted);
}

// Поиск (фильтрация)
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = films.filter(f => f.title.toLowerCase().includes(term));
    displayFilms(filtered);
});

loadFilms();
