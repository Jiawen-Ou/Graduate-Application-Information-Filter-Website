<!-- mysql-connector-to-schema-eecs_499.php -->
<!-- http://php.net/manual/en/book.mysqli.php -->
<!-- @author = "Yuanhui Yang" -->
<!-- @email = "yuanhui.yang@u.northwestern.edu" -->
<!DOCTYPE html>
<html>
<body>
<?php
// $input = $_REQUEST["q"];
// Hostname: localhost, username: root, password: root, db: eecs_499
$mysqli = new mysqli('localhost', 'root', 'root', 'eecs_499');
	if ($mysqli->connect_errno) {
	echo "Sorry, this website is experiencing problems.";
	echo "Error: Failed to make a MySQL connection, here is why: \n";
	echo "Errno: " . $mysqli->connect_errno . "\n";
	echo "Error: " . $mysqli->connect_error . "\n";
	exit;
}

$input = "SELECT EmployID, Program, Gender, Ethnicity, Country FROM GRE_Query WHERE ( ( Gre_verbal > 100 ) )";
// echo $input;

if (!$output = $mysqli->query($input)) {
	echo "Sorry, the website is experiencing problems.";
	echo "Error: Our query failed to execute and here is why: \n";
	echo "Query: " . $input . "\n";
	echo "Errno: " . $mysqli->errno . "\n";
	echo "Error: " . $mysqli->error . "\n";
	exit;
}

if ($output->num_rows === 0) {
	echo "We could not find a match for ID $aid, sorry about that. Please try again.";
	exit;
}
echo "<table>";
while ($element = $output->fetch_assoc()) {
	echo "<tr>";
	echo "<td>" . $element["EmployID"] . "</td>";
	echo "</tr>";
}
echo "</table>";

$output->free();
$mysqli->close();
?>
</body>
</html>