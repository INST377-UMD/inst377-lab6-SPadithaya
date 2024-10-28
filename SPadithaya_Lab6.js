function createMap() {
    var map = L.map('map').setView([38.98, -76], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const randomPoints = [
        {lat: getRandomInRange(30,35,3), lng: getRandomInRange(-90,-100,3)},
        {lat: getRandomInRange(30,35,3), lng: getRandomInRange(-90,-100,3)},
        {lat: getRandomInRange(30,35,3), lng: getRandomInRange(-90,-100,3)},
    ];
    randomPoints.forEach((point,index) => {
        const marker = L.marker([point.lat, point.lng]).addTo(map);

        getLocality(point.lat, point.lng).then(locality => {
            marker.getPopup().setContent(`Marker ${index + 1} - Locality: ${locality}`);
        })
    });


}

function getLocality(lat, lng){
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => data.locality || 'Unknown');
}

function getRandomInRange(from, to, fixed){
    return (Math.random() * (to - from) + from).toFixed(fixed)*1
}

window.onload = createMap;