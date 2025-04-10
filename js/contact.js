document.addEventListener('DOMContentLoaded', function() {
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
    
    // WhatsApp button functionality
    document.querySelector('.whatsapp-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const phoneNumber = '256740765758'; // Your WhatsApp number with country code
        const defaultMessage = 'Hello BreakThrough Tech Academy, I have a question about your courses...';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
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
});