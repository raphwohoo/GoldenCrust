<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

$isLoggedIn = isset($_SESSION['user_id'], $_SESSION['role']);

if (!$isLoggedIn) {
    echo json_encode([
        'loggedIn' => false
    ]);
    exit;
}

echo json_encode([
    'loggedIn' => true,
    'userId' => (int) $_SESSION['user_id'],
    'fullName' => $_SESSION['full_name'] ?? '',
    'email' => $_SESSION['email'] ?? '',
    'role' => $_SESSION['role']
]);
