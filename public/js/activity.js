const socket = io("/");

socket.on("connect", () => {
    console.log(socket.id);
    fetch(`/api/user/socket?token=${localStorage.getItem('accessToken')}&socket_id=${socket.id}`).then(res => {});
});

socket.on("notif", (info) => {
    let selectedSport = info.sport
    if (info.userId == localStorage.getItem('accessToken')) {
        alert(`Someone wants to play ${selectedSport} with you!`);
        window.location.href = '/activity';
    }
})

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

window.onload = () => {
    let url = `/api/activity?token=${localStorage.getItem('accessToken')}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.reverse();
        data.forEach(activity => {
            let notifName = '';
            let notifSport = '';
            let notifTime = timeSince(new Date(activity.createdAt)) + ' ago';
            let notifPhoneNumber = ''
            
            if (activity.sender_id != localStorage.getItem('accessToken')) {
                notifName = activity.sender_name;
                notifPhoneNumber = activity.sender_phone_number;
            } else {
                notifName = activity.receiver_name;
                notifPhoneNumber = activity.receiver_phone_number;
            }
            notifSport = activity.sport;
            if (notifSport == 'Basketball') {
                notifSport = '🏀 Basketball';
            } else if (notifSport == 'Soccer') {
                notifSport = '⚽ Soccer';
            } else if (notifSport == 'Tennis') {
                notifSport = '🎾 Tennis';
            }
            let notifRightHTML = ''
            console.log(activity._id)
            if (activity.status == 'Requested') {
                if (activity.sender_id != localStorage.getItem('accessToken')) {
                    notifRightHTML = `
                    <div class="tick" id="${activity._id}">
                        <img src="https://cdn.discordapp.com/attachments/766636913343463454/1041205273022439424/image.png">
                    </div>
                    <div class="cross" id="${activity._id}">
                        <img src="https://cdn.discordapp.com/attachments/766636913343463454/1041205360259772436/image.png">
                    </div>`
                } else {
                    notifRightHTML = `<div class="requested"><p>Requested</p></div>`;
                }
            } else if (activity.status == 'Accepted') {
                notifRightHTML = `<div class="phone-number"><p>${notifPhoneNumber}</p></div>`;
            } else if (activity.status == 'Rejected') {
                notifRightHTML = `<div class="rejected"><p>Rejected</p></div>`;
            }

            document.getElementById('act-cards').innerHTML += `
                <div class="act-card">
                <div class="inline">
                    <div class="left">
                        <h1>${notifName}</h1>
                        <p class="sport">${notifSport}</p>
                        <br><br>
                        <p class="time">${notifTime}</p>
                    </div>
                    <div class="right">
                        <div class="inline">
                            ${notifRightHTML}
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    })
}

window.addEventListener('click', (e) => {
    const element = e.target.parentElement;
    if (element.classList.contains('tick')) {
        let id = element.id;
        fetch(`/api/activity/update/${id}?token=${localStorage.getItem('accessToken')}&status=Accepted`).then(res => {
            window.location.href = '/activity';
        })
    } else if (element.classList.contains('cross')) {
        let id = element.id;
        fetch(`/api/activity/update/${id}?token=${localStorage.getItem('accessToken')}&status=Rejected`).then(res => {
            window.location.href = '/activity';
        })
    }
})