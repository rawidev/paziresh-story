// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
    const ctx = document.getElementById('waitingTimeChart').getContext('2d');
    const waitingTimeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1391', '1392', '1393', '1394', '1395', '1396', '1397', '1398', '1399', '1400', '1401', '1402', '1403', '1404'],
            datasets: [{
                label: 'زمان انتظار (دقیقه)',
                data: [420, 380, 350, 300, 260, 220, 180, 150, 120, 90, 60, 45, 32, 25],
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
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Vazirmatn'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'روند کاهش زمان انتظار بیماران',
                    font: {
                        family: 'Vazirmatn',
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'دقیقه',
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
                        text: 'سال',
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
}); 