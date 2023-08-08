<?php
$servername = "localhost";
$username = "sakashima";
$password = "1031540877";
$dbname = "chatbotscn";
// $table = "camposformulario";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>