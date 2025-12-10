<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "config.php"; 

$sql = "
    SELECT q.question_id, q.title, q.question_content, u.username,
           GROUP_CONCAT(t.tag_name) AS tags
    FROM question q
    JOIN users u ON q.user_id = u.user_id
    LEFT JOIN question_has_tag qt ON q.question_id = qt.question_id
    LEFT JOIN tag t ON qt.tag_id = t.tag_id
    GROUP BY q.question_id
    ORDER BY q.question_id DESC
";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $row['tags'] = $row['tags'] ? explode(",", $row['tags']) : [];
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
