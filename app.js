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
        this.renderStatusOverview();
        this.renderDriverList();
        this.renderBinList();
        this.renderLocalityChart();
        this.renderAlerts();
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
    
    renderStatusOverview() {
        const stats = [
            { id: 'total-waste', value: this.data.municipalData.localities.reduce((sum, loc) => sum + loc.totalWaste, 0).toFixed(1), label: 'Total Waste (kg)' },
            { id: 'active-drivers', value: this.data.municipalData.drivers.filter(d => d.status === 'Active').length, label: 'Active Drivers' },
            { id: 'hazard-alerts', value: this.data.municipalData.binStatus.filter(b => b.fillLevel > 90 || b.battery < 30).length, label: 'Hazard Alerts' },
            { id: 'bin-health', value: Math.round(this.data.municipalData.binStatus.reduce((sum, b) => sum + b.battery, 0) / this.data.municipalData.binStatus.length) + '%', label: 'Bin Health' }
        ];

        stats.forEach(stat => {
            const valueElement = document.querySelector(`#${stat.id} .stat-value`);
            if (valueElement) {
                valueElement.textContent = stat.value;
            }
        });
    }

    renderAlerts() {
        const container = document.getElementById('alerts-list');
        if (!container) return;

        container.innerHTML = '';

        this.data.municipalData.binStatus.forEach(bin => {
            if (bin.fillLevel > 90) {
                const alertItem = document.createElement('div');
                alertItem.className = 'alert-item priority-medium';
                alertItem.innerHTML = `
                    <div class="alert-icon">🚨</div>
                    <div class="alert-content">
                        <h4>High Fill Level</h4>
                        <p>${bin.id} at ${bin.location} - ${bin.fillLevel}% full</p>
                        <span class="alert-time">${this.getTimeAgo()}</span>
                    </div>
                `;
                container.appendChild(alertItem);
            }
            if (bin.battery < 30) {
                const alertItem = document.createElement('div');
                alertItem.className = 'alert-item priority-high';
                alertItem.innerHTML = `
                    <div class="alert-icon">⚠️</div>
                    <div class="alert-content">
                        <h4>Low Battery Alert</h4>
                        <p>${bin.id} at ${bin.location} - ${bin.battery}% battery</p>
                        <span class="alert-time">${this.getTimeAgo()}</span>
                    </div>
                `;
                container.appendChild(alertItem);
            }
        });
    }

    getTimeAgo() {
        const minutes = Math.floor(Math.random() * 300) + 1;
        return minutes < 60 ? `${minutes} minutes ago` : `${Math.floor(minutes / 60)} hours ago`;
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
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        
        const render = () => {
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            
            let calendarHTML = `
                <div class="calendar-header">
                    <button class="btn--icon" id="prev-month">◄</button>
                    <span>${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}</span>
                    <button class="btn--icon" id="next-month">►</button>
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
                const date = new Date(currentYear, currentMonth, i);
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
            
            document.getElementById('prev-month')?.addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                render();
            });
            
            document.getElementById('next-month')?.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                render();
            });
        };
        
        render();
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
        
        // Calculate average coordinates for centering
        const avgLat = this.data.municipalData.binStatus.reduce((sum, bin) => sum + bin.lat, 0) / this.data.municipalData.binStatus.length;
        const avgLng = this.data.municipalData.binStatus.reduce((sum, bin) => sum + bin.lng, 0) / this.data.municipalData.binStatus.length;
        
        this.map = L.map('map').setView([avgLat || 40.7128, avgLng || -74.0060], 13);
        
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
            
            const newMessageElement = messageElement.cloneNode(true);
            messageElement.parentNode.replaceChild(newMessageElement, messageElement);
            
            newMessageElement.addEventListener('click', (e) => {
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
            
            const newMessageElement = messageElement.cloneNode(true);
            messageElement.parentNode.replaceChild(newMessageElement, messageElement);
            
            newMessageElement.addEventListener('click', (e) => {
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
            loading.classList.remove('hidden');
        }
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }
    
    updateNetworkStatus() {
        const statusElement = document.querySelector('.network-status');
        if (statusElement) {
            statusElement.classList.remove('online', 'offline');
            statusElement.classList.add(this.networkStatus);
        }
    }
    
    simulateNetworkChange() {
        this.networkStatus = Math.random() > 0.2 ? 'online' : 'offline';
        this.updateNetworkStatus();
    }
    
    loadUserData() {
        console.log('Loading user data...');
    }
}

const app = new SmartBinApp();
```
