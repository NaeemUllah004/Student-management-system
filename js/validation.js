// Validation utility functions
const Validator = {
    // Email validation
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Phone validation (supports various formats)
    isValidPhone: function(phone) {
        // Removes spaces, dashes, and parentheses for validation
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
        return phoneRegex.test(cleanPhone);
    },

    // Student ID validation (alphanumeric, 6-15 characters)
    isValidStudentId: function(id) {
        const idRegex = /^[A-Z0-9]{6,15}$/i;
        return idRegex.test(id);
    },

    // Name validation (letters and spaces only, 2-50 characters)
    isValidName: function(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    },

    // Date validation (not in future, person must be at least 15 years old)
    isValidDOB: function(dob) {
        const date = new Date(dob);
        const today = new Date();
        const minAge = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
        const maxAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        
        return date <= minAge && date >= maxAge;
    },

    // Address validation (minimum 10 characters)
    isValidAddress: function(address) {
        return address.trim().length >= 10;
    },

    // Password validation (min 6 characters)
    isValidPassword: function(password) {
        return password.length >= 6;
    },

    // Required field validation
    isRequired: function(value) {
        return value.trim() !== '';
    }
};

// Show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + 'Error');
    const formGroup = input.closest('.form-group');
    
    if (errorSpan) {
        errorSpan.textContent = message;
    }
    
    if (formGroup) {
        formGroup.classList.add('error');
    }
    
    input.style.borderColor = '#ef4444';
}

// Clear error message
function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + 'Error');
    const formGroup = input.closest('.form-group');
    
    if (errorSpan) {
        errorSpan.textContent = '';
    }
    
    if (formGroup) {
        formGroup.classList.remove('error');
    }
    
    input.style.borderColor = '#e2e8f0';
}

// Real-time validation
function setupRealTimeValidation() {
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !Validator.isValidEmail(this.value)) {
                showError('email', 'Please enter a valid email address');
            } else if (this.value) {
                clearError('email');
            }
        });
    }

    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !Validator.isValidPhone(this.value)) {
                showError('phone', 'Please enter a valid phone number (e.g., +92 300 1234567)');
            } else if (this.value) {
                clearError('phone');
            }
        });
    }

    // Student ID validation
    const studentIdInput = document.getElementById('student_id');
    if (studentIdInput) {
        studentIdInput.addEventListener('blur', function() {
            if (this.value && !Validator.isValidStudentId(this.value)) {
                showError('student_id', 'Student ID must be 6-15 alphanumeric characters');
            } else if (this.value) {
                clearError('student_id');
            }
        });
    }

    // Name validation
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value && !Validator.isValidName(this.value)) {
                showError('name', 'Name should contain only letters and spaces (2-50 characters)');
            } else if (this.value) {
                clearError('name');
            }
        });
    }

    // Date of Birth validation
    const dobInput = document.getElementById('dob');
    if (dobInput) {
        dobInput.addEventListener('change', function() {
            if (this.value && !Validator.isValidDOB(this.value)) {
                showError('dob', 'Student must be between 15 and 100 years old');
            } else if (this.value) {
                clearError('dob');
            }
        });
    }

    // Address validation
    const addressInput = document.getElementById('address');
    if (addressInput) {
        addressInput.addEventListener('blur', function() {
            if (this.value && !Validator.isValidAddress(this.value)) {
                showError('address', 'Address must be at least 10 characters long');
            } else if (this.value) {
                clearError('address');
            }
        });
    }

    // Password validation
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            if (this.value && !Validator.isValidPassword(this.value)) {
                showError('password', 'Password must be at least 6 characters long');
            } else if (this.value) {
                clearError('password');
            }
        });
    }

    // Clear errors on input
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.id && document.getElementById(this.id + 'Error')) {
                clearError(this.id);
            }
        });
    });
}

// Validate complete form
function validateForm(formId) {
    let isValid = true;
    const form = document.getElementById(formId);
    
    if (!form) return false;

    // Get all required fields
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!Validator.isRequired(field.value)) {
            showError(field.id, 'This field is required');
            isValid = false;
        }
    });

    // Specific field validations
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value && !Validator.isValidEmail(emailInput.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value && !Validator.isValidPhone(phoneInput.value)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    const studentIdInput = document.getElementById('student_id');
    if (studentIdInput && studentIdInput.value && !Validator.isValidStudentId(studentIdInput.value)) {
        showError('student_id', 'Student ID must be 6-15 alphanumeric characters');
        isValid = false;
    }

    const nameInput = document.getElementById('name');
    if (nameInput && nameInput.value && !Validator.isValidName(nameInput.value)) {
        showError('name', 'Name should contain only letters and spaces');
        isValid = false;
    }

    const dobInput = document.getElementById('dob');
    if (dobInput && dobInput.value && !Validator.isValidDOB(dobInput.value)) {
        showError('dob', 'Student must be between 15 and 100 years old');
        isValid = false;
    }

    const addressInput = document.getElementById('address');
    if (addressInput && addressInput.value && !Validator.isValidAddress(addressInput.value)) {
        showError('address', 'Address must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    // Insert at the top of the form or page
    const container = document.querySelector('.form-card') || document.querySelector('.dashboard-container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Initialize validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
});
