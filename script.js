document.addEventListener('DOMContentLoaded', function() {
    // Filtros da galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Obter a categoria do botão clicado
            const category = this.textContent.toLowerCase();
            
            // Mostrar ou ocultar itens da galeria com base na categoria
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'todos' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});