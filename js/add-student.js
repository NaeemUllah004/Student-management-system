document.addEventListener('DOMContentLoaded', function() {
    checkAuth(); // Check if user is authenticated

    const addStudentForm = document.getElementById('addStudentForm');

    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm('addStudentForm')) {
                showAlert('Please fix the errors before submitting', 'error');
                return;
            }

            // Get form data
            const formData = new FormData(addStudentForm);

            // Send to PHP backend
            fetch('php/add-student.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert('Student added successfully!', 'success');
                    
                    // Reset form
                    addStudentForm.reset();
                    
                    // Redirect to dashboard after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                } else {
                    showAlert(data.message || 'Error adding student', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('An error occurred while adding student', 'error');
            });
        });

        // Set default enrollment date to today
        const enrollmentDate = document.getElementById('enrollment_date');
        if (enrollmentDate && !enrollmentDate.value) {
            const today = new Date().toISOString().split('T')[0];
            enrollmentDate.value = today;
        }

        // Auto-format phone number
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.startsWith('92')) {
                        value = '+' + value;
                    } else if (!value.startsWith('+')) {
                        value = '+92' + value;
                    }
                }
                e.target.value = value;
            });
        }

        // Convert student ID to uppercase
        const studentIdInput = document.getElementById('student_id');
        if (studentIdInput) {
            studentIdInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.toUpperCase();
            });
        }
    }
});
