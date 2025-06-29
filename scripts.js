// Cookie Banner Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    console.log('Cookie Banner Element:', cookieBanner);
    console.log('Current cookie preference:', localStorage.getItem('cookiePreference'));

    if (!localStorage.getItem('cookiePreference')) {
        if (cookieBanner) {
            cookieBanner.style.display = 'flex';
            cookieBanner.classList.add('active');
            console.log('Cookie banner should be visible now');
        } else {
            console.log('Cookie banner element not found');
        }
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiePreference', 'accepted');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
                cookieBanner.classList.remove('active');
                console.log('Cookie banner hidden after accept');
            }
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookiePreference', 'declined');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
                cookieBanner.classList.remove('active');
                console.log('Cookie banner hidden after decline');
            }
        });
    }
});

// Weather API Integration
async function getWeather() {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (!weatherDisplay) return;

    const apiKey = '3b62358c0d8b0619bccbecf7583b7c1d';
    const city = 'Berlin';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Wetter-API nicht erreichbar');
        }

        const data = await response.json();
        
        // Wetter-Icon URL
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        weatherDisplay.innerHTML = `
            <div class="weather-info">
                <img src="${iconUrl}" alt="Wetter Icon" style="width: 64px; height: 64px;">
                <p class="temperature">${Math.round(data.main.temp)}°C</p>
                <p class="description">${data.weather[0].description}</p>
                <div class="weather-details">
                    <p>Luftfeuchtigkeit: ${data.main.humidity}%</p>
                    <p>Windgeschwindigkeit: ${Math.round(data.wind.speed * 3.6)} km/h</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Fehler beim Laden der Wetterdaten:', error);
        weatherDisplay.innerHTML = `
            <div class="weather-error">
                <p>Aktuell können keine Wetterdaten geladen werden.</p>
                <p>Bitte versuchen Sie es später erneut.</p>
            </div>
        `;
    }
}

// Counter Animation mit Easing
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing-Funktion für smoothere Animation
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        
        const currentValue = Math.floor(start + (range * easeOutQuad));
        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Intersection Observer für Counter
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const start = Math.floor(target * 0.5); // Start bei 50% des Zielwerts
            animateValue(counter, start, target, 1500); // 1.5 Sekunden Animation
            observer.unobserve(counter);
        }
    });
}, observerOptions);

// Filter functionality for fleet page
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                // Show/hide cards based on category
                carCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when scrolling
        window.addEventListener('scroll', () => {
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                alert('Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.');
                contactForm.reset();
            } else {
                alert('Bitte füllen Sie alle erforderlichen Felder aus.');
            }
        });
    }
});

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counters
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });

    // Initialize weather widget
    if (document.getElementById('weatherDisplay')) {
        getWeather();
    }

    console.log('All components initialized');
});
// Filter functionality for fleet page
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                // Show/hide cards based on category
                carCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = cardCategory === category ? 'flex' : 'none';
                    }
                });
            });
        });
    }
});