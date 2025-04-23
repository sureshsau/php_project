<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set("UTC");

// === CONFIGURATION ===
$dbFile = __DIR__ . "/users.db";
$jwtSecret = "YOUR_SECRET_KEY"; // Change this!

// === DATABASE INIT ===
$db = new PDO("sqlite:" . $dbFile);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)");

// === HELPER FUNCTIONS ===
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function getInputData() {
    return json_decode(file_get_contents("php://input"), true);
}

function generateJWT($payload, $secret, $expire = 3600) {
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['exp'] = time() + $expire;
    $payload = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', "$header.$payload", $secret, true);
    $signature = base64_encode($signature);
    return "$header.$payload.$signature";
}

function validateJWT($token, $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    list($header64, $payload64, $signature) = $parts;

    $validSignature = base64_encode(hash_hmac('sha256', "$header64.$payload64", $secret, true));
    if ($signature !== $validSignature) return false;

    $payload = json_decode(base64_decode($payload64), true);
    if ($payload['exp'] < time()) return false;

    return $payload;
}

function authGuard($secret) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        jsonResponse(["error" => "Unauthorized"], 401);
    }
    $payload = validateJWT($matches[1], $secret);
    if (!$payload) {
        jsonResponse(["error" => "Invalid or expired token"], 401);
    }
    return $payload;
}

// === ROUTING ===
$path = explode('?', $_SERVER['REQUEST_URI'])[0];
$method = $_SERVER['REQUEST_METHOD'];

// === ROUTES ===
if ($path === "/register" && $method === "POST") {
    $data = getInputData();
    if (!isset($data['username'], $data['password'])) {
        jsonResponse(["error" => "Username and password required"], 400);
    }

    $username = trim($data['username']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    try {
        $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute([$username, $password]);
        jsonResponse(["message" => "User registered successfully"]);
    } catch (PDOException $e) {
        jsonResponse(["error" => "Username already exists"], 400);
    }
}

if ($path === "/login" && $method === "POST") {
    $data = getInputData();
    if (!isset($data['username'], $data['password'])) {
        jsonResponse(["error" => "Username and password required"], 400);
    }

    $stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$data['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['password'], $user['password'])) {
        $token = generateJWT(['id' => $user['id'], 'username' => $user['username']], $jwtSecret);
        jsonResponse(["message" => "Login successful", "token" => $token]);
    } else {
        jsonResponse(["error" => "Invalid credentials"], 401);
    }
}

if ($path === "/profile" && $method === "GET") {
    $user = authGuard($jwtSecret);
    jsonResponse(["message" => "Welcome " . $user['username'], "user" => $user]);
}

if ($path === "/users" && $method === "GET") {
    $users = $db->query("SELECT id, username, created_at FROM users")->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse(["users" => $users]);
}

jsonResponse(["error" => "Endpoint not found"], 404);



