<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize input
    $student_id = trim($_POST['student_id'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $dob = $_POST['dob'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $address = trim($_POST['address'] ?? '');
    $department = $_POST['department'] ?? '';
    $semester = $_POST['semester'] ?? '';
    $enrollment_date = $_POST['enrollment_date'] ?? '';
    $status = $_POST['status'] ?? 'Active';
    
    // Server-side validation
    $errors = [];
    
    // Validate Student ID
    if (empty($student_id)) {
        $errors[] = 'Student ID is required';
    } elseif (!preg_match('/^[A-Z0-9]{6,15}$/i', $student_id)) {
        $errors[] = 'Student ID must be 6-15 alphanumeric characters';
    }
    
    // Validate Name
    if (empty($name)) {
        $errors[] = 'Name is required';
    } elseif (!preg_match('/^[a-zA-Z\s]{2,50}$/', $name)) {
        $errors[] = 'Name should contain only letters and spaces (2-50 characters)';
    }
    
    // Validate Email
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format';
    }
    
    // Validate Phone
    if (empty($phone)) {
        $errors[] = 'Phone is required';
    } elseif (!preg_match('/^(\+92|0)?[0-9]{10,12}$/', preg_replace('/[\s\-\(\)]/', '', $phone))) {
        $errors[] = 'Invalid phone number format';
    }
    
    // Validate Date of Birth
    if (empty($dob)) {
        $errors[] = 'Date of birth is required';
    } else {
        $dobDate = new DateTime($dob);
        $today = new DateTime();
        $age = $today->diff($dobDate)->y;
        if ($age < 15 || $age > 100) {
            $errors[] = 'Student must be between 15 and 100 years old';
        }
    }
    
    // Validate Gender
    if (empty($gender) || !in_array($gender, ['Male', 'Female', 'Other'])) {
        $errors[] = 'Valid gender is required';
    }
    
    // Validate Address
    if (empty($address) || strlen($address) < 10) {
        $errors[] = 'Address must be at least 10 characters long';
    }
    
    // Validate Department
    if (empty($department)) {
        $errors[] = 'Department is required';
    }
    
    // Validate Semester
    if (empty($semester) || $semester < 1 || $semester > 8) {
        $errors[] = 'Valid semester (1-8) is required';
    }
    
    // Validate Enrollment Date
    if (empty($enrollment_date)) {
        $errors[] = 'Enrollment date is required';
    }
    
    // If there are validation errors
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => implode(', ', $errors)
        ]);
        exit;
    }
    
    // Get database connection
    $conn = getConnection();
    
    // Check if student ID or email already exists
    $checkSql = "SELECT id FROM students WHERE student_id = ? OR email = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param('ss', $student_id, $email);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Student ID or Email already exists'
        ]);
        $checkStmt->close();
        $conn->close();
        exit;
    }
    $checkStmt->close();
    
    // Prepare SQL statement
    $sql = "INSERT INTO students (student_id, name, email, phone, dob, gender, address, department, semester, enrollment_date, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssssssssss', $student_id, $name, $email, $phone, $dob, $gender, $address, $department, $semester, $enrollment_date, $status);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Student added successfully',
            'student_id' => $conn->insert_id
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error adding student: ' . $stmt->error
        ]);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>
