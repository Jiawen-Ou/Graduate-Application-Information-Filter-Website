<!-- mysql-connector-to-schema-eecs_499.php -->
<!-- http://php.net/manual/en/book.mysqli.php -->
<!-- @author = "Yuanhui Yang" -->
<!-- @email = "yuanhui.yang@u.northwestern.edu" -->

<?php

$input = "SELECT * FROM GRE_Query WHERE Gre_verbal > 120 AND Gre_quan > 130";

$mysqli = new mysqli("localhost", "root", "root", "eecs_499", 3306);

/* check connection */
if ($mysqli->connect_errno) {
    echo "Connect failed: " . $mysqli->connect_error . "\n";
    exit();
}

/* Create table doesn't return a resultset */
if ($mysqli->query($input) === TRUE) {
    echo "Table GRE_Query successfully created.\n";
}

/* Select queries return a resultset */
if ($output = $mysqli->query($input)) {
    echo "Select returned rows." . $output->num_rows . "\n";

    /* free result set */
    $output->close();
}

$mysqli->close();
?>