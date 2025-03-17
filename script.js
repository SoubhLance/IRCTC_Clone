// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeToggleIcon = themeToggleBtn.querySelector('i');
const themeToggleText = themeToggleBtn.querySelector('span');
const tabButtons = document.querySelectorAll('.tab-btn');
const searchForms = document.querySelectorAll('.search-form');
const swapBtn = document.getElementById('swap-btn');
const fromStationInput = document.getElementById('from-station');
const toStationInput = document.getElementById('to-station');

// Theme Toggle Functionality
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon and text
    if (document.body.classList.contains('dark-mode')) {
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
        themeToggleText.textContent = 'Light Mode';
        // Save preference to localStorage
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
        themeToggleText.textContent = 'Dark Mode';
        // Save preference to localStorage
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
        themeToggleText.textContent = 'Light Mode';
    }
    
    // Set current date as default for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.value = today;
        // Set min date to today
        input.min = today;
    });
});

// Tab Switching Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Deactivate all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        searchForms.forEach(form => form.classList.remove('active'));
        
        // Activate clicked tab
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Swap stations functionality
swapBtn.addEventListener('click', () => {
    const fromValue = fromStationInput.value;
    const toValue = toStationInput.value;
    
    // Swap values with animation
    swapBtn.classList.add('rotating');
    
    setTimeout(() => {
        fromStationInput.value = toValue;
        toStationInput.value = fromValue;
        swapBtn.classList.remove('rotating');
    }, 300);
});

// Add rotating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(180deg); }
    }
    
    .rotating {
        animation: rotate 0.3s linear;
    }
`;
document.head.appendChild(style);

// Form Submission Handling (for demo purposes)
searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form ID to determine which search was performed
        const formId = form.id;
        let message = '';
        
        switch(formId) {
            case 'train-search':
                const fromStation = fromStationInput.value;
                const toStation = toStationInput.value;
                const journeyDate = document.getElementById('journey-date').value;
                const journeyClass = document.getElementById('journey-class').value;
                
                message = `Searching for trains from ${fromStation} to ${toStation} on ${journeyDate} in ${journeyClass} class.`;
                break;
                
            case 'pnr-status':
                const pnrNumber = document.getElementById('pnr-number').value;
                message = `Checking PNR status for ${pnrNumber}.`;
                break;
                
            case 'train-status':
                const trainNumber = document.getElementById('train-number').value;
                const trainDate = document.getElementById('train-date').value;
                message = `Checking status of train ${trainNumber} on ${trainDate}.`;
                break;
        }
        
        // Display message (in a real application, this would be an API call)
        alert(message);
    });
});

// Station autocomplete simulation (for demo purposes)
const popularStations = [
    'New Delhi', 'Mumbai Central', 'Chennai Central', 
    'Kolkata Howrah', 'Bangalore City', 'Hyderabad', 
    'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur',
    'Patna', 'Surat', 'Kochi', 'Guwahati', 'Bhopal'
];

// Simple autocomplete implementation
function setupAutocomplete(inputElement) {
    // Create autocomplete container
    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-items';
    autocompleteContainer.style.display = 'none';
    autocompleteContainer.style.position = 'absolute';
    autocompleteContainer.style.zIndex = '99';
    autocompleteContainer.style.left = '0';
    autocompleteContainer.style.right = '0';
    autocompleteContainer.style.top = '100%';
    autocompleteContainer.style.maxHeight = '200px';
    autocompleteContainer.style.overflowY = 'auto';
    autocompleteContainer.style.borderRadius = '0 0 4px 4px';
    autocompleteContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    
    inputElement.parentElement.style.position = 'relative';
    inputElement.parentElement.appendChild(autocompleteContainer);
    
    // Add input event listener
    inputElement.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        autocompleteContainer.innerHTML = '';
        autocompleteContainer.style.display = 'none';
        
        if (!val) return false;
        
        // Filter stations based on input
        const matches = popularStations.filter(station => 
            station.toLowerCase().includes(val)
        );
        
        if (matches.length > 0) {
            autocompleteContainer.style.display = 'block';
            
            // Create theme-specific styles
            const isDarkMode = document.body.classList.contains('dark-mode');
            const bgColor = isDarkMode ? '#2a2a2a' : '#ffffff';
            const textColor = isDarkMode ? '#f0f0f0' : '#333333';
            const hoverBgColor = isDarkMode ? '#252525' : '#e6f0ff';
            
            matches.forEach(station => {
                const item = document.createElement('div');
                item.innerHTML = station;
                item.style.padding = '10px';
                item.style.cursor = 'pointer';
                item.style.backgroundColor = bgColor;
                item.style.color = textColor;
                item.style.borderBottom = isDarkMode ? '1px solid #333333' : '1px solid #e0e0e0';
                
                item.addEventListener('mouseover', function() {
                    this.style.backgroundColor = hoverBgColor;
                });
                
                item.addEventListener('mouseout', function() {
                    this.style.backgroundColor = bgColor;
                });
                
                item.addEventListener('click', function() {
                    inputElement.value = this.innerHTML;
                    autocompleteContainer.style.display = 'none';
                });
                
                autocompleteContainer.appendChild(item);
            });
        }
    });
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== inputElement) {
            autocompleteContainer.style.display = 'none';
        }
    });
}

// Setup autocomplete for station inputs
setupAutocomplete(fromStationInput);
setupAutocomplete(toStationInput);