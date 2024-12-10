document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            messageDiv.textContent = 'Las contraseñas no coinciden';
            messageDiv.classList.remove('hidden', 'text-green-600');
            messageDiv.classList.add('text-red-600');
            return;
        }

        const token = window.location.pathname.split('/').pop();
        
        fetch(`/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = data.message;
                messageDiv.classList.remove('hidden', 'text-red-600');
                messageDiv.classList.add('text-green-600');
                form.reset();
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
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

