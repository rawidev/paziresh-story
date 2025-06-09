// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Timer animation based on scroll
    const timerElement = document.getElementById('waitingTimer');
    const yearElement = document.getElementById('currentYear');
    
    let lastScrollTop = 0;
    let currentDirection = 'down';

    // Define the years mapping
    const years = {
        '130': '1393', '120': '1394', '110': '1395', '100': '1396',
        '90': '1397', '80': '1398', '70': '1399', '60': '1400',
        '50': '1401', '40': '1402', '35': '1403', '32': '1404'
    };

    // Function to get the closest year for a given minute value
    function getClosestYear(minutes) {
        const minuteValues = Object.keys(years).map(Number);
        const closest = minuteValues.reduce((prev, curr) => {
            return (Math.abs(curr - minutes) < Math.abs(prev - minutes) ? curr : prev);
        });
        return years[closest];
    }

    function updateTimer() {
        const scrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(scrollPosition / totalHeight, 0), 1);
        
        // Calculate time based on scroll position and direction
        let totalMinutes;
        if (currentDirection === 'down') {
            // Count down from 130 to 32 minutes
            totalMinutes = Math.round(130 - (scrollProgress * (130 - 32)));
        } else {
            // Count up from 32 to 130 minutes
            totalMinutes = Math.round(32 + (scrollProgress * (130 - 32)));
        }
        
        // Ensure totalMinutes stays within bounds
        totalMinutes = Math.min(Math.max(totalMinutes, 32), 130);
        
        // Format the time as hh:mm
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        // Update the timer display
        timerElement.textContent = formattedTime;
        
        // Update the year based on the current time
        const currentYear = getClosestYear(totalMinutes);
        yearElement.textContent = currentYear;
    }

    // Set initial values
    timerElement.textContent = '02:10';
    yearElement.textContent = '1393';

    // Add scroll event listener for updating the timer
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            currentDirection = 'down';
        } else if (scrollTop < lastScrollTop) {
            currentDirection = 'up';
        }
        
        // Reset to initial values when at the top
        if (scrollTop === 0) {
            timerElement.textContent = '02:10';
            yearElement.textContent = '1393';
        } else {
            updateTimer();
        }
        
        lastScrollTop = scrollTop;
    });

    // Initialize the waiting time chart
    const waitingTimes = [130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 35, 32];
    
    const ctx = document.getElementById('waitingTimeChart').getContext('2d');
    const waitingTimeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.values(years).reverse(),
            datasets: [{
                label: '',
                data: waitingTimes,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 140,
                    title: {
                        display: true,
                        text: 'Minutes',
                        font: {
                            family: 'Vazirmatn'
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Vazirmatn'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            family: 'Vazirmatn'
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Vazirmatn'
                        }
                    }
                }
            }
        }
    });

    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 100);
    });

    // Timer visibility on scroll
    const timerWrapper = document.querySelector('.timer-wrapper');
    const timerNav = document.querySelector('.timer-nav');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        // Show fixed timer when scrolling down and nav timer is out of view
        if (scrollTop > lastScrollTop && scrollTop > timerNav.offsetHeight) {
            timerWrapper.classList.add('visible');
        } else {
            timerWrapper.classList.remove('visible');
        }
    });
}); 