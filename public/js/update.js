navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const coords = [longitude, latitude];
    let url = '/api/user/update';
    fetch(`${url}?token=${localStorage.getItem('accessToken')}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: coords })
    })
    .then(async (response) => {
        const data = await response.json();
        if (data.success === true) {
            console.log('success updated');
        } else {
            console.log('failed to update');
        }
    })
    .catch((err) => {console.log(err)});
})