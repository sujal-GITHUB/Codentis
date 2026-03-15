document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Samsung UI
    initializeUI();
    setupEventListeners();
    updateBatteryStatus();
    startClockUpdate();
});

function initializeUI() {
    // Set initial active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add hover effects to app items
    const appItems = document.querySelectorAll('.app-item');
    appItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
        });
    });
}

function setupEventListeners() {
    // Search input focus effects
    const searchInput = document.querySelector('.search-input input');
    const searchContainer = document.querySelector('.search-input');
    
    searchInput.addEventListener('focus', function() {
        searchContainer.style.background = 'rgba(255, 255, 255, 0.2)';
        searchContainer.style.borderColor = '#666666';
    });

    searchInput.addEventListener('blur', function() {
        searchContainer.style.background = 'rgba(255, 255, 255, 0.1)';
        searchContainer.style.borderColor = '#444444';
    });

    // Quick settings interactions
    const settingItems = document.querySelectorAll('.setting-item');
    settingItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 200);
        });
    });
}

function updateBatteryStatus() {
    const batteryIcon = document.querySelector('.battery');
    const batteryLevel = Math.floor(Math.random() * 100);
    
    if (batteryLevel > 80) {
        batteryIcon.textContent = '🔋'; // High battery
    } else if (batteryLevel > 30) {
        batteryIcon.textContent = '🔋'; // Medium battery
    } else {
        batteryIcon.textContent = '🔋'; // Low battery
    }
}

function startClockUpdate() {
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeDisplay = document.querySelector('.time-display');
        
        if (timeDisplay) {
            timeDisplay.textContent = `${hours}:${minutes}`;
        }
    }, 1000);
}

// App interaction simulation
function simulateAppLaunch(appName) {
    const appContainer = document.querySelector('.main-content');
    const appOverlay = document.createElement('div');
    appOverlay.className = 'app-overlay';
    appOverlay.innerHTML = `
        <div class="app-launch-screen">
            <div class="app-icon-large">${getAppIcon(appName)}</div>
            <h2>${appName}</h2>
            <p>Launching...</p>
        </div>
    `;
    
    appContainer.appendChild(appOverlay);
    
    setTimeout(() => {
        appOverlay.remove();
        // Here you would actually launch the app
        console.log(`Launching ${appName} app`);
    }, 1000);
}

function getAppIcon(appName) {
    const icons = {
        'Phone': '📱',
        'Messages': '💬',
        'Contacts': '👤',
        'Gmail': '❤️',
        'Notes': '📝',
        'Calendar': '📅',
        'Clock': '⏰',
        'Calculator': '📊',
        'YouTube': '🎬',
        'Spotify': '🎵',
        'Games': '🎮',
        'Camera': '📷'
    };
    
    return icons[appName] || '📱';
}

// Add overlay styles dynamically
const overlayStyles = `
    .app-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        backdrop-filter: blur(10px);
    }
    
    .app-launch-screen {
        text-align: center;
        animation: fadeIn 0.5s ease-in;
    }
    
    .app-icon-large {
        font-size: 80px;
        margin-bottom: 20px;
        animation: bounce 1s ease-in-out;
    }
    
    .app-launch-screen h2 {
        font-size: 28px;
        margin-bottom: 10px;
        color: #ffffff;
    }
    
    .app-launch-screen p {
        font-size: 16px;
        color: #cccccc;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;

// Add overlay styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = overlayStyles;
document.head.appendChild(styleSheet);