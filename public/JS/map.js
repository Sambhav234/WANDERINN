document.addEventListener("DOMContentLoaded", function () {
    const fullLocation = window.listingLocation;
    const listingTitle = window.listingTitle;

    const mapDiv = document.getElementById("map");
    const messageDiv = document.getElementById("location-message");

    // Initially hide the map until location is validated
    mapDiv.style.display = "none";

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullLocation)}`, {
        headers: {
            "User-Agent": "listing-app/1.0"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            messageDiv.textContent = "Sorry!!, But the Provided location is not available on the map";
            return;
        }

        // If valid, clear message and show map
        messageDiv.textContent = "";
        mapDiv.style.display = "block";

        const lat = data[0].lat;
        const lon = data[0].lon;

        const map = L.map('map').setView([lat, lon], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${listingTitle}</b><br>${fullLocation}`)
            .openPopup();
    })
    .catch(error => {
        console.error("Geocoding error:", error);
        messageDiv.textContent = "Something went wrong while loading the location.";
    });
});
