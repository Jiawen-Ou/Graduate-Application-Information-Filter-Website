<!-- mysql-connector-to-schema-eecs_499.php -->
<!-- http://php.net/manual/en/book.mysqli.php -->
<!-- @author = "Yuanhui Yang" -->
<!-- @email = "yuanhui.yang@u.northwestern.edu" -->

<?php
$ping = $_GET["ping"];
$method = $_GET["method"];
// Hostname: localhost, username: root, password: root, db: eecs_499
$mysqli = new mysqli('localhost', 'root', 'root', 'eecs_499');
	if ($mysqli->connect_errno) {
	echo "Sorry, this website is experiencing problems.";
	echo "Error: Failed to make a MySQL connection, here is why: \n";
	echo "Errno: " . $mysqli->connect_errno . "\n";
	echo "Error: " . $mysqli->connect_error . "\n";
	exit;
}

if (!$pong = $mysqli->query($ping)) {
	echo "Sorry, the website is experiencing problems.";
	echo "Error: Our query failed to execute and here is why: \n";
	echo "Query: " . $ping . "\n";
	echo "Errno: " . $mysqli->errno . "\n";
	echo "Error: " . $mysqli->error . "\n";
	exit;
}

if ($pong->num_rows === 0) {
	echo "We could not find a match, sorry about that. Please try again.";
	exit;
}
if ($method === "Search") {
	while ($row = $pong->fetch_array(MYSQLI_NUM)) {
		echo "<tr>";
		for ($column = 0; $column < $pong->field_count; $column++) {
			echo "<td>";
			echo $row[$column];
			echo "</td>";
		}
		echo "</tr>";
	}
}
$pong->free();
$mysqli->close();
?>
