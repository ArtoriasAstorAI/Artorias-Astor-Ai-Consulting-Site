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
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            source: 'website_contact_form'
        };

        try {
            // Create a proxy URL to handle CORS
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const webhookUrl = this.action;
            
            // Send data to n8n webhook through proxy
            const response = await fetch(proxyUrl + webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                throw new Error('Failed to submit the form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again later.');
            // Also log the error to the console for debugging
            console.error('Error details:', error.message);
        }
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
