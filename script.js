// Live clock
function updateClock() {
    const timeElement = document.getElementById('currentTime');
    const greetingElement = document.getElementById('greetingText');
    
    const now = new Date();
    let hours = now.getHours();
    
    // Update the time display (e.g., "08:27" or "14:30")
    // Using standard 24-hour or 12-hour format depending on user locale
    timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update the greeting based on the hour
    if (hours < 12) {
        greetingElement.textContent = "Good Morning,";
    } else if (hours < 18) {
        greetingElement.textContent = "Good Afternoon,";
    } else {
        greetingElement.textContent = "Good Evening,";
    }
}

updateClock();
setInterval(updateClock, 1000);//1 sec


// 1 Default loc is GU
const defaultCoords = [26.1533, 91.6601];
const map = L.map('map', {
    zoomControl: false
}).setView(defaultCoords, 14);

// 2. OpenStreetMap Layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 3. Bus Marker (Mock bus location)
// const busIcon = L.divIcon({
//     className: 'custom-bus-marker',
//     html: '<div style="background-color: #00838f; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
//     iconSize: [20, 20],
//     iconAnchor: [10, 10]
// });
// let busMarker = L.marker([26.1510, 91.6620], { icon: busIcon }).addTo(map);

// 4. User "Blue Dot" Marker CSS
const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: '<div class="blue-dot"><div class="pulse"></div></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// 5.User's Current Location
if ("geolocation" in navigator) {
    // Request the location
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Pan the map to the user's actual location smoothly
            map.flyTo([userLat, userLng], 16, {
                animate: true,
                duration: 1.5
            });

            // Drop the blue dot on the map
            L.marker([userLat, userLng], { icon: userIcon }).addTo(map);
        },
        (error) => {
            console.warn("Location access denied or unavailable. Defaulting to campus view.");
            // Error codes: 1 (Permission Denied), 2 (Position Unavailable), 3 (Timeout)
        },
        {
            enableHighAccuracy: true, // Forces phone to use GPS instead of just cell towers
            timeout: 5000,
            maximumAge: 0
        }
    );
} else {
    console.warn("Geolocation is not supported by this browser.");
}


// down sheet & Nav Interaction 
const routeSheet = document.getElementById('routeSheet');
const closeSheetBtn = document.getElementById('closeSheetBtn');
const navItems = document.querySelectorAll('.nav-item');

// 1. Grab the specific buttons by their index in the NodeList
// [0] is Home, [1] is Bus
const navHomeBtn = navItems[0];
const navBusBtn = navItems[1];

// 2. Open sheet when bottom nav Bus icon is clicked
navBusBtn.addEventListener('click', () => {
    routeSheet.classList.add('open');
    
    // Update active states
    navItems.forEach(btn => btn.classList.remove('active'));
    navBusBtn.classList.add('active'); 
});

// 3. Close sheet when the drag handle is clicked
closeSheetBtn.addEventListener('click', () => {
    closeSheet();
});

// 4. Reset to home state when Home icon is clicked
navHomeBtn.addEventListener('click', () => {
    closeSheet();
});

// Helper function to handle the closing logic
function closeSheet() {
    routeSheet.classList.remove('open');
    navItems.forEach(btn => btn.classList.remove('active'));
    navHomeBtn.classList.add('active');
}

// Logic for Route Cards
function toggleRoute(headerElement) {
    // Find the parent card of the clicked header
    const clickedCard = headerElement.parentElement;
    
    // Checks if it's already expanded
    const isExpanded = clickedCard.classList.contains('expanded');
    
    // collapse ALL cards to keep it clean
    const allCards = document.querySelectorAll('.route-card');
    allCards.forEach(card => card.classList.remove('expanded'));
    
    // If wasn't expanded before, expanded now
    if (!isExpanded) {
        clickedCard.classList.add('expanded');
    }
}

// Helper to close the whole sheet from the "Open Map" button inside the card
function closeSheet() {
    routeSheet.classList.remove('open');
    navItems.forEach(btn => btn.classList.remove('active'));
    navHome.classList.add('active');
}