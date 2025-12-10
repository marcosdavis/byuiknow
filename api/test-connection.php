<?php
include 'config.php';

if ($conn) {
    echo json_encode(["status" => "connecte d"]);
} else {
    echo json_encode(["status" => "Failed to connect."]);
}
?>
