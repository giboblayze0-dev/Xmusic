<?php
$conn = new mysqli("sql304.infinityfree.com", "YOUR_DB_USER", "YOUR_DB_PASS", "YOUR_DB_NAME");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$section = $_GET['section'] ?? '';
$search  = $_GET['search'] ?? '';
$limit   = $_GET['limit'] ?? 5;
$offset  = $_GET['offset'] ?? 0;

$sql = "SELECT * FROM songs WHERE 1";

// filter by section
if ($section != '') {
    $sql .= " AND section='$section'";
}

// search
if ($search != '') {
    $sql .= " AND (title LIKE '%$search%' OR artist LIKE '%$search%')";
}

// pagination
$sql .= " LIMIT $limit OFFSET $offset";

$result = $conn->query($sql);

$songs = [];

while($row = $result->fetch_assoc()) {
    $songs[] = $row;
}

echo json_encode($songs);
?>
