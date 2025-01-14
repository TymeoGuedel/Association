// Charger la liste des livres dans la page d'accueil
if (document.getElementById('book-list')) {
    fetch('data/books.json')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('book-list');
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} - ${book.author} (${book.status === "available" ? "Disponible" : "Emprunté"})`;
                bookList.appendChild(li);
            });
        })
        .catch(err => console.error('Erreur chargement livres:', err));

    // Recherche dans la liste des livres
    document.getElementById('search').addEventListener('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const books = document.querySelectorAll('#book-list li');
        books.forEach(book => {
            if (book.textContent.toLowerCase().includes(searchValue)) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });
}

// Gestion des livres pour les membres
if (document.getElementById('member-book-list')) {
    fetch('data/books.json')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('member-book-list');
            books.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${book.title} - ${book.author} (${book.status === "available" ? "Disponible" : "Emprunté"})
                    <button class="delete-book" data-id="${book.id}">Supprimer</button>
                `;
                bookList.appendChild(li);
            });

            // Supprimer un livre
            document.querySelectorAll('.delete-book').forEach(button => {
                button.addEventListener('click', function () {
                    const bookId = this.getAttribute('data-id');
                    console.log(`Livre avec l'ID ${bookId} supprimé (simulation).`);
                });
            });
        })
        .catch(err => console.error('Erreur chargement livres:', err));

    // Ajouter un nouveau livre
    document.getElementById('add-book-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;

        fetch('data/books.json')
            .then(response => response.json())
            .then(books => {
                const newBook = {
                    id: books.length + 1,
                    title: title,
                    author: author,
                    status: "available"
                };

                books.push(newBook);
                console.log('Livre ajouté:', newBook);

                // Ajouter le livre à la liste affichée
                const bookList = document.getElementById('member-book-list');
                const li = document.createElement('li');
                li.innerHTML = `
                    ${newBook.title} - ${newBook.author} (Disponible)
                    <button class="delete-book" data-id="${newBook.id}">Supprimer</button>
                `;
                bookList.appendChild(li);
            })
            .catch(err => console.error('Erreur ajout livre:', err));
    });
}
