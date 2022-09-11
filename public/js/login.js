const loginForm = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#inputLoginEmail').value.trim();
    const password = document.querySelector('#inputLoginPassword').value.trim();
    if ( email && password ) {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) { 
            document.location.replace('/dashboard');
        } else {
            alert('res.statusText');
        }
    }
};

document.querySelector('.loginForm').addEventListener('submit', loginForm);