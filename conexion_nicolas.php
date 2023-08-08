<?php
$servername = "localhost";
$username = "i6990943_wp2";
$password = "O.GuMxiINHveV6k78FM14";
$dbname = "i6990943_wp2";
// $table = "camposformulario";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>