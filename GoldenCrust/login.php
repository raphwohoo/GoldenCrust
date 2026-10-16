<?php

session_start();

require_once __DIR__ . '/config/database.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        $error = 'Please enter your email and password.';
    } else {
        $query = $pdo->prepare(
            'SELECT id, full_name, email, password_hash, role
             FROM users
             WHERE email = ? AND is_active = 1
             LIMIT 1'
        );

        $query->execute([$email]);
        $user = $query->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];

            if ($user['role'] === 'admin') {
                header('Location: admin/dashboard.php');
                exit;
            }

            header('Location: index.html');
            exit;
        }

        $error = 'Invalid email or password.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Login - Golden Crust</title>

    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

    <link rel="stylesheet" href="style.css">
</head>

<body>

<nav class="navbar">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <img src="logo.png"
                 alt="Golden Crust Logo"
                 class="logo-img">
            Golden Crust
        </a>
    </div>
</nav>

<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">

            <div class="card shadow-sm border-0">
                <div class="card-body p-4">

                    <span class="eyebrow">
                        Welcome back
                    </span>

                    <h1 class="h2 mt-2 mb-4">
                        Login
                    </h1>

                    <?php if ($error !== '' ): ?>
                        <div class="alert alert-danger">
                            <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
                        </div>
                    <?php endif; ?>

                    <form method="POST">

                        <div class="mb-3">
                            <label for="email" class="form-label">
                                Email address
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                class="form-control"
                                required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                class="form-control"
                                required>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-add w-100">
                            Login
                        </button>

                    </form>

                    <p class="text-center mt-4 mb-0">
                        Don't have an account?
                        <a href="signup.php">Sign up</a>
                    </p>

                </div>
            </div>

        </div>
    </div>
</main>

</body>
</html>
