<?php
header('Content-Type: application/json');
require_once 'config.php';

$conn = getConnection();

// Get all students
$sql = "SELECT * FROM students ORDER BY created_at DESC";
$result = $conn->query($sql);

$students = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = [
            'id' => $row['id'],
            'student_id' => $row['student_id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'dob' => $row['dob'],
            'gender' => $row['gender'],
            'address' => $row['address'],
            'department' => $row['department'],
            'semester' => $row['semester'],
            'enrollment_date' => $row['enrollment_date'],
            'status' => $row['status'],
            'created_at' => $row['created_at']
        ];
    }
}

echo json_encode([
    'success' => true,
    'students' => $students
]);

$conn->close();
?>
