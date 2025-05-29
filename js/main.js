// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Timer animation based on scroll
    const timerElement = document.getElementById('waitingTimer');
    const yearElement = document.getElementById('currentYear');
    const timelineSection = document.getElementById('timeline');
    const currentIssuesSection = document.querySelector('#current-issues');
    
    let isInCurrentIssues = false;

    function updateTimer(scrollProgress) {
        if (isInCurrentIssues) {
            timerElement.textContent = '00:32';
            yearElement.textContent = '۱۴۰۴';
            return;
        }
        
        // Convert scroll progress (0 to 1) to time range (290 to 32 minutes)
        const totalMinutes = Math.round(290 - (scrollProgress * (290 - 32)));
        
        // Convert to hours and minutes
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        // Format the time string as HH:MM
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        timerElement.textContent = timeString;

        // Update year based on minutes
        const yearMap = {
            290: '۱۳۹۳', 260: '۱۳۹۴', 220: '۱۳۹۵', 180: '۱۳۹۶',
            150: '۱۳۹۷', 120: '۱۳۹۸', 90: '۱۳۹۹', 60: '۱۴۰۰',
            45: '۱۴۰۱', 32: '۱۴۰۲', 25: '۱۴۰۳', 32: '۱۴۰۴'
        };
        
        // Find the closest year
        const closestMinutes = Object.keys(yearMap).reduce((prev, curr) => {
            return Math.abs(curr - totalMinutes) < Math.abs(prev - totalMinutes) ? curr : prev;
        });
        
        yearElement.textContent = yearMap[closestMinutes];
    }

    // Create an observer for the timeline section
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInCurrentIssues = false;
                const scrollProgress = Math.min(
                    Math.max(
                        (window.innerHeight - entry.boundingClientRect.top) / (window.innerHeight + entry.boundingClientRect.height),
                        0
                    ),
                    1
                );
                updateTimer(scrollProgress);
            }
        });
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-45% 0px -45% 0px'
    });

    // Create an observer for the current issues section
    const currentIssuesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInCurrentIssues = true;
                timerElement.textContent = '00:32';
                yearElement.textContent = '۱۴۰۴';
            } else if (entry.boundingClientRect.top > window.innerHeight) {
                isInCurrentIssues = false;
            }
        });
    }, {
        threshold: [0, 1],
        rootMargin: '-45% 0px -45% 0px'
    });

    // Start observing both sections
    timelineObserver.observe(timelineSection);
    currentIssuesObserver.observe(currentIssuesSection);

    // Add scroll event listener for updating the timer within the timeline section
    window.addEventListener('scroll', function() {
        if (!isInCurrentIssues) {
            const timelineRect = timelineSection.getBoundingClientRect();
            if (timelineRect.top < window.innerHeight - 200 && timelineRect.bottom > 200) {
                const scrollProgress = Math.min(
                    Math.max(
                        (window.innerHeight - timelineRect.top) / (window.innerHeight + timelineRect.height),
                        0
                    ),
                    1
                );
                updateTimer(scrollProgress);
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize the waiting time chart
    const waitingTimes = [400, 380, 350, 300, 260, 220, 180, 150, 120, 90, 60, 45, 32];
    const years = {
        '400': '1393', '380': '1394', '350': '1395', '300': '1396',
        '260': '1397', '220': '1398', '180': '1399', '150': '1400',
        '120': '1401', '90': '1402', '60': '1403', '45': '1404'
    };
    
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
                    max: 400,
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

    // Create mini chart
    const miniCtx = document.getElementById('miniWaitingTimeChart').getContext('2d');
    const miniChart = new Chart(miniCtx, {
        type: 'line',
        data: {
            labels: Object.values(years).reverse(),
            datasets: [{
                label: 'Waiting Time (Minutes)',
                data: waitingTimes,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointRadius: 3,
                pointHoverRadius: 5,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c3e50',
                    bodyColor: '#2c3e50',
                    borderColor: '#3498db',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            return `زمان انتظار: ${context.raw} دقیقه`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false,
                    min: 0,
                    max: 420
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 500
            }
        }
    });

    // Update mini chart point when scrolling through timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentActiveIndex = -1;

    // Function to update the active point
    function updateActivePoint(yearIndex) {
        if (yearIndex !== -1 && yearIndex !== currentActiveIndex) {
            currentActiveIndex = yearIndex;
            
            // Update the active point with animation
            miniChart.setActiveElements([{
                datasetIndex: 0,
                index: yearIndex
            }]);
            
            // Update the timer display
            const waitingTime = waitingTimes[yearIndex];
            const hours = Math.floor(waitingTime / 60);
            const minutes = waitingTime % 60;
            updateTimer(waitingTime);
            
            // Add highlight effect to the active point
            const meta = miniChart.getDatasetMeta(0);
            meta.data.forEach((point, index) => {
                point._model.radius = index === yearIndex ? 5 : 3;
                point._model.backgroundColor = index === yearIndex ? '#e74c3c' : 'rgba(52, 152, 219, 1)';
            });
            
            miniChart.update('none');
        }
    }

    // Create an array to store the year indices
    const yearIndices = Array.from(timelineItems).map((item, index) => index);

    // Create an IntersectionObserver for each timeline item
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = yearIndices[entry.target.dataset.index];
                updateActivePoint(index);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-45% 0px -45% 0px'
    });

    // Add data-index to each timeline item and observe them
    timelineItems.forEach((item, index) => {
        item.dataset.index = index;
        observer.observe(item);
    });

    // Initial update
    updateActivePoint(0);

    // Timer visibility on scroll
    const timerWrapper = document.querySelector('.timer-wrapper');
    const timerNav = document.querySelector('.timer-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show fixed timer when scrolling down and nav timer is out of view
        if (scrollTop > lastScrollTop && scrollTop > timerNav.offsetHeight) {
            timerWrapper.classList.add('visible');
        } else {
            timerWrapper.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    });
}); 