async function loadData(key, file) {
    const localData = localStorage.getItem(key);
    if (localData) {
        return JSON.parse(localData);
    } else {
        const response = await fetch(file);
        const data = await response.json();
        localStorage.setItem(key, JSON.stringify(data));
        return data;
    }
}

async function displayBooks() {
    const books = await loadData('books', 'data/books.json');
    const tableBody = document.querySelector('#books-table tbody');
    tableBody.innerHTML = '';

    books.forEach((book) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${book.cover}" alt="Couverture de ${book.title}" class="book-cover"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.status}</td>
            <td>
                ${book.status === 'Disponible' 
                    ? `<button onclick="borrowBook(${book.id})">Emprunter</button>` 
                    : `<button onclick="returnBook(${book.id})">Rendre</button>`}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function borrowBook(bookId) {
    const books = await loadData('books', 'data/books.json');
    const book = books.find(b => b.id === bookId);
    if (book && book.status === 'Disponible') {
        book.status = 'Emprunté';
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
}

async function returnBook(bookId) {
    const books = await loadData('books', 'data/books.json');
    const book = books.find(b => b.id === bookId);
    if (book && book.status === 'Emprunté') {
        book.status = 'Disponible';
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
}

if (location.pathname.includes('membres.html') || location.pathname.includes('admin.html')) {
    displayBooks();
}
