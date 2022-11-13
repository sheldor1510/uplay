const socket = io("/");

socket.on("connect", () => {
    console.log(socket.id);
    fetch(`/api/user/socket?token=${localStorage.getItem('accessToken')}&socket_id=${socket.id}`).then(res => {});
});

socket.on("notif", (info) => {
    // { userId: userId, message: 'Someone wants to play with you!', sport: selectedSport }
    let selectedSport = info.sport;
    if (info.userId == localStorage.getItem('accessToken')) {
        alert(`Someone wants to play ${selectedSport} with you!`);
        window.location.href = '/activity';
    }
})

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtcnVkaGlqYWRoYXYiLCJhIjoiY2xhZTlhMW95MG8wczN3cW53dXJoOXp6aCJ9.S7cAxzYiovXR03-anvd4lQ';
let iconSize = [60, 60]
const tennis = {
    'type': 'tennis',
    'features': [
        {
            'type': 'tennis',
            'properties': {
                'name': 'Sumrudhi Jadhav',
                'userID': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.52166457271855, 42.39513175529539]
            }
        },
        {
            'type': 'tennis',
            'properties': {
                'name': 'Shaswat Ganisshan',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.52367118063127, 42.39249822805591]
            }
        },
        {
            'type': 'tennis',
            'properties': {
                'name': 'Shoubhit Ravi',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.5282070862109, 42.38998730809301]
            }
        }
    ]
};

const basketball = {
    'type': 'basketball',
    'features': [
        {
            'type': 'basketball',
            'properties': {
                'name': 'Anshul Saha',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.53377535200424, 42.39066084705216]
            }
        },
        {
            'type': 'basketball',
            'properties': {
                'name': 'Tanush Savadi',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.530782006809, 42.38991599178008]
            }
        },
        {
            'type': 'basketball',
            'properties': {
                'name': 'Rishabh Deepak Devnani',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.5304494128984, 42.388727374635415]
            }
        }
    ]
};

const soccer = {
    'type': 'soccer',
    'features': [
        {
            'type': 'soccer',
            'properties': {
                'name': 'Aadvik Mishra',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.52763845791222, 42.39102534747485]
            }
        },
        {
            'type': 'soccer',
            'properties': {
                'name': 'Sagnik Pal',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.52887227403211, 42.3933787014248]
            }
        },
        {
            'type': 'soccer',
            'properties': {
                'name': 'Anu Sinha',
                'userId': '5f9f1b1b0b1b9c0b8c8c8c8c',
                'iconSize': iconSize
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.5249991642992, 42.39275273373562]
            }
        }
    ]
};

const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-72.52582468991241, 42.39107348551288],
    zoom: 15
});

const removeDuplicates = (sports) => {
    const uniqueSports = [];
    const locations = []
    sports.forEach(sport => {
        sport.features.forEach(marker => {
            if (!locations.includes(marker.geometry.coordinates)) {
                locations.push(marker.geometry.coordinates);
                uniqueSports.push(sport);
            }
        })
    });
    console.log(sports)
    console.log(uniqueSports);
    return uniqueSports;
}

// Add markers to the map
const inflateSports = (sports) => {
    removeMarkers();
    // sports = removeDuplicates(sports);
    sports.forEach((sport, index) => {
        sport.features.forEach(marker => {
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            el.className = 'marker';
            
            el.style.width = `${width}px`;
            if (sport.type == 'tennis') {
                el.style.backgroundImage = `url(http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/tennis.png)`;
            } else if (sport.type == 'basketball') {
                el.style.backgroundImage = `url(https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/basketball-and-hoop_1f3c0.png)`;
            } else if (sport.type == 'soccer') {
                el.style.backgroundImage = `url(https://emojitool.com/img/apple/ios-14.5/soccer-ball-2559.png)`;
            }
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';

            el.addEventListener('click', () => {
                document.getElementById('card-name').innerText = marker.properties.name;
                document.getElementById('card-sport').innerText = marker.type[0].toUpperCase() + marker.type.slice(1);
                document.getElementById('card-user-id').value = marker.properties.userId;
                document.getElementById('card-desc').innerText = `Do you want to play with ${marker.properties.name}?`;
                map.flyTo({
                    center: marker.geometry.coordinates,
                    zoom: 20
                });
                document.getElementById('bottom-card').style.display = 'block'
            });

            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        })
    })
}

