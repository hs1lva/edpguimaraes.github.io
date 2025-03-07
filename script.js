// Importe as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para carregar notícias
async function loadNews() {
    const newsTable = document.getElementById('newsTable').getElementsByTagName('tbody')[0];
    const querySnapshot = await getDocs(collection(db, 'news'));
    newsTable.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        newsTable.innerHTML += `
            <tr>
                <td>${data.title}</td>
                <td>
                    <button onclick="editNews('${doc.id}')">Editar</button>
                    <button onclick="deleteNews('${doc.id}')">Apagar</button>
                </td>
            </tr>
        `;
    });
}

// Função para adicionar notícia
document.getElementById('addNewsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    
    try {
        await addDoc(collection(db, 'news'), { title, content });
        alert('Notícia adicionada com sucesso!');
        loadNews(); // Recarrega as notícias após adicionar
    } catch (error) {
        console.error("Erro ao adicionar notícia: ", error);
        alert('Erro ao adicionar notícia. Verifique o console para mais detalhes.');
    }
});

// Função para apagar notícia
window.deleteNews = async function(id) {
    if (confirm("Tem certeza que deseja apagar esta notícia?")) {
        try {
            await deleteDoc(doc(db, 'news', id));
            alert('Notícia apagada com sucesso!');
            loadNews(); // Recarrega as notícias após apagar
        } catch (error) {
            console.error("Erro ao apagar notícia: ", error);
            alert('Erro ao apagar notícia. Verifique o console para mais detalhes.');
        }
    }
};

// Função para editar notícia
window.editNews = async function(id) {
    const newTitle = prompt("Digite o novo título:");
    const newContent = prompt("Digite o novo conteúdo:");
    
    if (newTitle && newContent) {
        try {
            await updateDoc(doc(db, 'news', id), { title: newTitle, content: newContent });
            alert('Notícia editada com sucesso!');
            loadNews(); // Recarrega as notícias após editar
        } catch (error) {
            console.error("Erro ao editar notícia: ", error);
            alert('Erro ao editar notícia. Verifique o console para mais detalhes.');
        }
    }
};

// Função para carregar eventos
async function loadEvents() {
    const eventsTable = document.getElementById('eventsTable').getElementsByTagName('tbody')[0];
    const querySnapshot = await getDocs(collection(db, 'events'));
    eventsTable.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        eventsTable.innerHTML += `
            <tr>
                <td>${data.title}</td>
                <td>${data.date}</td>
                <td>
                    <button onclick="editEvent('${doc.id}')">Editar</button>
                    <button onclick="deleteEvent('${doc.id}')">Apagar</button>
                </td>
            </tr>
        `;
    });
}

// Função para adicionar evento
document.getElementById('addEventForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const content = document.getElementById('event-content').value;
    
    try {
        await addDoc(collection(db, 'events'), { title, date, content });
        alert('Evento adicionado com sucesso!');
        loadEvents(); // Recarrega os eventos após adicionar
    } catch (error) {
        console.error("Erro ao adicionar evento: ", error);
        alert('Erro ao adicionar evento. Verifique o console para mais detalhes.');
    }
});

// Função para apagar evento
window.deleteEvent = async function(id) {
    if (confirm("Tem certeza que deseja apagar este evento?")) {
        try {
            await deleteDoc(doc(db, 'events', id));
            alert('Evento apagado com sucesso!');
            loadEvents(); // Recarrega os eventos após apagar
        } catch (error) {
            console.error("Erro ao apagar evento: ", error);
            alert('Erro ao apagar evento. Verifique o console para mais detalhes.');
        }
    }
};

// Função para editar evento
window.editEvent = async function(id) {
    const newTitle = prompt("Digite o novo título:");
    const newDate = prompt("Digite a nova data (YYYY-MM-DD):");
    const newContent = prompt("Digite a nova descrição:");
    
    if (newTitle && newDate && newContent) {
        try {
            await updateDoc(doc(db, 'events', id), { title: newTitle, date: newDate, content: newContent });
            alert('Evento editado com sucesso!');
            loadEvents(); // Recarrega os eventos após editar
        } catch (error) {
            console.error("Erro ao editar evento: ", error);
            alert('Erro ao editar evento. Verifique o console para mais detalhes.');
        }
    }
};

// Função para carregar galeria
async function loadGallery() {
    const adminGalleryGrid = document.getElementById('adminGalleryGrid');
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    adminGalleryGrid.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        adminGalleryGrid.innerHTML += `
            <div class="gallery-item" data-category="${data.category}">
                <img src="${data.image}" alt="${data.category}">
                <div class="gallery-item-overlay">
                    <h4>${data.category}</h4>
                    <button onclick="deletePhoto('${doc.id}')">Remover</button>
                </div>
            </div>
        `;
    });
}

// Função para adicionar fotos à galeria
document.getElementById('addGalleryForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const category = document.getElementById('gallery-category').value;
    const images = document.getElementById('gallery-images').files;
    
    Array.from(images).forEach((image) => {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                await addDoc(collection(db, 'gallery'), { category, image: e.target.result });
                alert('Fotos carregadas com sucesso!');
                loadGallery(); // Recarrega a galeria após adicionar
            } catch (error) {
                console.error("Erro ao carregar foto: ", error);
                alert('Erro ao carregar foto. Verifique o console para mais detalhes.');
            }
        };
        reader.readAsDataURL(image);
    });
});

// Função para remover foto
window.deletePhoto = async function(id) {
    if (confirm("Tem certeza que deseja remover esta foto?")) {
        try {
            await deleteDoc(doc(db, 'gallery', id));
            alert('Foto removida com sucesso!');
            loadGallery(); // Recarrega a galeria após remover
        } catch (error) {
            console.error("Erro ao remover foto: ", error);
            alert('Erro ao remover foto. Verifique o console para mais detalhes.');
        }
    }
};

// Carregar dados ao abrir a página
loadNews();
loadEvents();
loadGallery();