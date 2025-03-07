document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar notícias
    function loadNews() {
        const newsGrid = document.getElementById('newsGrid');
        const news = JSON.parse(localStorage.getItem('news')) || [];
        newsGrid.innerHTML = news.map(item => `
            <div class="card">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.content}</p>
                </div>
            </div>
        `).join('');
    }

    // Função para carregar eventos
    function loadEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        const events = JSON.parse(localStorage.getItem('events')) || [];
        eventsGrid.innerHTML = events.map(item => `
            <div class="card">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.content}</p>
                    <span class="card-date">${item.date}</span>
                </div>
            </div>
        `).join('');
    }

    // Função para carregar galeria
    function loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
        galleryGrid.innerHTML = gallery.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.category}">
                <div class="gallery-item-overlay">
                    <h4>${item.category}</h4>
                </div>
            </div>
        `).join('');
    }

    // Carregar dados ao abrir a página
    loadNews();
    loadEvents();
    loadGallery();

    // Adicionar notícia
    document.getElementById('addNewsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('news-title').value;
        const content = document.getElementById('news-content').value;
        const news = JSON.parse(localStorage.getItem('news')) || [];
        news.push({ title, content });
        localStorage.setItem('news', JSON.stringify(news));
        alert('Notícia adicionada com sucesso!');
        loadNews();
    });

    // Adicionar evento
    document.getElementById('addEventForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const content = document.getElementById('event-content').value;
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push({ title, date, content });
        localStorage.setItem('events', JSON.stringify(events));
        alert('Evento adicionado com sucesso!');
        loadEvents();
    });

    // Adicionar fotos à galeria
    document.getElementById('addGalleryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const category = document.getElementById('gallery-category').value;
        const images = document.getElementById('gallery-images').files;
        const gallery = JSON.parse(localStorage.getItem('gallery')) || [];

        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                gallery.push({ category, image: e.target.result });
                localStorage.setItem('gallery', JSON.stringify(gallery));
                loadGallery();
            };
            reader.readAsDataURL(images[i]);
        }

        alert('Fotos carregadas com sucesso!');
    });
});