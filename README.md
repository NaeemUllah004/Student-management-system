# 🎓 Student Management System

A comprehensive web-based Student Management System built with HTML, CSS, JavaScript, and PHP with complete form validation. Perfect for university projects and real-world problem-solving.

## 📋 Features

- ✅ **User Authentication** - Secure login system
- ✅ **Student Registration** - Add new students with complete validation
- ✅ **Student Records Management** - View, edit, and delete student records
- ✅ **Search Functionality** - Real-time search across all fields
- ✅ **Dashboard Statistics** - Visual statistics and analytics
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **CRUD Operations** - Complete Create, Read, Update, Delete functionality

## 🛠️ Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (Custom styling with CSS variables)
  - JavaScript (Vanilla JS - no frameworks)

- **Backend:**
  - PHP 7.4+
  - MySQL Database

## 📁 Project Structure

```
student-management-system/
│
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── add-student.html        # Add new student form
│
├── css/
│   └── style.css          # All styling
│
├── js/
│   ├── validation.js      # Form validation utilities
│   ├── login.js          # Login functionality
│   ├── dashboard.js      # Dashboard operations
│   └── add-student.js    # Add student functionality
│
└── php/
    ├── config.php         # Database configuration
    ├── login.php          # Login handler
    ├── add-student.php    # Add student handler
    ├── get-students.php   # Fetch all students
    ├── get-student.php    # Fetch single student
    ├── update-student.php # Update student
    └── delete-student.php # Delete student
```

## 🚀 Installation & Setup

### Prerequisites

1. **XAMPP** (or any PHP server with MySQL)
   - Download from: https://www.apachefriends.org/
   - Install and run Apache and MySQL

2. **Visual Studio Code**
   - Download from: https://code.visualstudio.com/

### Step-by-Step Installation

#### 1. Setup the Project

```bash
# Copy the project folder to your XAMPP htdocs directory
# Usually located at: C:\xampp\htdocs\ (Windows) or /opt/lampp/htdocs/ (Linux)

# Example path:
C:\xampp\htdocs\student-management-system\
```

#### 2. Database Setup

The database will be created automatically when you first run the application!

**Database Details:**
- Database Name: `student_management`
- Table Name: `students`
- Default User: root
- Default Password: (empty)

If you need to change database credentials, edit `php/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Add your password if needed
define('DB_NAME', 'student_management');
```

#### 3. Start XAMPP

1. Open XAMPP Control Panel
2. Start **Apache** server
3. Start **MySQL** server

#### 4. Access the Application

Open your web browser and go to:
```
http://localhost/student-management-system/
```

## 🔐 Default Login Credentials

```
Username: admin
Password: admin123
```

## 💡 How to Use

### 1. Login
- Open the application in your browser
- Enter username: `admin` and password: `admin123`
- Click Login

### 2. Add New Student
- Click on "Add Student" in the navigation
- Fill in all required fields:
  - Student ID (6-15 alphanumeric characters)
  - Full Name (letters and spaces only)
  - Email (valid email format)
  - Phone (valid phone number)
  - Date of Birth (student must be 15-100 years old)
  - Gender
  - Address (minimum 10 characters)
  - Department
  - Semester (1-8)
  - Enrollment Date
  - Status (Active/Inactive)
- Click "Add Student"

### 3. View Students
- The dashboard displays all student records
- View statistics at the top (Total Students, Active Students, Departments)
- See all student information in a table format

### 4. Search Students
- Use the search box to find students by:
  - Student ID
  - Name
  - Email
  - Phone
  - Department
- Results update in real-time as you type

### 5. Edit Student
- Click the "Edit" button on any student record
- Update the information in the modal
- Click "Update Student"

### 6. Delete Student
- Click the "Delete" button on any student record
- Confirm the deletion
- Student will be removed from the database

## ✅ Form Validation Features

### Client-Side Validation (JavaScript)
- Real-time validation as you type
- Immediate feedback on errors
- Prevents form submission if validation fails

### Server-Side Validation (PHP)
- Double-checks all data on the server
- Prevents malicious data entry
- Ensures data integrity

### Validation Rules

| Field | Validation Rules |
|-------|-----------------|
| Student ID | 6-15 alphanumeric characters, unique |
| Name | 2-50 letters and spaces only |
| Email | Valid email format, unique |
| Phone | Valid phone number format |
| Date of Birth | Age between 15-100 years |
| Gender | Must select Male/Female/Other |
| Address | Minimum 10 characters |
| Department | Must select a department |
| Semester | Must be between 1-8 |
| Enrollment Date | Valid date |

## 🎨 Features Demonstration

### Dashboard Statistics
- **Total Students**: Shows count of all registered students
- **Active Students**: Shows count of currently active students
- **Departments**: Shows number of unique departments

### Responsive Design
- Works perfectly on:
  - Desktop computers
  - Tablets
  - Mobile phones
- Automatically adjusts layout for different screen sizes

### Real-Time Search
- Search works across all fields
- No page reload required
- Instant results

## 🐛 Troubleshooting

### Problem: Database connection failed
**Solution:** 
- Make sure MySQL is running in XAMPP
- Check database credentials in `php/config.php`
- Ensure database name is correct

### Problem: Pages not loading
**Solution:**
- Make sure Apache is running in XAMPP
- Check if the project is in the correct htdocs folder
- Use correct URL: `http://localhost/student-management-system/`

### Problem: Form not submitting
**Solution:**
- Check browser console for JavaScript errors (F12)
- Make sure all required fields are filled
- Verify PHP files are in the correct location

### Problem: Students not displaying
**Solution:**
- Check if database table was created
- Try adding a student first
- Check browser console for errors

## 🔧 Customization

### Change Theme Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;     /* Change primary color */
    --success-color: #10b981;     /* Change success color */
    --danger-color: #ef4444;      /* Change danger color */
    /* ... other colors ... */
}
```

### Add More Departments
Edit both files:

1. In HTML files (`add-student.html` and `dashboard.html`):
```html
<option value="Your New Department">Your New Department</option>
```

2. Validation remains automatic

### Modify Validation Rules
Edit `js/validation.js` to change validation rules

## 📊 Database Schema

```sql
students Table:
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- student_id (VARCHAR(50), UNIQUE)
- name (VARCHAR(100))
- email (VARCHAR(100), UNIQUE)
- phone (VARCHAR(20))
- dob (DATE)
- gender (ENUM: Male, Female, Other)
- address (TEXT)
- department (VARCHAR(100))
- semester (INT)
- enrollment_date (DATE)
- status (ENUM: Active, Inactive)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🎯 Real-World Applications

This system can be used for:
- ✅ University student management
- ✅ School student records
- ✅ Training institute management
- ✅ Course enrollment systems
- ✅ Educational institution databases

## 📝 License

This project is free to use for educational and personal purposes.

## 👨‍💻 Support

For any questions or issues:
1. Check the troubleshooting section above
2. Review the code comments for guidance
3. Ensure all files are in the correct locations

## 🚀 Future Enhancements

Possible additions:
- PDF report generation
- Email notifications
- Advanced filtering
- Attendance tracking
- Grade management
- Photo uploads
- Export to Excel
- Multi-user roles

---

**Happy Coding! 🎉**

Made with ❤️ for educational purposes
