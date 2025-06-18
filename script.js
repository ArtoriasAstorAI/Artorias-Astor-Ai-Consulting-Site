// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const now = new Date();
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: now.toISOString(),
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            source: 'website_contact_form'
        };

        // Create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.action, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            console.log('Response:', xhr.responseText);
            if (xhr.status === 200) {
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                alert(`Thank you ${name}!\n\nIf you don\'t receive a confirmation email within a few minutes, please submit another response with a different email address.`);
                contactForm.reset();
            } else {
                alert('There was an error submitting your message. Please try again later.');
                console.error('Form submission failed:', xhr.responseText);
            }
        };

        xhr.onerror = function() {
            alert('There was an error submitting your message. Please try again later.');
            console.error('Network error occurred');
        };

        // Send the data
        xhr.send(JSON.stringify(data));
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe all benefit cards
document.querySelectorAll('.benefit-card').forEach(card => {
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add scroll animations to headings
document.querySelectorAll('h2').forEach(heading => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(20px)';
    heading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    heading.addEventListener('mouseenter', () => {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
    });
});
