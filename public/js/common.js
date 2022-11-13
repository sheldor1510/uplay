window.onload = () => {
    if (window.screen.width > 500) {
        window.location.href= '/phone'
    } else {
        document.getElementsByTagName('body')[0].style.display = 'block'
    }
}

window.addEventListener('resize', () => {
    if (window.screen.width > 500) {
        window.location.href= '/phone'
    } else {
        document.getElementsByTagName('body')[0].style.display = 'block'
    }
})