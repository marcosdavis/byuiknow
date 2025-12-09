<?php

header("Content-Type: application/json");

// database settings from the website
$host = "localhost";
$user = "byuiknow";
$pass = "byuiknow";
$db = "my_byuiknow";

// connect to the database
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit;
}

// Example query
$sql = "SELECT * FROM question";
$result = $conn->query($sql);

$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>