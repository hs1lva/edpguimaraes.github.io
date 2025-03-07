document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar notícias
    function loadNews() {
        const newsGrid = document.getElementById('newsGrid');
        const newsTable = document.getElementById('newsTable').getElementsByTagName('tbody')[0];
        const news = JSON.parse(localStorage.getItem('news')) || [];
        
        // Atualizar página inicial
        newsGrid.innerHTML = news.map((item, index) => `
            <div class="card">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.content}</p>
                    <button onclick="editNews(${index})">Editar</button>
                    <button onclick="deleteNews(${index})">Apagar</button>
                </div>
            </div>
        `).join('');

        // Atualizar painel de admin
        newsTable.innerHTML = news.map((item, index) => `
            <tr>
                <td>${item.title}</td>
                <td>
                    <button onclick="editNews(${index})">Editar</button>
                    <button onclick="deleteNews(${index})">Apagar</button>
                </td>
            </tr>
        `).join('');
    }

    // Função para carregar eventos
    function loadEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        const eventsTable = document.getElementById('eventsTable').getElementsByTagName('tbody')[0];
        const events = JSON.parse(localStorage.getItem('events')) || [];
        
        // Atualizar página inicial
        eventsGrid.innerHTML = events.map((item, index) => `
            <div class="card">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.content}</p>
                    <span class="card-date">${item.date}</span>
                    <button onclick="editEvent(${index})">Editar</button>
                    <button onclick="deleteEvent(${index})">Apagar</button>
                </div>
            </div>
        `).join('');

        // Atualizar painel de admin
        eventsTable.innerHTML = events.map((item, index) => `
            <tr>
                <td>${item.title}</td>
                <td>${item.date}</td>
                <td>
                    <button onclick="editEvent(${index})">Editar</button>
                    <button onclick="deleteEvent(${index})">Apagar</button>
                </td>
            </tr>
        `).join('');
    }

    // Função para carregar galeria
    function loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        const adminGalleryGrid = document.getElementById('adminGalleryGrid');
        const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
        
        // Atualizar página inicial
        galleryGrid.innerHTML = gallery.map((item, index) => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.category}">
                <div class="gallery-item-overlay">
                    <h4>${item.category}</h4>
                    <button onclick="deletePhoto(${index})">Remover</button>
                </div>
            </div>
        `).join('');

        // Atualizar painel de admin
        adminGalleryGrid.innerHTML = gallery.map((item, index) => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.category}">
                <div class="gallery-item-overlay">
                    <h4>${item.category}</h4>
                    <button onclick="deletePhoto(${index})">Remover</button>
                </div>
            </div>
        `).join('');
    }

    // Função para editar notícia
    window.editNews = function(index) {
        const news = JSON.parse(localStorage.getItem('news')) || [];
        const item = news[index];
        document.getElementById('news-title').value = item.title;
        document.getElementById('news-content').value = item.content;
        deleteNews(index);
    };

    // Função para apagar notícia
    window.deleteNews = function(index) {
        const news = JSON.parse(localStorage.getItem('news')) || [];
        news.splice(index, 1);
        localStorage.setItem('news', JSON.stringify(news));
        loadNews();
    };

    // Função para editar evento
    window.editEvent = function(index) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const item = events[index];
        document.getElementById('event-title').value = item.title;
        document.getElementById('event-date').value = item.date;
        document.getElementById('event-content').value = item.content;
        deleteEvent(index);
    };

    // Função para apagar evento
    window.deleteEvent = function(index) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        loadEvents();
    };

    // Função para remover foto
    window.deletePhoto = function(index) {
        const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
        gallery.splice(index, 1);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        loadGallery();
    };

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