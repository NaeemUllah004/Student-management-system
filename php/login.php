<?php
header('Content-Type: application/json');

// Simple authentication (in production, use password hashing and database)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    
    // Demo credentials
    if ($username === 'NaeemUllah' && $password === 'Afshan&Salam') {
        session_start();
        $_SESSION['logged_in'] = true;
        $_SESSION['username'] = $username;
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>
