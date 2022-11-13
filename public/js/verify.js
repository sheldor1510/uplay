window.addEventListener('click', (e) => {
    if (e.target.classList.contains('continue')) {
        let token = document.querySelector('[name="token"]').value;
        if (token == '') {
            alert('Please enter a token.')
        } else {
            let url = '/api/user/verify';
            fetch(`${url}?token=${localStorage.getItem('accessToken')}&verify_token=${token}`).then(res => res.json()).then(data => {
                if (data.success === true) {
                    window.location.href = '/sports';
                } else {
                    alert('Invalid verification token.')
                }
            })
        }
    }
})

window.onload = () => {
    if (localStorage.getItem('accessToken')) {
        let url = '/api/user';
        fetch(`${url}?token=${localStorage.getItem('accessToken')}`).then(res => res.json()).then(data => {
            if (data.verified === true) {
                window.location.href = '/dashboard';
            } else {
                document.getElementsByTagName('body')[0].style.display = 'block'
            }
        }).catch(err => console.log(err));
    } else {
        window.location.href = '/register';
    }
}