const removeMarkers = () => {
    const markers = document.getElementsByClassName('marker');
    while (markers.length > 0) {
        markers[0].parentNode.removeChild(markers[0]);
    }
}

let selectedSport = '';

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('timer')) {
        const sport = e.target.innerText;
        if (selectedSport == sport || selectedSport == '') {
            if (document.getElementById(sport.toLowerCase()).classList.contains('active-top')) {
                selectedSport = '';
                document.getElementById(sport.toLowerCase()).classList.remove('active-top');
            } else {
                selectedSport = sport;
                document.getElementById(sport.toLowerCase()).classList.add('active-top');
            }
            if (selectedSport == '') {
                inflateSports([tennis, basketball, soccer]);
            } else {
                if (selectedSport == 'Tennis') {
                    inflateSports([tennis]);
                } else if (selectedSport == 'Basketball') {
                    inflateSports([basketball]);
                }  else if (selectedSport == 'Soccer') {
                    inflateSports([soccer]);
                }
                map.flyTo({
                    center: [-72.52582468991241, 42.39107348551288],
                    zoom: 15
                })
            }
            // reRender();
        } else {
            document.getElementById(selectedSport.toLowerCase()).classList.remove('active-top');
            selectedSport = sport;
            document.getElementById(sport.toLowerCase()).classList.add('active-top');
            if (selectedSport == 'Tennis') {
                inflateSports([tennis]);
            } else if (selectedSport == 'Basketball') {
                inflateSports([basketball]);
            }  else if (selectedSport == 'Soccer') {
                inflateSports([soccer]);
            }
            map.flyTo({
                center: [-72.52582468991241, 42.39107348551288],
                zoom: 15
            })
        }
    } else if (e.target.classList.contains('respond-button')) {
        if (e.target.id == 'bottom-card-yes-button') {
            let userId = document.getElementById('card-user-id').value;
            fetch('/api/activity/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem('accessToken'),
                    receiver_id: userId,
                    sport: selectedSport
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    socket.emit('notif', { userId: userId, message: 'Someone wants to play with you!', sport: selectedSport });
                    alert('Request sent!');
                    window.location.href = '/activity';
                }
            })
            .catch(err => { console.log(err) })
        } else {
            document.getElementById('bottom-card').style.display = 'none';
            map.flyTo({
                center: [-72.52582468991241, 42.39107348551288],
                zoom: 15
            })
        }
    }
})

window.onload = () => {
    let url = '/api/user/dash'
    fetch(url).then(res => res.json()).then(data => {
        data.forEach((user) => {
            user.sports.forEach(sport => {
                if (sport == 'Tennis') {
                    tennis.features.push({
                        'type': 'tennis',
                        'properties': {
                            'name': user.name,
                            'userId': user._id,
                            'iconSize': iconSize
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': user.location
                        }
                    })
                } else if (sport == 'Basketball') {
                    basketball.features.push({
                        'type': 'basketball',
                        'properties': {
                            'name': user.name,
                            'userId': user._id,
                            'iconSize': iconSize
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': user.location
                        }
                    })
                }   else if (sport == 'Soccer') {
                    soccer.features.push({
                        'type': 'soccer',
                        'properties': {
                            'name': user.name,
                            'userId': user._id,
                            'iconSize': iconSize
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': user.location
                        }
                    })
                }
            })
        })
        console.log(tennis, basketball, soccer);
    })
    inflateSports([tennis, basketball, soccer]);
}