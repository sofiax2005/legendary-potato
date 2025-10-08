// SmartBin Application JavaScript
class SmartBinApp {
    constructor() {
        this.currentUser = null;
        this.currentScreen = 'landing-page';
        this.networkStatus = 'online';
        this.charts = {};
        
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
                    {"id": "BIN-001", "location": "Main St & 5th", "fillLevel": 78, "battery": 85, "status": "Normal"},
                    {"id": "BIN-002", "location": "Park Avenue", "fillLevel": 45, "battery": 92, "status": "Normal"},
                    {"id": "BIN-003", "location": "Industrial Zone", "fillLevel": 95, "battery": 23, "status": "Low Battery"}
                ]
            },
            wasteTypes: [
                {"type": "Plastic", "recyclable": true, "description": "Bottles, containers, packaging"},
                {"type": "Paper", "recyclable": true, "description": "Newspapers, cardboard, office paper"},
                {"type": "Glass", "recyclable": true, "description": "Bottles, jars, glassware"},
                {"type": "Organic", "recyclable": false, "description": "Food waste, yard trimmings"},
                {"type": "Metal", "recyclable": true, "description": "Cans, foil, metal objects"},
                {"type": "Hazardous", "recyclable": false, "description": "Batteries, chemicals, electronics"}
            ]
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
            this.schedulePickup();
        });
        
        // Maps
        document.getElementById('maps-btn')?.addEventListener('click', () => {
            this.openMaps();
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
        
        // Simulate login process
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
        
        // Simulate logout process
        setTimeout(() => {
            this.currentUser = null;
            this.hideLoading();
            this.hideModal(); // Close any open modals
            this.switchScreen('landing-page');
            
            // Clear any chart instances
            Object.keys(this.charts).forEach(chartKey => {
                if (this.charts[chartKey]) {
                    this.charts[chartKey].destroy();
                    this.charts[chartKey] = null;
                }
            });
            
            // Reset navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector('.nav-item[data-view="dashboard"], .nav-item[data-view="overview"]')?.classList.add('active');
        }, 1000);
    }
    
    switchScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
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
                    backgroundColor: '#000000',
                    borderColor: '#000000',
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
                        ticks: {
                            color: '#666666'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#666666'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
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
                    backgroundColor: ['#000000', '#666666', '#999999'],
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
                            color: '#666666',
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
    
    simulateQRScan() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.hideOverlay('qr-overlay');
            
            // Simulate QR scan result
            const binId = 'BIN-' + Math.floor(Math.random() * 999 + 1).toString().padStart(3, '0');
            const encodedIP = btoa('192.168.1.' + Math.floor(Math.random() * 255 + 1));
            
            this.showSuccessModal(
                'QR Code Scanned!',
                `Connected to ${binId}\nEncoded IP: ${encodedIP}\nReady to dispose waste.`
            );
            
            // Add points
            this.data.userRewards.totalPoints += 5;
            this.updatePointsDisplay();
        }, 2000);
    }
    
    simulatePhotoCapture() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.hideOverlay('photo-overlay');
            
            // Simulate waste identification
            const wasteTypes = this.data.wasteTypes;
            const identifiedWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
            
            this.showSuccessModal(
                'Waste Identified!',
                `Type: ${identifiedWaste.type}\nRecyclable: ${identifiedWaste.recyclable ? 'Yes' : 'No'}\n${identifiedWaste.description}`
            );
            
            // Add points for photo identification
            this.data.userRewards.totalPoints += 10;
            this.updatePointsDisplay();
        }, 3000);
    }
    
    schedulePickup() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            
            const pickupDate = new Date();
            pickupDate.setDate(pickupDate.getDate() + 1);
            
            this.showSuccessModal(
                'Pickup Scheduled!',
                `Your pickup has been scheduled for ${pickupDate.toLocaleDateString()}\nEstimated time: 10:00 AM - 12:00 PM`
            );
        }, 1000);
    }
    
    openMaps() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            
            // Simulate opening maps with bin locations
            this.showSuccessModal(
                'Opening Maps',
                'Showing nearby SmartBin locations:\n• Main St & 5th Ave (0.2 km)\n• Park Avenue (0.5 km)\n• Shopping Mall (0.8 km)'
            );
        }, 1500);
    }
    
    switchBottomNavView(view) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelector(`[data-view="${view}"]`)?.classList.add('active');
        
        // Handle view switching logic here
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
        
        // Create interactive menu modal
        const modal = document.getElementById('success-modal');
        const titleElement = document.getElementById('success-title');
        const messageElement = document.getElementById('success-message');
        const modalActions = modal?.querySelector('.modal-actions');
        
        if (modal && titleElement && messageElement && modalActions) {
            titleElement.textContent = 'User Menu';
            messageElement.innerHTML = menuOptions.map((option, index) => 
                `<div style="padding: 8px 0; cursor: pointer; border-bottom: 1px solid #eee;" data-menu-option="${index}">${option}</div>`
            ).join('');
            
            // Replace OK button with Close button
            modalActions.innerHTML = '<button class="btn btn--outline close-modal">Close</button>';
            
            // Add event listeners for menu options
            messageElement.addEventListener('click', (e) => {
                const optionIndex = e.target.getAttribute('data-menu-option');
                if (optionIndex !== null) {
                    const option = menuOptions[parseInt(optionIndex)];
                    this.handleMenuOption(option);
                }
            });
            
            // Re-attach close modal event
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
        
        // Create interactive menu modal
        const modal = document.getElementById('success-modal');
        const titleElement = document.getElementById('success-title');
        const messageElement = document.getElementById('success-message');
        const modalActions = modal?.querySelector('.modal-actions');
        
        if (modal && titleElement && messageElement && modalActions) {
            titleElement.textContent = 'Municipal Menu';
            messageElement.innerHTML = menuOptions.map((option, index) => 
                `<div style="padding: 8px 0; cursor: pointer; border-bottom: 1px solid #eee;" data-menu-option="${index}">${option}</div>`
            ).join('');
            
            // Replace OK button with Close button
            modalActions.innerHTML = '<button class="btn btn--outline close-modal">Close</button>';
            
            // Add event listeners for menu options
            messageElement.addEventListener('click', (e) => {
                const optionIndex = e.target.getAttribute('data-menu-option');
                if (optionIndex !== null) {
                    const option = menuOptions[parseInt(optionIndex)];
                    this.handleMenuOption(option);
                }
            });
            
            // Re-attach close modal event
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
            
            // Reset modal actions to default OK button
            modalActions.innerHTML = '<button class="btn btn--primary close-modal">OK</button>';
            
            // Re-attach close modal event
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
        const statusElements = document.querySelectorAll('.network-status');
        statusElements.forEach(element => {
            element.classList.toggle('online', this.networkStatus === 'online');
            element.classList.toggle('offline', this.networkStatus === 'offline');
        });
    }
    
    simulateNetworkChange() {
        // Randomly change network status
        if (Math.random() < 0.1) { // 10% chance to go offline
            this.networkStatus = this.networkStatus === 'online' ? 'offline' : 'online';
            this.updateNetworkStatus();
            
            if (this.networkStatus === 'offline') {
                this.showSuccessModal(
                    'Network Status',
                    'You are now offline. Data will be synced when connection is restored.'
                );
            } else {
                this.showSuccessModal(
                    'Network Status',
                    'Connection restored. Syncing data...'
                );
            }
        }
    }
    
    loadUserData() {
        // Simulate loading user data from local storage
        try {
            const savedData = localStorage.getItem('smartbin-data');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.data = { ...this.data, ...parsedData };
            }
        } catch (error) {
            console.log('No saved data found or error loading data');
        }
    }
    
    saveUserData() {
        // Simulate saving user data to local storage
        try {
            localStorage.setItem('smartbin-data', JSON.stringify(this.data));
        } catch (error) {
            console.log('Error saving data');
        }
    }
    
    // Simulate real-time updates
    startRealTimeUpdates() {
        setInterval(() => {
            if (this.currentUser === 'municipal') {
                // Update bin fill levels
                this.data.municipalData.binStatus.forEach(bin => {
                    if (Math.random() < 0.3) { // 30% chance to update
                        bin.fillLevel = Math.min(100, bin.fillLevel + Math.floor(Math.random() * 5));
                        
                        if (bin.fillLevel > 90) {
                            bin.status = 'High Fill';
                        } else if (bin.battery < 30) {
                            bin.status = 'Low Battery';
                        } else {
                            bin.status = 'Normal';
                        }
                    }
                });
                
                this.renderBinList();
            }
        }, 10000); // Update every 10 seconds
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SmartBinApp();
    
    // Start real-time updates
    app.startRealTimeUpdates();
    
    // Save data periodically
    setInterval(() => {
        app.saveUserData();
    }, 30000); // Save every 30 seconds
    
    // Handle page visibility changes to pause/resume updates
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('App backgrounded');
        } else {
            console.log('App foregrounded');
            app.updateNetworkStatus();
        }
    });
    
    // Handle online/offline events
    window.addEventListener('online', () => {
        app.networkStatus = 'online';
        app.updateNetworkStatus();
        app.showSuccessModal('Network Status', 'Connection restored!');
    });
    
    window.addEventListener('offline', () => {
        app.networkStatus = 'offline';
        app.updateNetworkStatus();
        app.showSuccessModal('Network Status', 'You are offline. Data will sync when connection is restored.');
    });
    
    // Prevent default form submissions and handle touch events
    document.addEventListener('touchstart', (e) => {
        // Add touch feedback
        if (e.target.classList.contains('btn') || e.target.classList.contains('action-card')) {
            e.target.style.transform = 'scale(0.98)';
        }
    });
    
    document.addEventListener('touchend', (e) => {
        // Remove touch feedback
        if (e.target.classList.contains('btn') || e.target.classList.contains('action-card')) {
            setTimeout(() => {
                e.target.style.transform = '';
            }, 100);
        }
    });
    
    // Handle back button for overlays and modals
    window.addEventListener('popstate', (e) => {
        const activeOverlay = document.querySelector('.overlay.active');
        const activeModal = document.querySelector('.modal:not(.hidden)');
        
        if (activeOverlay) {
            activeOverlay.classList.remove('active');
        } else if (activeModal) {
            activeModal.classList.add('hidden');
        }
    });
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeOverlay = document.querySelector('.overlay.active');
            const activeModal = document.querySelector('.modal:not(.hidden)');
            
            if (activeOverlay) {
                activeOverlay.classList.remove('active');
            } else if (activeModal) {
                activeModal.classList.add('hidden');
            }
        }
    });
    
    // Simulate push notifications
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                setTimeout(() => {
                    new Notification('SmartBin', {
                        body: 'Welcome to SmartBin! Start earning rewards by disposing waste responsibly.',
                        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNOCAxMkgxNlYyMEg4VjEyWiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K'
                    });
                }, 3000);
            }
        });
    }
});