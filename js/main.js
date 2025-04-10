 // main.js - Complete JavaScript for BreakThrough Tech Academy

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Hero Section Slideshow
    if (document.querySelector('.hero')) {
        const heroSlides = [
            { image: 'url("../images/studentlearning.jpg")' },
            { image: 'url("../images/learning3.jpg")' },
            { image: 'url("../images/learning4.jpg")' }
        ];

        const heroSection = document.querySelector('.hero');
        const slideshowContainer = document.createElement('div');
        slideshowContainer.className = 'hero-slideshow';
        
        // Create slides
        heroSlides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `hero-slide ${index === 0 ? 'active' : ''}`;
            slideElement.style.backgroundImage = slide.image;
            slideshowContainer.appendChild(slideElement);
        });
        
        heroSection.insertBefore(slideshowContainer, heroSection.firstChild);

        // Slideshow functionality
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        
        function showNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 3 seconds
        setInterval(showNextSlide, 3000);
    }

    // Testimonials Carousel (for home page)
    if (document.querySelector('.testimonial-carousel')) {
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const totalTestimonials = testimonials.length;
        let carouselInterval;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[index].classList.add('active');
            currentTestimonial = index;
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }

        // Auto-rotate every 5 seconds
        function startCarousel() {
            carouselInterval = setInterval(nextTestimonial, 5000);
        }

        // Manual controls
        document.querySelector('.prev')?.addEventListener('click', function() {
            clearInterval(carouselInterval);
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentTestimonial);
            startCarousel();
        });

        document.querySelector('.next')?.addEventListener('click', function() {
            clearInterval(carouselInterval);
            nextTestimonial();
            startCarousel();
        });

        // Initialize
        showTestimonial(0);
        startCarousel();
    }

    // FAQ Accordion Functionality
    if (document.querySelector('.faq-container')) {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggleIcon = question.querySelector('.toggle-icon');
            
            question.addEventListener('click', () => {
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        otherItem.querySelector('.toggle-icon').textContent = '+';
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggleIcon.textContent = '-';
                } else {
                    answer.style.maxHeight = null;
                    toggleIcon.textContent = '+';
                }
            });
        });
    }

    // Contact Form Validation
    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('success-message');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.error').forEach(el => el.remove());
            [name, email, subject, message].forEach(field => {
                field.style.borderColor = 'var(--border-color)';
            });
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                showError(subject, 'Please enter a subject');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Prepare form data
                const formData = new FormData(contactForm);
                
                // Send email using mailto (fallback)
                const mailtoLink = `mailto:kalemabirungi7@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(
                    `Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`
                )}`;
                
                // Try to send the email
                window.location.href = mailtoLink;
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
        
        // Helper function to show error messages
        function showError(input, message) {
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = message;
            error.style.color = 'var(--error-color)';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '0.3rem';
            input.parentNode.appendChild(error);
            input.style.borderColor = 'var(--error-color)';
        }
        
        // Email validation helper
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    // WhatsApp button functionality
    document.querySelector('.whatsapp-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        const phoneNumber = '256740765758'; // Your WhatsApp number with country code
        const defaultMessage = 'Hello BreakThrough Tech Academy, I have a question about your courses...';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
    });
});