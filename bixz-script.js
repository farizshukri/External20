// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())
            .then(data => {
                responseMessage.textContent = data.message || 'Message sent successfully';
                contactForm.reset();
            })
            .catch(error => {
                responseMessage.textContent = 'An error occurred';
            });
        });
    }
});
