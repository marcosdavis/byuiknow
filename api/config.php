<?php
// database settings from the website
$host = "localhost";
$user = "byuiknow";
$pass = "byuiknow";
$db = "my_byuiknow";

// localhost  configuratino
// $host = "localhost";
// $user = "root";
// $pass = "passord"; 
// $db   = "my_byuiknow";

// create a connection
$conn = new mysqli($host, $user, $pass, $db);

// check connection
if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}
?>
