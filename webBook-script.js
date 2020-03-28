// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
    const booksList = document.getElementById('books');
    const form = document.getElementById('form');
    const responseMessage = document.getElementById('response-message');

    // Fetch and display books
    function fetchBooks() {
        fetch('http://localhost:5000/api/books')
            .then(response => response.json())
            .then(books => {
                booksList.innerHTML = '';
                books.forEach(book => {
                    const li = document.createElement('li');
                    li.textContent = `${book.title} by ${book.author} (${book.year}) - Genre: ${book.genre}`;
                    booksList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    if (booksList) {
        fetchBooks();
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const year = parseInt(document.getElementById('year').value, 10);
            const genre = document.getElementById('genre').value;

            fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, author, year, genre })
            })
            .then(response => response.json())
            .then(data => {
                responseMessage.textContent = 'Book added successfully!';
                form.reset();
            })
            .catch(error => {
                responseMessage.textContent = 'Error adding book';
                console.error('Error:', error);
            });
        });
    }
});
