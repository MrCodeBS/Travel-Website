// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateThemeToggleIcon();
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

function updateThemeToggleIcon() {
  const sunIcon = themeToggle.querySelector('.fa-sun');
  const moonIcon = themeToggle.querySelector('.fa-moon');

  if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline-block';
  } else {
    sunIcon.style.display = 'inline-block';
    moonIcon.style.display = 'none';
  }
}

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
  updateThemeToggleIcon();
}

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animate elements on scroll
const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, {
  threshold: 0.1
});

document.querySelectorAll('.destination, .booking-form').forEach(el => {
  observer.observe(el);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Form validation
const bookingForm = document.querySelector('.booking-form form');

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const destination = document.getElementById('destination').value;
  const checkIn = document.getElementById('check-in').value;
  const checkOut = document.getElementById('check-out').value;
  const guests = document.getElementById('guests').value;
  const roomType = document.getElementById('room-type').value;

  if (destination && checkIn && checkOut && guests && roomType) {
    alert('Booking submitted successfully!');
    bookingForm.reset();
  } else {
    alert('Please fill in all fields.');
  }
});

// Dynamic copyright year
const currentYear = new Date().getFullYear();
document.querySelector('footer p').textContent = `© ${currentYear} TravelEase. All rights reserved.`;

// Add a simple loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}