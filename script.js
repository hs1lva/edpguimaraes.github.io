// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgWfCi3NnhHaiZfc23oD2ke39Qs1FJ5So",
    authDomain: "edpguimaraes-e73f8.firebaseapp.com",
    projectId: "edpguimaraes-e73f8",
    storageBucket: "edpguimaraes-e73f8.firebasestorage.app",
    messagingSenderId: "162429006984",
    appId: "1:162429006984:web:09447878beb76e96a8db3d",
    measurementId: "G-M0H73YGP4G"
  };
  
  // Inicialize o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Função para carregar notícias
  function loadNews() {
      const newsGrid = document.getElementById('newsGrid');
      db.collection('news').get().then((querySnapshot) => {
          newsGrid.innerHTML = '';
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              newsGrid.innerHTML += `
                  <div class="card">
                      <div class="card-content">
                          <h3 class="card-title">${data.title}</h3>
                          <p class="card-text">${data.content}</p>
                      </div>
                  </div>
              `;
          });
      });
  }
  
  // Função para carregar eventos
  function loadEvents() {
      const eventsGrid = document.getElementById('eventsGrid');
      db.collection('events').get().then((querySnapshot) => {
          eventsGrid.innerHTML = '';
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              eventsGrid.innerHTML += `
                  <div class="card">
                      <div class="card-content">
                          <h3 class="card-title">${data.title}</h3>
                          <p class="card-text">${data.content}</p>
                          <span class="card-date">${data.date}</span>
                      </div>
                  </div>
              `;
          });
      });
  }
  
  // Função para carregar galeria
  function loadGallery() {
      const galleryGrid = document.getElementById('galleryGrid');
      db.collection('gallery').get().then((querySnapshot) => {
          galleryGrid.innerHTML = '';
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              galleryGrid.innerHTML += `
                  <div class="gallery-item" data-category="${data.category}">
                      <img src="${data.image}" alt="${data.category}">
                      <div class="gallery-item-overlay">
                          <h4>${data.category}</h4>
                      </div>
                  </div>
              `;
          });
      });
  }
  
  // Carregar dados ao abrir a página
  loadNews();
  loadEvents();
  loadGallery();
  
  // Função para adicionar notícia
  document.getElementById('addNewsForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('news-title').value;
      const content = document.getElementById('news-content').value;
      db.collection('news').add({ title, content })
          .then(() => {
              alert('Notícia adicionada com sucesso!');
              loadNews();
          });
  });
  
  // Função para adicionar evento
  document.getElementById('addEventForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('event-title').value;
      const date = document.getElementById('event-date').value;
      const content = document.getElementById('event-content').value;
      db.collection('events').add({ title, date, content })
          .then(() => {
              alert('Evento adicionado com sucesso!');
              loadEvents();
          });
  });
  
  // Função para adicionar fotos à galeria
  document.getElementById('addGalleryForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const category = document.getElementById('gallery-category').value;
      const images = document.getElementById('gallery-images').files;
      Array.from(images).forEach((image) => {
          const reader = new FileReader();
          reader.onload = function(e) {
              db.collection('gallery').add({ category, image: e.target.result })
                  .then(() => {
                      alert('Fotos carregadas com sucesso!');
                      loadGallery();
                  });
          };
          reader.readAsDataURL(image);
      });
  });