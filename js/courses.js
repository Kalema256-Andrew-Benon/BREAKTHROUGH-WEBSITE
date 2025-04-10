document.addEventListener('DOMContentLoaded', function() {
    // Course Search Functionality
    const courseSearch = document.getElementById('course-search');
    const courseItems = document.querySelectorAll('.course-item');
    
    courseSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        courseItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Enrollment Form Handling
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseItem = this.closest('.course-item');
            const enrollForm = courseItem.querySelector('.enroll-form');
            
            // Hide all other forms first
            document.querySelectorAll('.enroll-form').forEach(form => {
                if (form !== enrollForm) {
                    form.style.display = 'none';
                }
            });
            
            // Toggle current form
            if (enrollForm.style.display === 'block') {
                enrollForm.style.display = 'none';
            } else {
                enrollForm.style.display = 'block';
                enrollForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Form Submission
    const enrollmentForms = document.querySelectorAll('.enrollment-form');
    
    enrollmentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const enrollmentData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                course: formData.get('course'),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };
            
            // Save to local storage
            let enrollments = JSON.parse(localStorage.getItem('courseEnrollments')) || [];
            enrollments.push(enrollmentData);
            localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));
            
            // Show success message
            const successMsg = this.nextElementSibling;
            successMsg.textContent = `Thank you, ${enrollmentData.name}! You've successfully enrolled in ${enrollmentData.course}.`;
            successMsg.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Hide form after success
            setTimeout(() => {
                this.closest('.enroll-form').style.display = 'none';
                successMsg.style.display = 'none';
            }, 5000);
        });
    });
});