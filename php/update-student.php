<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $department = $_POST['department'] ?? '';
    $semester = $_POST['semester'] ?? '';
    $status = $_POST['status'] ?? 'Active';
    
    // Validation
    $errors = [];
    
    if (empty($id)) {
        $errors[] = 'Student ID is required';
    }
    
    if (empty($name) || !preg_match('/^[a-zA-Z\s]{2,50}$/', $name)) {
        $errors[] = 'Valid name is required';
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required';
    }
    
    if (empty($phone)) {
        $errors[] = 'Phone is required';
    }
    
    if (empty($department)) {
        $errors[] = 'Department is required';
    }
    
    if (empty($semester) || $semester < 1 || $semester > 8) {
        $errors[] = 'Valid semester is required';
    }
    
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => implode(', ', $errors)
        ]);
        exit;
    }
    
    $conn = getConnection();
    
    // Check if email already exists for another student
    $checkSql = "SELECT id FROM students WHERE email = ? AND id != ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param('si', $email, $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Email already exists for another student'
        ]);
        $checkStmt->close();
        $conn->close();
        exit;
    }
    $checkStmt->close();
    
    // Update student
    $sql = "UPDATE students SET name = ?, email = ?, phone = ?, department = ?, semester = ?, status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssssi', $name, $email, $phone, $department, $semester, $status, $id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Student updated successfully'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error updating student: ' . $stmt->error
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
