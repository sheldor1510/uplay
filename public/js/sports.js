let sports = [];

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('continue')) {
        if (sports.length == 0) {
            alert('Please select at least one sport.')
        } else {
            let url = '/api/user/sports';
            fetch(`${url}?token=${localStorage.getItem('accessToken')}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sports: sports }),
            })
            .then(async (response) => {
                const data = await response.json();
                if (data.success === true) {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/sports'
                }
            })
            .catch((err) => {console.log(err)});
        }
    } else if (e.target.classList.contains('sports-card')) {
        let sport = e.target.getElementsByTagName('p')[0].innerText
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            sports.splice(sports.indexOf(sport), 1);
        } else {
            e.target.classList.add('active');
            sports.push(sport);
        }
        console.log(sports)
    }
})

window.onload = () => {
    if (localStorage.getItem('accessToken')) {
        let url = '/api/user';
        fetch(`${url}?token=${localStorage.getItem('accessToken')}`).then(res => res.json()).then(data => {
            if (data.verified === true && data.sports.length > 0) {
                window.location.href = '/dashboard';
            } else {
                document.getElementsByTagName('body')[0].style.display = 'block'
            }
        }).catch(err => console.log(err));
    } else {
        window.location.href = '/register';
    }
}