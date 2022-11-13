window.addEventListener('click', (e) => {
    if (e.target.classList.contains('continue')) {
        u_name = document.querySelector('[name="name"]').value;
        umass_email = document.querySelector('[name="umass-email"]').value;
        password = document.querySelector('[name="password"]').value;
        confirm_password = document.querySelector('[name="confirm-password"]').value;
        phone_number = document.querySelector('[name="phone-number"]').value;
        if (u_name == '' || umass_email == '' || password == '' || confirm_password == '' || phone_number == '') {
            alert('Please fill out all fields.')
        }
        else if (!umass_email.includes('@umass.edu')) {
            alert('Please enter a valid UMass email address.')
        }
        else if (password != confirm_password) {
            alert('Passwords do not match.')
        }
        else if (password.length < 8) {
            alert('Password must be at least 8 characters long.')
        }
        else {
            fetch("/register", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: u_name, umass_email: umass_email, password: password, phone_number: phone_number }),
            })
            .then(async (response) => {
                const data = await response.json();
                if (data.success === true) {
                    localStorage.setItem('accessToken', data.accessToken);
                    window.location.href = '/verify';
                } else {
                    window.location.href = '/register'
                }
            })
            .catch((err) => {console.log(err)});
        }
    }
})

window.onload = () => {
    if (localStorage.getItem('accessToken')) {
        window.location.href = '/dashboard';
    }
    if (window.screen.width > 500) {
        window.location.href= '/phone'
    } else {
        document.getElementsByTagName('body')[0].style.display = 'block'
    }
}