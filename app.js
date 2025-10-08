class SmartBinApp {
    constructor() {
        this.currentUser = null;
        this.currentScreen = 'landing-page';
        this.networkStatus = 'online';
        this.charts = {};
        this.map = null;
        
        // Application data
        this.data = {
            userWasteHistory: [
                {"date": "2025-10-06", "type": "Plastic", "weight": "2.5kg", "points": 25, "location": "Bin-001"},
                {"date": "2025-10-05", "type": "Organic", "weight": "1.8kg", "points": 18, "location": "Bin-002"},
                {"date": "2025-10-04", "type": "Paper", "weight": "0.9kg", "points": 9, "location": "Bin-001"}
            ],
            weeklyAnalytics: [
                {"day": "Mon", "dumps": 5, "weight": 12.5},
                {"day": "Tue", "dumps": 3, "weight": 8.2},
                {"day": "Wed", "dumps": 7, "weight": 15.8},
                {"day": "Thu", "dumps": 4, "weight": 9.3},
                {"day": "Fri", "dumps": 6, "weight": 13.7},
                {"day": "Sat", "dumps": 8, "weight": 18.9},
                {"day": "Sun", "dumps": 2, "weight": 5.4}
            ],
            userRewards: {
                "totalPoints": 1247,
                "level": "Eco Warrior",
                "nextLevelPoints": 253,
                "recentActivity": [
                    {"action": "Waste Dump", "points": 25, "date": "2025-10-06"},
                    {"action": "Weekly Goal", "points": 50, "date": "2025-10-01"},
                    {"action": "Tutorial Complete", "points": 10, "date": "2025-09-28"}
                ]
            },
            municipalData: {
                "localities": [
                    {"name": "Downtown", "totalWaste": 245.8, "recyclable": 68, "organic": 89, "hazardous": 3},
                    {"name": "Suburbs", "totalWaste": 189.2, "recyclable": 78, "organic": 95, "hazardous": 1},
                    {"name": "Industrial", "totalWaste": 456.7, "recyclable": 45, "organic": 23, "hazardous": 12}
                ],
                "drivers": [
                    {"id": "D001", "name": "John Smith", "locality": "Downtown", "status": "Active", "pickups": 15},
                    {"id": "D002", "name": "Maria Garcia", "locality": "Suburbs", "status": "Active", "pickups": 12},
                    {"id": "D003", "name": "David Chen", "locality": "Industrial", "status": "Off Duty", "pickups": 8}
                ],
                "binStatus": [
                    {"id": "BIN-001", "location": "Main St & 5th", "fillLevel": 78, "battery": 85, "status": "Normal", "lat": 40.7128, "lng": -74.0060},
                    {"id": "BIN-002", "location": "Park Avenue", "fillLevel": 45, "battery": 92, "status": "Normal", "lat": 40.7359, "lng": -73.9904},
                    {"id": "BIN-003", "location": "Industrial Zone", "fillLevel": 95, "battery": 23, "status": "Low Battery", "lat": 40.7051, "lng": -74.0092}
                ]
            },
            wasteTypes: [
                {"type": "Plastic", "recyclable": true, "description": "Bottles, containers, packaging"},
                {"type": "Paper", "recyclable": true, "description": "Newspapers, cardboard, office paper"},
                {"type": "Glass", "recyclable": true, "description": "Bottles, jars, glassware"},
                {"type": "Organic", "recyclable": false, "description": "Food waste, yard trimmings"},
                {"type": "Metal", "recyclable": true, "description": "Cans, foil, metal objects"},
                {"type": "Hazardous", "recyclable": false, "description": "Batteries, chemicals, electronics"}
            ],
            learningModules: {
                "waste-segregation": {
                    title: "Waste Segregation",
                    content: `
                        <h4>Proper Waste Segregation</h4>
                        <p>Learn how to sort waste effectively to maximize recycling and minimize environmental impact.</p>
                        <ul>
                            <li>Separate recyclables (plastic, paper, glass, metal) from non-recyclables.</li>
                            <li>Ensure hazardous waste like batteries is disposed of at designated facilities.</li>
                            <li>Rinse containers to prevent contamination of recycling streams.</li>
                        </ul>
                    `
                },
                "composting-basics": {
                    title: "Composting Basics",
                    content: `
                        <h4>Composting 101</h4>
                        <p>Turn your organic waste into nutrient-rich compost for your garden.</p>
                        <ul>
                            <li>Use a mix of green (food scraps) and brown (leaves, cardboard) materials.</li>
                            <li>Maintain proper moisture and aeration for faster decomposition.</li>
                            <li>Avoid meat, dairy, and oily foods in compost bins.</li>
                        </ul>
                    `
                },
                "hazardous-waste": {
                    title: "Hazardous Waste",
                    content: `
                        <h4>Safe Hazardous Waste Disposal</h4>
                        <p>Handle dangerous materials responsibly to protect the environment.</p>
                        <ul>
                            <li>Never dispose of batteries or electronics in regular bins.</li>
                            <li>Use designated drop-off points for hazardous waste.</li>
                            <li>Store chemicals safely to prevent leaks or spills.</li>
                        </ul>
                    `
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateNetworkStatus();
        this.loadUserData();
        
        // Simulate network status changes
        setInterval(() => {
            this.simulateNetworkChange();
        }, 30000);
    }
    
    setupEventListeners() {
        // Login buttons
        document.getElementById('user-login-btn')?.addEventListener('click', () => {
            this.login('user');
        });
        
        document.getElementById('municipal-login-btn')?.addEventListener('click', () => {
            this.login('municipal');
        });
        
        // QR Scanner
        document.getElementById('qr-scan-btn')?.addEventListener('click', () => {
            this.showOverlay('qr-overlay');
        });
        
        document.getElementById('simulate-scan')?.addEventListener('click', () => {
            this.simulateQRScan();
        });
        
        // Photo capture
        document.getElementById('photo-capture-btn')?.addEventListener('click', () => {
            this.showOverlay('photo-overlay');
        });
        
        document.getElementById('capture-photo')?.addEventListener('click', () => {
            this.simulatePhotoCapture();
        });
        
        // Schedule pickup
        document.getElementById('schedule-pickup-btn')?.addEventListener('click', () => {
            this.showScheduleOverlay();
        });
        
        document.getElementById('confirm-schedule')?.addEventListener('click', () => {
            this.schedulePickup();
        });
        
        // Maps
        document.getElementById('maps-btn')?.addEventListener('click', () => {
            this.openMaps();
        });
        
        // Learning modules
        document.querySelectorAll('.tutorial-item .btn--sm').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const moduleId = e.target.getAttribute('data-module');
                this.showLearningModule(moduleId);
            });
        });
        
        document.getElementById('complete-module')?.addEventListener('click', () => {
            this.completeLearningModule();
        });
        
        // Close overlay buttons
        document.querySelectorAll('.close-overlay').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                this.hideOverlay(target);
            });
        });
        
        // Close modal buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideModal();
            });
        });
        
        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                this.switchBottomNavView(view);
            });
        });
        
        // Menu buttons
        document.getElementById('user-menu-btn')?.addEventListener('click', () => {
            this.showUserMenu();
        });
        
        document.getElementById('municipal-menu-btn')?.addEventListener('click', () => {
            this.showMunicipalMenu();
        });
    }
    
    login(userType) {
        this.showLoading();
        
        setTimeout(() => {
            this.currentUser = userType;
            this.hideLoading();
            
            if (userType === 'user') {
                this.switchScreen('user-dashboard');
                this.loadUserDashboard();
            } else {
                this.switchScreen('municipal-dashboard');
                this.loadMunicipalDashboard();
            }
        }, 1500);
    }
    
    logout() {
        this.showLoading();
        
        setTimeout(() => {
            this.currentUser = null;
            this.hideLoading();
            this.hideModal();
            this.switchScreen('landing-page');
            
            Object.keys(this.charts).forEach(chartKey => {
                if (this.charts[chartKey]) {
                    this.charts[chartKey].destroy();
                    this.charts[chartKey] = null;
                }
            });
            
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector('.nav-item[data-view="dashboard"], .nav-item[data-view="overview"]')?.classList.add('active');
        }, 1000);
    }
    
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }
    
    loadUserDashboard() {
        this.renderRecentActivity();
        this.renderWeeklyChart();
        this.updatePointsDisplay();
    }
    
    loadMunicipalDashboard() {
        this.renderDriverList();
        this.renderBinList();
        this.renderLocalityChart();
    }
    
    renderRecentActivity() {
        const container = document.getElementById('recent-activity');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.userWasteHistory.forEach(item => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-details">
                    <h4>${item.type} Waste</h4>
                    <p>${item.weight} • ${item.location} • ${item.date}</p>
                </div>
                <div class="activity-points">+${item.points}</div>
            `;
            container.appendChild(activityItem);
        });
    }
    
    renderWeeklyChart() {
        const ctx = document.getElementById('weekly-chart');
        if (!ctx) return;
        
        if (this.charts.weekly) {
            this.charts.weekly.destroy();
        }
        
        this.charts.weekly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.weeklyAnalytics.map(d => d.day),
                datasets: [{
                    label: 'Dumps',
                    data: this.data.weeklyAnalytics.map(d => d.dumps),
                    backgroundColor: '#2e7d32',
                    borderColor: '#2e7d32',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#424242' },
                        grid: { color: '#e0e0e0' }
                    },
                    x: {
                        ticks: { color: '#424242' },
                        grid: { color: '#e0e0e0' }
                    }
                }
            }
        });
    }
    
    renderLocalityChart() {
        const ctx = document.getElementById('locality-chart');
        if (!ctx) return;
        
        if (this.charts.locality) {
            this.charts.locality.destroy();
        }
        
        this.charts.locality = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.data.municipalData.localities.map(l => l.name),
                datasets: [{
                    data: this.data.municipalData.localities.map(l => l.totalWaste),
                    backgroundColor: ['#2e7d32', '#4caf50', '#81c784'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#424242',
                            padding: 20
                        }
                    }
                }
            }
        });
    }
    
    updatePointsDisplay() {
        const pointsElement = document.getElementById('total-points');
        if (pointsElement) {
            pointsElement.textContent = this.data.userRewards.totalPoints.toLocaleString();
        }
    }
    
    renderDriverList() {
        const container = document.getElementById('driver-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.municipalData.drivers.forEach(driver => {
            const driverItem = document.createElement('div');
            driverItem.className = 'driver-item';
            driverItem.innerHTML = `
                <div class="item-info">
                    <h4>${driver.name}</h4>
                    <p>${driver.locality} • ${driver.pickups} pickups</p>
                </div>
                <div class="status-badge ${driver.status.toLowerCase().replace(' ', '-')}">${driver.status}</div>
            `;
            container.appendChild(driverItem);
        });
    }
    
    renderBinList() {
        const container = document.getElementById('bin-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.municipalData.binStatus.forEach(bin => {
            const binItem = document.createElement('div');
            binItem.className = 'bin-item';
            binItem.innerHTML = `
                <div class="item-info">
                    <h4>${bin.id}</h4>
                    <p>${bin.location} • Fill: ${bin.fillLevel}% • Battery: ${bin.battery}%</p>
                </div>
                <div class="status-badge ${bin.status.toLowerCase().replace(' ', '-')}">${bin.status}</div>
            `;
            container.appendChild(binItem);
        });
    }
    
    showScheduleOverlay() {
        this.showOverlay('schedule-overlay');
        this.renderCalendar();
    }
    
    renderCalendar() {
        const container = document.getElementById('calendar');
        if (!container) return;
        
        container.innerHTML = '';
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        
        let calendarHTML = `
            <div class="calendar-header">
                <span>${today.toLocaleString('default', { month: 'long' })} ${year}</span>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day">Sun</div>
                <div class="calendar-day">Mon</div>
                <div class="calendar-day">Tue</div>
                <div class="calendar-day">Wed</div>
                <div class="calendar-day">Thu</div>
                <div class="calendar-day">Fri</div>
                <div class="calendar-day">Sat</div>
        `;
        
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-date empty"></div>';
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday = date.toDateString() === today.toDateString();
            calendarHTML += `<div class="calendar-date ${isToday ? 'today' : ''}" data-date="${date.toISOString()}">${i}</div>`;
        }
        
        calendarHTML += '</div>';
        container.innerHTML = calendarHTML;
        
        document.querySelectorAll('.calendar-date:not(.empty)').forEach(date => {
            date.addEventListener('click', (e) => {
                document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
    }
    
    schedulePickup() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.hideOverlay('schedule-overlay');
            
            const selectedDate = document.querySelector('.calendar-date.selected')?.getAttribute('data-date');
            const timeInput = document.getElementById('pickup-time')?.value || '10:00';
            
            if (!selectedDate) {
                this.showSuccessModal('Error', 'Please select a date for pickup.');
                return;
            }
            
            const pickupDate = new Date(selectedDate);
            const [hours, minutes] = timeInput.split(':');
            pickupDate.setHours(parseInt(hours), parseInt(minutes));
            
            this.showSuccessModal(
                'Pickup Scheduled!',
                `Your pickup has been scheduled for ${pickupDate.toLocaleString()}.`
            );
        }, 1000);
    }
    
    openMaps() {
        this.showOverlay('map-overlay');
        this.renderMap();
    }
    
    renderMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;
        
        if (this.map) {
            this.map.remove();
        }
        
        this.map = L.map('map').setView([40.7128, -74.0060], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        
        this.data.municipalData.binStatus.forEach(bin => {
            L.marker([bin.lat, bin.lng])
                .addTo(this.map)
                .bindPopup(`
                    <b>${bin.id}</b><br>
                    Location: ${bin.location}<br>
                    Fill Level: ${bin.fillLevel}%<br>
                    Battery: ${bin.battery}%<br>
                    Status: ${bin.status}
                `);
        });
    }
    
    showLearningModule(moduleId) {
        const module = this.data.learningModules[moduleId];
        if (!module) return;
        
        const overlay = document.getElementById('learn-overlay');
        const titleElement = document.getElementById('learn-title');
        const contentElement = document.getElementById('learn-content');
        
        if (overlay && titleElement && contentElement) {
            titleElement.textContent = module.title;
            contentElement.innerHTML = module.content;
            overlay.classList.add('active');
        }
    }
    
    completeLearningModule() {
        this.hideOverlay('learn-overlay');
        this.data.userRewards.totalPoints += 10;
        this.data.userRewards.recentActivity.push({
            action: "Tutorial Complete",
            points: 10,
            date: new Date().toISOString().split('T')[0]
        });
        this.updatePointsDisplay();
        this.renderRecentActivity();
        this.showSuccessModal('Module Completed', 'You earned 10 points for completing the learning module!');
    }
    
    simulateQRScan() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.hideOverlay('qr-overlay');
            
            const binId = 'BIN-' + Math.floor(Math.random() * 999 + 1).toString().padStart(3, '0');
            const encodedIP = btoa('192.168.1.' + Math.floor(Math.random() * 255 + 1));
            
            this.showSuccessModal(
                'QR Code Scanned!',
                `Connected to ${binId}\nEncoded IP: ${encodedIP}\nReady to dispose waste.`
            );
            
            this.data.userRewards.totalPoints += 5;
            this.updatePointsDisplay();
        }, 2000);
    }
    
    simulatePhotoCapture() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.hideOverlay('photo-overlay');
            
            const wasteTypes = this.data.wasteTypes;
            const identifiedWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
            
            this.showSuccessModal(
                'Waste Identified!',
                `Type: ${identifiedWaste.type}\nRecyclable: ${identifiedWaste.recyclable ? 'Yes' : 'No'}\n${identifiedWaste.description}`
            );
            
            this.data.userRewards.totalPoints += 10;
            this.updatePointsDisplay();
        }, 3000);
    }
    
    switchBottomNavView(view) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelector(`[data-view="${view}"]`)?.classList.add('active');
        console.log(`Switching to ${view} view`);
    }
    
    showUserMenu() {
        const menuOptions = [
            'Profile Settings',
            'Notification Preferences', 
            'Help & Support',
            'About SmartBin',
            'Logout'
        ];
        
        const modal = document.getElementById('success-modal');
        const titleElement = document.getElementById('success-title');
        const messageElement = document.getElementById('success-message');
        const modalActions = modal?.querySelector('.modal-actions');
        
        if (modal && titleElement && messageElement && modalActions) {
            titleElement.textContent = 'User Menu';
            messageElement.innerHTML = menuOptions.map((option, index) => 
                `<div style="padding: 8px 0; cursor: pointer; border-bottom: 1px solid #eee;" data-menu-option="${index}">${option}</div>`
            ).join('');
            
            modalActions.innerHTML = '<button class="btn btn--outline close-modal">Close</button>';
            
            messageElement.addEventListener('click', (e) => {
                const optionIndex = e.target.getAttribute('data-menu-option');
                if (optionIndex !== null) {
                    const option = menuOptions[parseInt(optionIndex)];
                    this.handleMenuOption(option);
                }
            });
            
            modalActions.querySelector('.close-modal')?.addEventListener('click', () => {
                this.hideModal();
            });
            
            modal.classList.remove('hidden');
        }
    }
    
    showMunicipalMenu() {
        const menuOptions = [
            'System Settings',
            'User Management',
            'Reports & Analytics',
            'Maintenance Schedule',
            'Logout'
        ];
        
        const modal = document.getElementById('success-modal');
        const titleElement = document.getElementById('success-title');
        const messageElement = document.getElementById('success-message');
        const modalActions = modal?.querySelector('.modal-actions');
        
        if (modal && titleElement && messageElement && modalActions) {
            titleElement.textContent = 'Municipal Menu';
            messageElement.innerHTML = menuOptions.map((option, index) => 
                `<div style="padding: 8px 0; cursor: pointer; border-bottom: 1px solid #eee;" data-menu-option="${index}">${option}</div>`
            ).join('');
            
            modalActions.innerHTML = '<button class="btn btn--outline close-modal">Close</button>';
            
            messageElement.addEventListener('click', (e) => {
                const optionIndex = e.target.getAttribute('data-menu-option');
                if (optionIndex !== null) {
                    const option = menuOptions[parseInt(optionIndex)];
                    this.handleMenuOption(option);
                }
            });
            
            modalActions.querySelector('.close-modal')?.addEventListener('click', () => {
                this.hideModal();
            });
            
            modal.classList.remove('hidden');
        }
    }
    
    handleMenuOption(option) {
        this.hideModal();
        
        if (option === 'Logout') {
            this.logout();
        } else {
            this.showSuccessModal(
                option,
                `${option} feature will be available in the next update.`
            );
        }
    }
    
    showOverlay(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.classList.add('active');
        }
    }
    
    hideOverlay(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    showSuccessModal(title, message) {
        const modal = document.getElementById('success-modal');
        const titleElement = document.getElementById('success-title');
        const messageElement = document.getElementById('success-message');
        const modalActions = modal?.querySelector('.modal-actions');
        
        if (modal && titleElement && messageElement && modalActions) {
            titleElement.textContent = title;
            messageElement.textContent = message;
            
            modalActions.innerHTML = '<button class="btn btn--primary close-modal">OK</button>';
            
            modalActions.querySelector('.close-modal')?.addEventListener('click', () => {
                this.hideModal();
            });
            
            modal.classList.remove('hidden');
        }
    }
    
    hideModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.removesheet
:root {
    --primary-color: #2e7d32; /* Green for eco-friendly theme */
    --secondary-color: #4caf50;
    --accent-color: #81c784;
    --text-color: #212121;
    --background-color: #f5f5f5;
    --card-background: #ffffff;
    --border-color: #e0e0e0;
    --error-color: #d32f2f;
    --warning-color: #ff9800;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', Arial, sans-serif;
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

.screen {
    display: none;
    min-height: 100vh;
    padding-bottom: 80px; /* Space for bottom nav */
}

.screen.active {
    display: block;
}

.app-header {
    background-color: var(--card-background);
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.network-status {
    font-size: 12px;
}

.network-status.online::before {
    content: '●';
    color: var(--secondary-color);
}

.network-status.offline::before {
    content: '●';
    color: var(--error-color);
}

.btn--icon {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-color);
}

.btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
}

.btn--primary {
    background-color: var(--primary-color);
    color: #fff;
}

.btn--primary:hover {
    background-color: var(--secondary-color);
}

.btn--outline {
    background: none;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
}

.btn--outline:hover {
    background-color: var(--primary-color);
    color: #fff;
}

.btn--full-width {
    width: 100%;
}

.btn--sm {
    padding: 8px 16px;
    font-size: 14px;
}

.landing-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    gap: 24px;
}

.app-logo {
    font-size: 48px;
    color: var(--primary-color);
    font-weight: 700;
}

.app-tagline {
    font-size: 18px;
    color: var(--text-color);
    opacity: 0.8;
}

.login-options {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.dashboard-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.card {
    background-color: var(--card-background);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    overflow: hidden;
}

.card__body {
    padding: 24px;
}

.action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
}

.action-card {
    background-color: var(--card-background);
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease;
    border: 1px solid var(--border-color);
}

.action-card:hover {
    transform: translateY(-4px);
}

.action-icon {
    font-size: 32px;
    margin-bottom: 8px;
    color: var(--primary-color);
}

.rewards-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
}

.points-counter {
    text-align: center;
}

.points-value {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-color);
}

.points-label {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.7;
}

.level-info {
    flex: 1;
    text-align: center;
}

.level-badge {
    background-color: var(--accent-color);
    color: #fff;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 14px;
    margin-bottom: 8px;
    display: inline-block;
}

.progress-bar {
    background-color: var(--border-color);
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    background-color: var(--secondary-color);
    height: 100%;
    transition: width 0.3s ease;
}

.next-level {
    font-size: 12px;
    color: var(--text-color);
    opacity: 0.7;
    margin-top: 4px;
}

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
}

.activity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: #fafafa;
    border-radius: 8px;
}

.activity-details h4 {
    font-size: 16px;
    margin-bottom: 4px;
}

.activity-details p {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.7;
}

.activity-points {
    font-size: 16px;
    font-weight: 600;
    color: var(--secondary-color);
}

.tutorial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.tutorial-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #fafafa;
    border-radius: 8px;
}

.tutorial-icon {
    font-size: 24px;
}

.tutorial-content h4 {
    font-size: 16px;
    margin-bottom: 4px;
}

.tutorial-content p {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.7;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
}

.stat-card {
    text-align: center;
    padding: 16px;
    background-color: var(--card-background);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-color);
}

.stat-label {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.7;
}

.driver-list, .bin-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
}

.driver-item, .bin-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: #fafafa;
    border-radius: 8px;
}

.item-info h4 {
    font-size: 16px;
    margin-bottom: 4px;
}

.item-info p {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.7;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
}

.status-badge.active {
    background-color: var(--accent-color);
    color: #fff;
}

.status-badge.off-duty, .status-badge.low-battery {
    background-color: var(--warning-color);
    color: #fff;
}

.status-badge.high-fill {
    background-color: var(--error-color);
    color: #fff;
}

.alert-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    margin-top: 12px;
}

.alert-item.priority-high {
    background-color: #ffebee;
}

.alert-item.priority-medium {
    background-color: #fff3e0;
}

.alert-icon {
    font-size: 24px;
}

.alert-content h4 {
    font-size: 16px;
    margin-bottom: 4px;
}

.alert-content p {
    font-size: 14px;
}

.alert-time {
    font-size: 12px;
    color: var(--text-color);
    opacity: 0.7;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.overlay.active {
    display: flex;
}

.overlay-content {
    background-color: var(--card-background);
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 24px;
}

.scanner-header, .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.scanner-viewport, .camera-viewport {
    background-color: #000;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
}

.scanner-frame, .camera-frame {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 2px solid var(--secondary-color);
    border-radius: 8px;
}

.scanner-corners::before,
.scanner-corners::after,
.scanner-corners > div::before,
.scanner-corners > div::after {
    content: '';
    position: absolute;
    background-color: var(--secondary-color);
}

.scanner-corners::before {
    top: 0;
    left: 0;
    width: 20px;
    height: 2px;
}

.scanner-corners::after {
    top: 0;
    left: 0;
    width: 2px;
    height: 20px;
}

.scanner-corners > div::before {
    bottom: 0;
    right: 0;
    width: 20px;
    height: 2px;
}

.scanner-corners > div::after {
    bottom: 0;
    right: 0;
    width: 2px;
    height: 20px;
}

.scanner-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--secondary-color);
    animation: scan 2s infinite;
}

@keyframes scan {
    0% { top: 0; }
    50% { top: 100%; }
    100% { top: 0; }
}

.crosshair::before,
.crosshair::after {
    content: '';
    position: absolute;
    background-color: var(--secondary-color);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.crosshair::before {
    width: 100px;
    height: 2px;
}

.crosshair::after {
    width: 2px;
    height: 100px;
}

.scanner-instruction, .camera-instruction {
    text-align: center;
    margin-top: 16px;
    color: #fff;
    opacity: 0.8;
}

.scanner-actions, .camera-actions, .calendar-actions, .map-actions, .learn-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 16px;
}

.calendar-container {
    padding: 16px;
}

.calendar-header {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    margin-top: 16px;
}

.calendar-day {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color);
}

.calendar-date {
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
}

.calendar-date.empty {
    background-color: #f5f5f5;
}

.calendar-date:not(.empty):hover {
    background-color: var(--accent-color);
    color: #fff;
}

.calendar-date.today {
    border: 2px solid var(--primary-color);
}

.calendar-date.selected {
    background-color: var(--secondary-color);
    color: #fff;
}

.time-picker {
    margin-top: 16px;
    text-align: center;
}

.time-picker label {
    font-size: 14px;
    margin-right: 8px;
}

.time-picker input {
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
}

.modal.hidden {
    display: none;
}

.modal-content {
    background-color: var(--card-background);
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    padding: 24px;
}

.modal-header {
    margin-bottom: 16px;
}

.modal-body {
    margin-bottom: 16px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 4000;
}

.loading.hidden {
    display: none;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--secondary-color);
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading p {
    color: #fff;
    margin-top: 16px;
}

@media (max-width: 600px) {
    .container {
        padding: 0 8px;
    }
    
    .btn {
        padding: 10px 16px;
        font-size: 14px;
    }
    
    .action-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
}

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--card-background);
    display: flex;
    justify-content: space-around;
    padding: 8px 0;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    opacity: 0.7;
}

.nav-item.active {
    color: var(--primary-color);
    opacity: 1;
}

.nav-icon {
    font-size: 24px;
}

.nav-label {
    font-size: 12px;
} this is coorect?
