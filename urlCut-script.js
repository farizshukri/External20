// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const shortenForm = document.getElementById('shorten-form');
    const originalUrlInput = document.getElementById('original-url');
    const shortUrlOutput = document.getElementById('short-url');

    shortenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const originalUrl = originalUrlInput.value;

        fetch('http://localhost:5000/api/links/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.shortUrl) {
                shortUrlOutput.textContent = `Shortened URL: ${window.location.origin}/${data.shortUrl}`;
                originalUrlInput.value = '';
            } else {
                shortUrlOutput.textContent = 'Error shortening URL';
            }
        })
        .catch(error => {
            shortUrlOutput.textContent = 'An error occurred';
        });
    });
});
