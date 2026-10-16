<?php

session_start();

require_once __DIR__ . '/config/database.php';

$message = '';
$messageType = '';
$fullName = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = trim($_POST['full_name'] ?? '');
    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if ($fullName === '' || $email === '' || $password === '' || $confirmPassword === '') {
        $message = 'Please complete all fields.';
        $messageType = 'danger';
    } elseif (mb_strlen($fullName) > 150) {
        $message = 'Your name must be 150 characters or fewer.';
        $messageType = 'danger';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Please enter a valid email address.';
        $messageType = 'danger';
    } elseif (strlen($password) < 8) {
        $message = 'Your password must be at least 8 characters.';
        $messageType = 'danger';
    } elseif ($password !== $confirmPassword) {
        $message = 'The passwords do not match.';
        $messageType = 'danger';
    } else {
        $check = $pdo->prepare(
            'SELECT id FROM users WHERE email = ? LIMIT 1'
        );
        $check->execute([$email]);

        if ($check->fetch()) {
            $message = 'An account with this email already exists. Try logging in instead.';
            $messageType = 'danger';
        } else {
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $insert = $pdo->prepare(
                'INSERT INTO users
                    (full_name, email, password_hash, role, is_active)
                 VALUES
                    (?, ?, ?, ?, 1)'
            );

            $insert->execute([
                $fullName,
                $email,
                $passwordHash,
                'customer'
            ]);

            $message = 'Your account was created successfully. You can now log in.';
            $messageType = 'success';
            $fullName = '';
            $email = '';
        }
    }
}

function oldValue(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Create a Golden Crust customer account.">
    <title>Sign Up - Golden Crust</title>

    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="navbar">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <img src="logo.png" alt="Golden Crust Logo" class="logo-img">
            Golden Crust
        </a>
    </div>
</nav>

<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4 p-lg-5">
                    <span class="eyebrow">Join the bakery table</span>
                    <h1 class="section-title mt-2">Create your account</h1>
                    <p class="text-muted">
                        Save your details for faster ordering and pickup requests.
                    </p>

                    <?php if ($message !== ''): ?>
                        <div class="alert alert-<?= oldValue($messageType) ?>" role="alert">
                            <?= oldValue($message) ?>
                        </div>
                    <?php endif; ?>

                    <form method="POST" action="signup.php">
                        <div class="mb-3">
                            <label for="full_name" class="form-label">Full name</label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                class="form-control"
                                placeholder="Surname, First Name, MI"
                                value="<?= oldValue($fullName) ?>"
                                maxlength="150"
                                autocomplete="name"
                                required>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                class="form-control"
                                placeholder="you@example.com"
                                value="<?= oldValue($email) ?>"
                                autocomplete="email"
                                required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                class="form-control"
                                minlength="8"
                                autocomplete="new-password"
                                required>
                            <div class="form-text">Use at least 8 characters.</div>
                        </div>

                        <div class="mb-4">
                            <label for="confirm_password" class="form-label">Confirm password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                class="form-control"
                                minlength="8"
                                autocomplete="new-password"
                                required>
                        </div>

                        <button type="submit" class="btn btn-add w-100">
                            Create account
                        </button>
                    </form>

                    <p class="text-center mt-4 mb-0">
                        Already have an account?
                        <a href="login.php">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</main>

<footer>
    <p>&copy; 2026 Golden Crust. All Rights Reserved.</p>
</footer>

</body>
</html>
