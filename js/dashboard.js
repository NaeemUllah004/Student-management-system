document.addEventListener('DOMContentLoaded', function() {
    checkAuth(); // Check if user is authenticated

    loadStudents();
    setupSearch();
    setupModal();
});

// Load all students
function loadStudents() {
    fetch('php/get-students.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayStudents(data.students);
                updateStats(data.students);
            } else {
                console.error('Error loading students:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error loading student data', 'error');
        });
}

// Display students in table
function displayStudents(students) {
    const tbody = document.getElementById('studentTableBody');
    
    if (!tbody) return;

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">No students found</td></tr>';
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr>
            <td><strong>${student.student_id}</strong></td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td><span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <button class="btn-success" onclick="editStudent(${student.id})">Edit</button>
                <button class="btn-danger" onclick="deleteStudent(${student.id}, '${student.name}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Update statistics
function updateStats(students) {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const departments = [...new Set(students.map(s => s.department))].length;

    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('activeStudents').textContent = activeStudents;
    document.getElementById('departments').textContent = departments;
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#studentTableBody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}

// Edit student
function editStudent(id) {
    fetch(`php/get-student.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const student = data.student;
                
                // Populate form
                document.getElementById('edit_id').value = student.id;
                document.getElementById('edit_student_id').value = student.student_id;
                document.getElementById('edit_name').value = student.name;
                document.getElementById('edit_email').value = student.email;
                document.getElementById('edit_phone').value = student.phone;
                document.getElementById('edit_department').value = student.department;
                document.getElementById('edit_semester').value = student.semester;
                document.getElementById('edit_status').value = student.status;

                // Show modal
                document.getElementById('editModal').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error loading student data', 'error');
        });
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('editModal');
    const span = document.getElementsByClassName('close')[0];
    const editForm = document.getElementById('editStudentForm');

    // Close modal when X is clicked
    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handle form submission
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(editForm);

            fetch('php/update-student.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert('Student updated successfully!', 'success');
                    modal.style.display = 'none';
                    loadStudents(); // Reload data
                } else {
                    showAlert(data.message || 'Error updating student', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('An error occurred while updating student', 'error');
            });
        });
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Delete student
function deleteStudent(id, name) {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        fetch('php/delete-student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${id}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Student deleted successfully!', 'success');
                loadStudents(); // Reload data
            } else {
                showAlert(data.message || 'Error deleting student', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred while deleting student', 'error');
        });
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.dashboard-container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}
