<?php
header("Content-Type: application/json");
include __DIR__ . '/config.php';

// Fetch top 3 trending questions (u can change the limt )
$sql = "
SELECT q.question_id, q.title, q.question_content, u.username, GROUP_CONCAT(t.tag_name) AS tags
FROM question q
JOIN users u ON q.user_id = u.user_id
LEFT JOIN question_has_tag qht ON q.question_id = qht.question_id
LEFT JOIN tag t ON qht.tag_id = t.tag_id
GROUP BY q.question_id
ORDER BY q.question_id DESC
LIMIT 3
";

$result = $conn->query($sql);
$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        // Convert tags from comma-separated string to array
        $row['tags'] = $row['tags'] ? explode(',', $row['tags']) : [];
        $data[] = $row;
    }
} else {
    $data = ["error" => $conn->error];
}

echo json_encode($data);
$conn->close();
?>
