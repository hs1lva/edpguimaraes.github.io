// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgWfCi3NnhHaiZfc23oD2ke39Qs1FJ5So",
    authDomain: "edpguimaraes-e73f8.firebaseapp.com",
    projectId: "edpguimaraes-e73f8",
    storageBucket: "edpguimaraes-e73f8.appspot.com",
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
                          <button onclick="deleteNews('${doc.id}')">Apagar</button>
                          <button onclick="editNews('${doc.id}')">Editar</button>
                      </div>
                  </div>
              `;
          });
      }).catch((error) => {
          console.error("Erro ao carregar notícias: ", error);
      });
  }
  
  // Função para adicionar notícia
  document.getElementById('addNewsForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('news-title').value;
      const content = document.getElementById('news-content').value;
      
      db.collection('news').add({ title, content })
          .then(() => {
              alert('Notícia adicionada com sucesso!');
              loadNews(); // Recarrega as notícias após adicionar
          })
          .catch((error) => {
              console.error("Erro ao adicionar notícia: ", error);
              alert('Erro ao adicionar notícia. Verifique o console para mais detalhes.');
          });
  });
  
  // Função para apagar notícia
  window.deleteNews = function(id) {
      if (confirm("Tem certeza que deseja apagar esta notícia?")) {
          db.collection('news').doc(id).delete()
              .then(() => {
                  alert('Notícia apagada com sucesso!');
                  loadNews(); // Recarrega as notícias após apagar
              })
              .catch((error) => {
                  console.error("Erro ao apagar notícia: ", error);
                  alert('Erro ao apagar notícia. Verifique o console para mais detalhes.');
              });
      }
  };
  
  // Função para editar notícia
  window.editNews = function(id) {
      const newTitle = prompt("Digite o novo título:");
      const newContent = prompt("Digite o novo conteúdo:");
      
      if (newTitle && newContent) {
          db.collection('news').doc(id).update({ title: newTitle, content: newContent })
              .then(() => {
                  alert('Notícia editada com sucesso!');
                  loadNews(); // Recarrega as notícias após editar
              })
              .catch((error) => {
                  console.error("Erro ao editar notícia: ", error);
                  alert('Erro ao editar notícia. Verifique o console para mais detalhes.');
              });
      }
  };
  
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
                          <button onclick="deleteEvent('${doc.id}')">Apagar</button>
                          <button onclick="editEvent('${doc.id}')">Editar</button>
                      </div>
                  </div>
              `;
          });
      }).catch((error) => {
          console.error("Erro ao carregar eventos: ", error);
      });
  }
  
  // Função para adicionar evento
  document.getElementById('addEventForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('event-title').value;
      const date = document.getElementById('event-date').value;
      const content = document.getElementById('event-content').value;
      
      db.collection('events').add({ title, date, content })
          .then(() => {
              alert('Evento adicionado com sucesso!');
              loadEvents(); // Recarrega os eventos após adicionar
          })
          .catch((error) => {
              console.error("Erro ao adicionar evento: ", error);
              alert('Erro ao adicionar evento. Verifique o console para mais detalhes.');
          });
  });
  
  // Função para apagar evento
  window.deleteEvent = function(id) {
      if (confirm("Tem certeza que deseja apagar este evento?")) {
          db.collection('events').doc(id).delete()
              .then(() => {
                  alert('Evento apagado com sucesso!');
                  loadEvents(); // Recarrega os eventos após apagar
              })
              .catch((error) => {
                  console.error("Erro ao apagar evento: ", error);
                  alert('Erro ao apagar evento. Verifique o console para mais detalhes.');
              });
      }
  };
  
  // Função para editar evento
  window.editEvent = function(id) {
      const newTitle = prompt("Digite o novo título:");
      const newDate = prompt("Digite a nova data (YYYY-MM-DD):");
      const newContent = prompt("Digite a nova descrição:");
      
      if (newTitle && newDate && newContent) {
          db.collection('events').doc(id).update({ title: newTitle, date: newDate, content: newContent })
              .then(() => {
                  alert('Evento editado com sucesso!');
                  loadEvents(); // Recarrega os eventos após editar
              })
              .catch((error) => {
                  console.error("Erro ao editar evento: ", error);
                  alert('Erro ao editar evento. Verifique o console para mais detalhes.');
              });
      }
  };
  
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
                          <button onclick="deletePhoto('${doc.id}')">Remover</button>
                      </div>
                  </div>
              `;
          });
      }).catch((error) => {
          console.error("Erro ao carregar galeria: ", error);
      });
  }
  
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
                      loadGallery(); // Recarrega a galeria após adicionar
                  })
                  .catch((error) => {
                      console.error("Erro ao carregar foto: ", error);
                      alert('Erro ao carregar foto. Verifique o console para mais detalhes.');
                  });
          };
          reader.readAsDataURL(image);
      });
  });
  
  // Função para remover foto
  window.deletePhoto = function(id) {
      if (confirm("Tem certeza que deseja remover esta foto?")) {
          db.collection('gallery').doc(id).delete()
              .then(() => {
                  alert('Foto removida com sucesso!');
                  loadGallery(); // Recarrega a galeria após remover
              })
              .catch((error) => {
                  console.error("Erro ao remover foto: ", error);
                  alert('Erro ao remover foto. Verifique o console para mais detalhes.');
              });
      }
  };
  
  // Carregar dados ao abrir a página
  loadNews();
  loadEvents();
  loadGallery();