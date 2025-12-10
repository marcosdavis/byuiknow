<?php
header("Content-Type: application/json");
include __DIR__ . '/config.php';

// I moved the db settings to connect in config.php
// after we decided it would be a good idea to run locally when testing

// Query to fetch the latest 3 questions with author and tags
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
        $row['tags'] = $row['tags'] ? explode(',', $row['tags']) : [];
        $data[] = $row;
    }
} else {
    $data = ["error" => $conn->error];
}

echo json_encode($data);
$conn->close();
?>
