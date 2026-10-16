<?php

session_start();

if (
    !isset($_SESSION['user_id']) ||
    $_SESSION['role'] !== 'admin'
) {
    header('Location: ../login.php');
    exit;
}

require_once __DIR__ . '/../config/database.php';

$productCount = $pdo
    ->query('SELECT COUNT(*) FROM products WHERE is_active = 1')
    ->fetchColumn();

$userCount = $pdo
    ->query('SELECT COUNT(*) FROM users WHERE is_active = 1')
    ->fetchColumn();

$pendingOrderCount = $pdo
    ->query("SELECT COUNT(*) FROM orders WHERE status = 'pending'")
    ->fetchColumn();

$lowStockCount = $pdo
    ->query(
        'SELECT COUNT(*)
         FROM inventory
         WHERE quantity_on_hand <= reorder_level'
    )
    ->fetchColumn();

$recentOrders = $pdo
    ->query(
        'SELECT id, customer_name, total_amount, status, created_at
         FROM orders
         ORDER BY created_at DESC
         LIMIT 5'
    )
    ->fetchAll();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Admin Dashboard - Golden Crust</title>

    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

    <link rel="stylesheet" href="../style.css">
</head>

<body>

<nav class="navbar">
    <div class="container">
        <a class="navbar-brand" href="../index.html">
            <img src="../logo.png"
                 alt="Golden Crust Logo"
                 class="logo-img">
            Golden Crust Admin
        </a>

        <a href="../logout.php" class="btn btn-story-outline">
            Logout
        </a>
    </div>
</nav>

<main class="container py-5">

    <div class="mb-4">
        <span class="eyebrow">
            Administration
        </span>

        <h1 class="section-title mt-2">
            Welcome, <?= htmlspecialchars($_SESSION['full_name'], ENT_QUOTES, 'UTF-8' ) ?>
        </h1>

        <p class="text-muted">
            Manage bakery products, recipes, inventory, and orders.
        </p>
    </div>

    <div class="row g-4 mb-5">

        <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <small>Active products</small>
                    <h2><?= (int) $productCount ?></h2>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <small>Registered users</small>
                    <h2><?= (int) $userCount ?></h2>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <small>Pending orders</small>
                    <h2><?= (int) $pendingOrderCount ?></h2>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <small>Low-stock ingredients</small>
                    <h2><?= (int) $lowStockCount ?></h2>
                </div>
            </div>
        </div>

    </div>

    <div class="card border-0 shadow-sm">
        <div class="card-body">

            <h2 class="h4">
                Recent orders
            </h2>

            <?php if (!$recentOrders): ?>

                <p class="text-muted mb-0">
                    No customer orders yet.
                </p>

            <?php else: ?>

                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <?php foreach ($recentOrders as $order): ?>
                                <tr>
                                    <td>#<?= (int) $order['id'] ?></td>

                                    <td>
                                        <?= htmlspecialchars(
                                            $order['customer_name'],
                                            ENT_QUOTES,
                                            'UTF-8'
                                        ) ?>
                                    </td>

                                    <td>
                                        Php <?= number_format(
                                            (float) $order['total_amount'],
                                            2
                                        ) ?>
                                    </td>

                                    <td>
                                        <?= htmlspecialchars(
                                            $order['status'],
                                            ENT_QUOTES,
                                            'UTF-8'
                                        ) ?>
                                    </td>

                                    <td>
                                        <?= htmlspecialchars(
                                            $order['created_at'],
                                            ENT_QUOTES,
                                            'UTF-8'
                                        ) ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

            <?php endif; ?>

        </div>
    </div>

</main>

<footer>
    <p>&copy; 2026 Golden Crust. All Rights Reserved.</p>
</footer>

</body>
</html>
