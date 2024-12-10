document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('restablecerForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        fetch('/api/auth/restablecer-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = data.message;
                messageDiv.classList.remove('hidden', 'text-red-600');
                messageDiv.classList.add('text-green-600');
                form.reset();
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = `Error: ${error.message}`;
            messageDiv.classList.remove('hidden', 'text-green-600');
            messageDiv.classList.add('text-red-600');
        });
    });
});

