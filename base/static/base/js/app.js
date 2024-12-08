
// Function to change the font size on the page
function setFontSize(size) {
    document.body.classList.remove('small', 'normal', 'large');
    document.body.classList.add(size);
}

// Set default font size on page load
document.addEventListener('DOMContentLoaded', () => {
    setFontSize('normal');  // Set default font size to 'normal'

    // Carousel functionality
    const carousel = document.getElementById('carousel');
    let currentIndex = 0;

    // Function to move the carousel items
    function moveCarousel() {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`; // Move carousel to the next slide
    }

    setInterval(moveCarousel, 5000);  // Move the carousel every 5 seconds

    // Initialize the map
    const map = L.map('map').setView([19.0760, 72.8777], 13);  // Set map view to Mumbai

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // List of bus stops with coordinates
    const busStops = [
        { name: "Chembur Bus Stop", lat: 19.073, lng: 72.897 },
        { name: "Kurla Bus Stop", lat: 19.067, lng: 72.887 },
        { name: "Andheri Bus Stop", lat: 19.098, lng: 72.836 },
        { name: "Bandra Bus Stop", lat: 19.059, lng: 72.832 },
        { name: "Vidyavihar Bus Stop", lat: 19.072, lng: 72.871 },
        // Add more stops as needed
    ];

    // Function to search bus stops based on input
    function searchItems() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const results = busStops.filter(stop => stop.name.toLowerCase().includes(query));

        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = ''; // Clear previous results

        // Remove existing markers from the map
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        if (results.length === 0) {
            const noResult = document.createElement('li');
            noResult.textContent = 'No bus stops found.';
            searchResults.appendChild(noResult);
            return;
        }

        results.forEach(stop => {
            // Create a marker for each bus stop
            const marker = L.marker([stop.lat, stop.lng]).addTo(map)
                .bindPopup(`<strong>${stop.name}</strong><br>Latitude: ${stop.lat}<br>Longitude: ${stop.lng}`);

            // Create a list item for the search result
            const li = document.createElement('li');
            li.textContent = stop.name;

            // Set up the click handler for the search result
            li.onclick = () => {
                // Center the map on the clicked stop and zoom in
                map.setView([stop.lat, stop.lng], 15);
                marker.openPopup();  // Open the popup for the selected marker
            };

            // Add the list item to the search results container
            searchResults.appendChild(li);
        });

        searchResults.style.display = 'block'; // Show search results
    }

    // Reset the search box when clicking outside
    document.addEventListener('click', event => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchInput.value = '';  // Clear search box
            searchResults.innerHTML = '';  // Clear results
            searchResults.style.display = 'none';  // Hide search results
        }
    });

    // Trigger the search function on keyup in the search input
    document.getElementById('search-input').addEventListener('keyup', searchItems);
});
