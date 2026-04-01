let originalFilms = []; 
let currentFilms = []; 
let sortDirections = { release_year: 'none', box_office: 'none' };

async function loadData() {
    try {
        const response = await fetch('films_data.json');
        const data = await response.json();
        originalFilms = JSON.parse(JSON.stringify(data)); 
        currentFilms = [...originalFilms];
        render(currentFilms);
    } catch (e) {
        console.error("Ошибка загрузки JSON:", e);
    }
}

function render(data) {
    const container = document.getElementById('filmContainer');
    if (!container) return; 
    
    container.innerHTML = data.map(f => `
        <div class="film-card">
            <h3>${f.title}</h3>
            <p>Year: ${f.release_year}</p>
            <p><strong>$${(f.box_office / 1e9).toFixed(2)}B</strong></p>
            <p><small>${f.country}</small></p>
        </div>
    `).join('');
}

function toggleSort(key) {
    let direction = sortDirections[key] === 'desc' ? 'asc' : 'desc';

    sortDirections = { release_year: 'none', box_office: 'none' };
    sortDirections[key] = direction;

    currentFilms.sort((a, b) => {
        const valA = Number(a[key]) || 0; 
        const valB = Number(b[key]) || 0;
        return direction === 'desc' ? valB - valA : valA - valB;
    });

    updateUI();
    render(currentFilms);
}

function updateUI() {
    const keys = ['release_year', 'box_office'];
    keys.forEach(key => {
        const btnId = key === 'release_year' ? 'yearBtn' : 'boxBtn';
        const btn = document.getElementById(btnId);
        if (btn) {
            const span = btn.querySelector('span');
            if (span) {
                const dir = sortDirections[key];
                if (dir === 'desc') span.innerText = ' ↓';
                else if (dir === 'asc') span.innerText = ' ↑';
                else span.innerText = ''; 
            }
        }
    });
}

function resetSort() {
    currentFilms = [...originalFilms];
    sortDirections = { release_year: 'none', box_office: 'none' };
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    updateUI();
    render(currentFilms);
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    currentFilms = originalFilms.filter(f => 
        f.title.toLowerCase().includes(term)
    );
    sortDirections = { release_year: 'none', box_office: 'none' };
    updateUI();
    render(currentFilms);
});

loadData();
